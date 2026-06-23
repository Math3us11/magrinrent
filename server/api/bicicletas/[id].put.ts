import type { ResultSetHeader } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    await requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID inválido.'
        })
    }

    if (!body.nome || !body.categoria || !body.valorDiaria) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Nome, categoria e valor da diária são obrigatórios.'
        })
    }

    const pool = getPool()

    const [result] = await pool.execute<ResultSetHeader>(
        `
    UPDATE bicicletas
    SET
      nome = ?,
      categoria = ?,
      valor_diaria = ?,
      status = ?,
      descricao = ?
    WHERE id = ?
    `,
        [
            body.nome,
            body.categoria,
            body.valorDiaria,
            body.status,
            body.descricao || '',
            id
        ]
    )

    if (result.affectedRows === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Bicicleta não encontrada.'
        })
    }

    return {
        mensagem: 'Bicicleta atualizada com sucesso.'
    }
})