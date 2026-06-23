import { removerSessao } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    removerSessao(event)

    return {
        mensagem: 'Logout realizado com sucesso.'
    }
})