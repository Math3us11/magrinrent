import { defineStore } from 'pinia'
import { useBicicletasStore } from '~/stores/bicicleta'
import type { Aluguel, AluguelFormData } from '~/types/aluguel'

export const useAlugueisStore = defineStore('alugueis', {
    state: () => ({
        alugueis: [] as Aluguel[],
        carregando: false,
        erro: null as string | null
    }),

    getters: {
        totalAlugueis: (state) => state.alugueis.length,

        alugueisAtivos: (state) => {
            return state.alugueis.filter((aluguel) => aluguel.status === 'Ativo')
        },

        buscarPorId: (state) => {
            return (id: number) => state.alugueis.find((aluguel) => aluguel.id === id)
        }
    },

    actions: {
        async carregarAlugueis() {
            this.carregando = true
            this.erro = null

            try {
                const dados = await $fetch<Aluguel[]>('/api/alugueis')
                this.alugueis = dados
            } catch (error) {
                this.erro = 'Erro ao carregar aluguéis.'
                console.error(error)
            } finally {
                this.carregando = false
            }
        },

        async cadastrarAluguel(dados: AluguelFormData) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch('/api/alugueis', {
                    method: 'POST',
                    body: dados
                })

                await this.carregarAlugueis()

                const bicicletasStore = useBicicletasStore()
                await bicicletasStore.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao cadastrar aluguel.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async editarAluguel(id: number, dados: AluguelFormData) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch(`/api/alugueis/${id}`, {
                    method: 'PUT',
                    body: dados
                })

                await this.carregarAlugueis()

                const bicicletasStore = useBicicletasStore()
                await bicicletasStore.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao editar aluguel.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        },

        async finalizarAluguel(id: number) {
            const aluguel = this.buscarPorId(id)

            if (!aluguel) return

            await this.editarAluguel(id, {
                nomeCliente: aluguel.nomeCliente,
                telefoneCliente: aluguel.telefoneCliente,
                bicicletaId: aluguel.bicicletaId,
                dataRetirada: aluguel.dataRetirada,
                dataDevolucao: aluguel.dataDevolucao,
                status: 'Finalizado',
                observacao: aluguel.observacao
            })
        },

        async cancelarAluguel(id: number) {
            const aluguel = this.buscarPorId(id)

            if (!aluguel) return

            await this.editarAluguel(id, {
                nomeCliente: aluguel.nomeCliente,
                telefoneCliente: aluguel.telefoneCliente,
                bicicletaId: aluguel.bicicletaId,
                dataRetirada: aluguel.dataRetirada,
                dataDevolucao: aluguel.dataDevolucao,
                status: 'Cancelado',
                observacao: aluguel.observacao
            })
        },

        async excluirAluguel(id: number) {
            this.carregando = true
            this.erro = null

            try {
                await $fetch(`/api/alugueis/${id}`, {
                    method: 'DELETE'
                })

                await this.carregarAlugueis()

                const bicicletasStore = useBicicletasStore()
                await bicicletasStore.carregarBicicletas()
            } catch (error) {
                this.erro = 'Erro ao excluir aluguel.'
                console.error(error)
                throw error
            } finally {
                this.carregando = false
            }
        }
    }
})