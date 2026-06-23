import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireUsuario } from '../../utils/auth'

type AluguelRow = RowDataPacket & {
    id: number
    usuario_id: number
    bicicleta_id: number
    status: string
}

type BicicletaRow = RowDataPacket & {
    id: number
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

    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID inválido.'
        })
    }

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

        const [alugueis] = await connection.execute<AluguelRow[]>(
            `
      SELECT id, usuario_id, bicicleta_id, status
      FROM alugueis
      WHERE id = ?
      FOR UPDATE
      `,
            [id]
        )

        const aluguelAtual = alugueis[0]

        if (!aluguelAtual) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Aluguel não encontrado.'
            })
        }

        if (usuario.tipo !== 'admin' && aluguelAtual.usuario_id !== usuario.id) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Você não tem permissão para alterar este aluguel.'
            })
        }

        const [bicicletas] = await connection.execute<BicicletaRow[]>(
            `
      SELECT id, valor_diaria, status
      FROM bicicletas
      WHERE id = ?
      FOR UPDATE
      `,
            [body.bicicletaId]
        )

        const bicicletaNova = bicicletas[0]

        if (!bicicletaNova) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Bicicleta não encontrada.'
            })
        }

        const mudouBicicleta = aluguelAtual.bicicleta_id !== Number(body.bicicletaId)
        const estavaAtivo = aluguelAtual.status === 'Ativo'
        const ficaraAtivo = body.status === 'Ativo'

        if (mudouBicicleta && ficaraAtivo && bicicletaNova.status !== 'Disponível') {
            throw createError({
                statusCode: 400,
                statusMessage: 'A nova bicicleta selecionada não está disponível.'
            })
        }

        if (estavaAtivo && !ficaraAtivo) {
            await connection.execute(
                'UPDATE bicicletas SET status = ? WHERE id = ?',
                ['Disponível', aluguelAtual.bicicleta_id]
            )
        }

        if (!estavaAtivo && ficaraAtivo) {
            if (bicicletaNova.status !== 'Disponível') {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Esta bicicleta não está disponível para aluguel.'
                })
            }

            await connection.execute(
                'UPDATE bicicletas SET status = ? WHERE id = ?',
                ['Alugada', body.bicicletaId]
            )
        }

        if (estavaAtivo && ficaraAtivo && mudouBicicleta) {
            await connection.execute(
                'UPDATE bicicletas SET status = ? WHERE id = ?',
                ['Disponível', aluguelAtual.bicicleta_id]
            )

            await connection.execute(
                'UPDATE bicicletas SET status = ? WHERE id = ?',
                ['Alugada', body.bicicletaId]
            )
        }

        const dias = calcularDias(body.dataRetirada, body.dataDevolucao)
        const valorTotal = dias * Number(bicicletaNova.valor_diaria)

        const [result] = await connection.execute<ResultSetHeader>(
            `
      UPDATE alugueis
      SET
        bicicleta_id = ?,
        nome_cliente = ?,
        telefone_cliente = ?,
        data_retirada = ?,
        data_devolucao = ?,
        valor_total = ?,
        status = ?,
        observacao = ?
      WHERE id = ?
      `,
            [
                body.bicicletaId,
                body.nomeCliente,
                body.telefoneCliente,
                body.dataRetirada,
                body.dataDevolucao,
                valorTotal,
                body.status,
                body.observacao || '',
                id
            ]
        )

        await connection.commit()

        return {
            mensagem: 'Aluguel atualizado com sucesso.',
            linhasAfetadas: result.affectedRows
        }
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
})