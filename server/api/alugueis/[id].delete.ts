import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireUsuario } from '../../utils/auth'

type AluguelRow = RowDataPacket & {
    id: number
    usuario_id: number
    bicicleta_id: number
    status: string
}

export default defineEventHandler(async (event) => {
    const usuario = await requireUsuario(event)

    const id = Number(getRouterParam(event, 'id'))

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID inválido.'
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

        const aluguel = alugueis[0]

        if (!aluguel) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Aluguel não encontrado.'
            })
        }

        if (usuario.tipo !== 'admin' && aluguel.usuario_id !== usuario.id) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Você não tem permissão para excluir este aluguel.'
            })
        }

        if (aluguel.status === 'Ativo') {
            await connection.execute(
                'UPDATE bicicletas SET status = ? WHERE id = ?',
                ['Disponível', aluguel.bicicleta_id]
            )
        }

        const [result] = await connection.execute<ResultSetHeader>(
            'DELETE FROM alugueis WHERE id = ?',
            [id]
        )

        await connection.commit()

        return {
            mensagem: 'Aluguel excluído com sucesso.',
            linhasAfetadas: result.affectedRows
        }
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
})