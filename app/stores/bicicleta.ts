import { defineStore } from 'pinia'
import type { Bicicleta, BicicletaFormData, StatusBicicleta } from '~/types/bicicleta'

export const useBicicletasStore = defineStore('bicicletas', {
    state: () => ({
        bicicletas: [] as Bicicleta[],
        carregando: false,
        erro: null as string | null
    }),

    getters: {
        totalBicicletas: (state) => state.bicicletas.length,

        bicicletasDisponiveis: (state) => {
            return state.bicicletas.filter((bicicleta) => bicicleta.status === 'Disponível')
        },

        buscarPorId: (state) => {
            return (id: number) => state.bicicletas.find((bicicleta) => bicicleta.id === id)
        }
    },

    actions: {
        async carregarBicicletas() {
            this.carregando = true
            this.erro = null

            try {
                const dados = await $fetch<Bicicleta[]>('/api/bicicletas')

                this.bicicletas = dados
            } catch (error) {
                this.erro = 'Erro ao carregar bicicletas.'
                console.error(error)
            } finally {
                this.carregando = false
            }
        },

        async cadastrarBicicleta(dados: BicicletaFormData) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch('/api/bicicletas', {
                    method: 'POST',
                    body: dados
                })

                await this.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao cadastrar bicicleta.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async editarBicicleta(id: number, dados: BicicletaFormData) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch(`/api/bicicletas/${id}`, {
                    method: 'PUT',
                    body: dados
                })

                await this.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao editar bicicleta.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async excluirBicicleta(id: number) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch(`/api/bicicletas/${id}`, {
                    method: 'DELETE'
                })

                await this.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao excluir bicicleta.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async alterarStatus(id: number, status: StatusBicicleta) {
            const bicicleta = this.buscarPorId(id)

            if (!bicicleta) return

            await this.editarBicicleta(id, {
                nome: bicicleta.nome,
                categoria: bicicleta.categoria,
                valorDiaria: bicicleta.valorDiaria,
                status,
                descricao: bicicleta.descricao
            })
        }
    }
})