export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) return

    const authStore = useAuthStore()

    if (!authStore.inicializado) {
        await authStore.carregarUsuario()
    }

    const rotasPublicas = ['/', '/login', '/about', '/sobre']

    const rotaPublica = rotasPublicas.includes(to.path)

    if (!authStore.estaLogado && !rotaPublica) {
        return navigateTo('/login')
    }

    if (authStore.estaLogado && to.path === '/login') {
        return navigateTo('/')
    }

    if (to.path.startsWith('/bicicletas') && !authStore.isAdmin) {
        return navigateTo('/alugueis')
    }

    if (
        to.path.startsWith('/alugueis/') &&
        to.path.endsWith('/editar') &&
        !authStore.isAdmin
    ) {
        return navigateTo('/alugueis')
    }
})