import { getPool } from '../../database/connection'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    await requireAdmin(event)
    const pool = getPool()

    const [rows] = await pool.query(`
    SELECT
      id,
      nome,
      categoria,
      valor_diaria AS valorDiaria,
      status,
      descricao
    FROM bicicletas
    ORDER BY id DESC
  `)

    return rows
})