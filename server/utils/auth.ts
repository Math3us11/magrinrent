import type { H3Event } from 'h3'
import type { RowDataPacket } from 'mysql2'
import { getPool } from '../database/connection'

export type TipoUsuario = 'admin' | 'cliente'

export type UsuarioLogado = {
    id: number
    nome: string
    email: string
    tipo: TipoUsuario
}

type UsuarioRow = RowDataPacket & UsuarioLogado

const COOKIE_NAME = 'magrinrent_auth'

export async function getUsuarioLogado(event: H3Event): Promise<UsuarioLogado | null> {
    const usuarioId = getCookie(event, COOKIE_NAME)

    if (!usuarioId) {
        return null
    }

    const pool = getPool()

    const [rows] = await pool.execute<UsuarioRow[]>(
        `
    SELECT id, nome, email, tipo
    FROM usuarios
    WHERE id = ?
    LIMIT 1
    `,
        [usuarioId]
    )

    return rows[0] ?? null
}

export async function requireUsuario(event: H3Event) {
    const usuario = await getUsuarioLogado(event)

    if (!usuario) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Usuário não autenticado.'
        })
    }

    return usuario
}

export async function requireAdmin(event: H3Event) {
    const usuario = await requireUsuario(event)

    if (usuario.tipo !== 'admin') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Acesso permitido apenas para administrador.'
        })
    }

    return usuario
}

export function criarSessao(event: H3Event, usuarioId: number) {
    setCookie(event, COOKIE_NAME, String(usuarioId), {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8
    })
}

export function removerSessao(event: H3Event) {
    deleteCookie(event, COOKIE_NAME, {
        path: '/'
    })
}