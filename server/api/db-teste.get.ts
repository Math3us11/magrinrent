import { getPool } from '../database/connection'

export default defineEventHandler(async () => {
    const pool = getPool()

    const [rows] = await pool.query('SELECT 1 AS resultado')

    return {
        mensagem: 'Conexão com o banco funcionando!',
        resultado: rows
    }
})