import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireUsuario } from '../../utils/auth'

type BicicletaRow = RowDataPacket & {
    id: number
    nome: string
    valor_diaria: number
    status: string
}

function calcularDias(dataRetirada: string, dataDevolucao: string) {
    const inicio = new Date(dataRetirada)
    const fim = new Date(dataDevolucao)

    const diferenca = fim.getTime() - inicio.getTime()
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24))

    return Math.max(dias, 1)
}

export default defineEventHandler(async (event) => {
    const usuario = await requireUsuario(event)
    const body = await readBody(event)

    if (!body.nomeCliente || !body.telefoneCliente || !body.bicicletaId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cliente, telefone e bicicleta são obrigatórios.'
        })
    }

    if (!body.dataRetirada || !body.dataDevolucao) {
        throw createError({
            statusCode: 400,
            statusMessage: 'As datas do aluguel são obrigatórias.'
        })
    }

    if (new Date(body.dataDevolucao) < new Date(body.dataRetirada)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'A data de devolução não pode ser menor que a data de retirada.'
        })
    }

    const pool = getPool()
    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()

        const [bicicletas] = await connection.execute<BicicletaRow[]>(
            'SELECT id, nome, valor_diaria, status FROM bicicletas WHERE id = ? FOR UPDATE',
            [body.bicicletaId]
        )

        const bicicleta = bicicletas[0]

        if (!bicicleta) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Bicicleta não encontrada.'
            })
        }

        if (bicicleta.status !== 'Disponível') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Esta bicicleta não está disponível para aluguel.'
            })
        }

        const dias = calcularDias(body.dataRetirada, body.dataDevolucao)
        const valorTotal = dias * Number(bicicleta.valor_diaria)

        const [result] = await connection.execute<ResultSetHeader>(
            `
      INSERT INTO alugueis (
        usuario_id,
        bicicleta_id,
        nome_cliente,
        telefone_cliente,
        data_retirada,
        data_devolucao,
        valor_total,
        status,
        observacao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                usuario.id,
                body.bicicletaId,
                body.nomeCliente,
                body.telefoneCliente,
                body.dataRetirada,
                body.dataDevolucao,
                valorTotal,
                'Ativo',
                body.observacao || ''
            ]
        )

        await connection.execute(
            'UPDATE bicicletas SET status = ? WHERE id = ?',
            ['Alugada', body.bicicletaId]
        )

        await connection.commit()

        return {
            mensagem: 'Aluguel cadastrado com sucesso.',
            id: result.insertId
        }
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
})