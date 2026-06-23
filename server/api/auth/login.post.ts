import bcrypt from 'bcryptjs'
import type { RowDataPacket } from 'mysql2'
import { getPool } from '../../database/connection'
import { criarSessao } from '../../utils/auth'

type UsuarioRow = RowDataPacket & {
    id: number
    nome: string
    email: string
    senha: string
    tipo: 'admin' | 'cliente'
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.email || !body.senha) {
        throw createError({
            statusCode: 400,
            statusMessage: 'E-mail e senha são obrigatórios.'
        })
    }

    const pool = getPool()

    const [rows] = await pool.execute<UsuarioRow[]>(
        `
    SELECT id, nome, email, senha, tipo
    FROM usuarios
    WHERE email = ?
    LIMIT 1
    `,
        [body.email]
    )

    const usuario = rows[0]

    if (!usuario) {
        throw createError({
            statusCode: 401,
            statusMessage: 'E-mail ou senha inválidos.'
        })
    }

    const senhaValida = await bcrypt.compare(body.senha, usuario.senha)

    if (!senhaValida) {
        throw createError({
            statusCode: 401,
            statusMessage: 'E-mail ou senha inválidos.'
        })
    }

    criarSessao(event, usuario.id)

    return {
        mensagem: 'Login realizado com sucesso.',
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        }
    }
})