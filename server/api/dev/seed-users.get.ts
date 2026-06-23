import bcrypt from 'bcryptjs'
import { getPool } from '../../database/connection'

export default defineEventHandler(async () => {
    const pool = getPool()

    const senhaAdmin = await bcrypt.hash('admin123', 10)
    const senhaCliente = await bcrypt.hash('cliente123', 10)

    await pool.execute(
        `
    INSERT INTO usuarios (nome, email, senha, tipo)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      nome = VALUES(nome),
      senha = VALUES(senha),
      tipo = VALUES(tipo)
    `,
        ['Administrador', 'admin@magrinrent.com', senhaAdmin, 'admin']
    )

    await pool.execute(
        `
    INSERT INTO usuarios (nome, email, senha, tipo)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      nome = VALUES(nome),
      senha = VALUES(senha),
      tipo = VALUES(tipo)
    `,
        ['Cliente Teste', 'cliente@magrinrent.com', senhaCliente, 'cliente']
    )

    return {
        mensagem: 'Usuários criados com sucesso.',
        usuarios: [
            {
                email: 'admin@magrinrent.com',
                senha: 'admin123',
                tipo: 'admin'
            },
            {
                email: 'cliente@magrinrent.com',
                senha: 'cliente123',
                tipo: 'cliente'
            }
        ]
    }
})