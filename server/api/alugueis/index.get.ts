import { getPool } from '../../database/connection'
import { requireUsuario } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const usuario = await requireUsuario(event)

  const pool = getPool()

  let sql = `
    SELECT
      a.id,
      a.usuario_id AS usuarioId,
      a.bicicleta_id AS bicicletaId,
      b.nome AS bicicletaNome,
      a.nome_cliente AS nomeCliente,
      a.telefone_cliente AS telefoneCliente,
      DATE_FORMAT(a.data_retirada, '%Y-%m-%d') AS dataRetirada,
      DATE_FORMAT(a.data_devolucao, '%Y-%m-%d') AS dataDevolucao,
      a.valor_total AS valorTotal,
      a.status,
      a.observacao
    FROM alugueis a
    INNER JOIN bicicletas b ON b.id = a.bicicleta_id
  `

  const params: unknown[] = []

  if (usuario.tipo !== 'admin') {
    sql += ' WHERE a.usuario_id = ?'
    params.push(usuario.id)
  }

  sql += ' ORDER BY a.id DESC'

  const [rows] = await pool.execute(sql, params)

  return rows
})