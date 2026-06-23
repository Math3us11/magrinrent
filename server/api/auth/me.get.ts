import { getUsuarioLogado } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const usuario = await getUsuarioLogado(event)

    return {
        usuario
    }
})