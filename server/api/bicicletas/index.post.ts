import type { ResultSetHeader } from 'mysql2'
import { getPool } from '../../database/connection'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    await requireAdmin(event)
    const body = await readBody(event)

    if (!body.nome || !body.categoria || !body.valorDiaria) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Nome, categoria e valor da diária são obrigatórios.'
        })
    }

    const pool = getPool()

    const [result] = await pool.execute<ResultSetHeader>(
        `
    INSERT INTO bicicletas (
      nome,
      categoria,
      valor_diaria,
      status,
      descricao
    )
    VALUES (?, ?, ?, ?, ?)
    `,
        [
            body.nome,
            body.categoria,
            body.valorDiaria,
            body.status || 'Disponível',
            body.descricao || ''
        ]
    )

    return {
        mensagem: 'Bicicleta cadastrada com sucesso.',
        id: result.insertId
    }
})