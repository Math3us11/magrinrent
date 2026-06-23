import { defineStore } from 'pinia'
import type { UsuarioLogado } from '~/types/usuario'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usuario: null as UsuarioLogado | null,
        carregando: false,
        inicializado: false,
        erro: null as string | null
    }),

    getters: {
        estaLogado: (state) => !!state.usuario,

        isAdmin: (state) => {
            return state.usuario?.tipo === 'admin'
        },

        isCliente: (state) => {
            return state.usuario?.tipo === 'cliente'
        }
    },

    actions: {
        async carregarUsuario() {
            this.carregando = true
            this.erro = null

            try {
                const resposta = await $fetch<{ usuario: UsuarioLogado | null }>('/api/auth/me', {
                    credentials: 'include'
                })

                this.usuario = resposta.usuario
            } catch (error) {
                this.usuario = null
                console.error(error)
            } finally {
                this.carregando = false
                this.inicializado = true
            }
        },

        async login(email: string, senha: string) {
            this.carregando = true
            this.erro = null

            try {
                const resposta = await $fetch<{
                    mensagem: string
                    usuario: UsuarioLogado
                }>('/api/auth/login', {
                    method: 'POST',
                    body: {
                        email,
                        senha
                    },
                    credentials: 'include'
                })

                this.usuario = resposta.usuario
                this.inicializado = true
            } catch (error) {
                this.erro = 'E-mail ou senha inválidos.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async logout() {
            this.carregando = true

            try {
                await $fetch('/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                })

                this.usuario = null
                this.inicializado = true

                await navigateTo('/login')
            } finally {
                this.carregando = false
            }
        }
    }
})