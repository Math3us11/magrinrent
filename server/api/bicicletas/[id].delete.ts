import type { ResultSetHeader } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    await requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID inválido.'
        })
    }

    const pool = getPool()

    const [result] = await pool.execute<ResultSetHeader>(
        'DELETE FROM bicicletas WHERE id = ?',
        [id]
    )

    if (result.affectedRows === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Bicicleta não encontrada.'
        })
    }

    return {
        mensagem: 'Bicicleta excluída com sucesso.'
    }
})