export type TipoUsuario = 'admin' | 'cliente'

export type UsuarioLogado = {
    id: number
    nome: string
    email: string
    tipo: TipoUsuario
}