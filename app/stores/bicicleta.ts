import { defineStore } from 'pinia'
import type { Bicicleta, BicicletaFormData, StatusBicicleta } from '~/types/bicicleta'

const STORAGE_KEY = 'pedalrent_bicicletas'

const bicicletasIniciais: Bicicleta[] = [
    {
        id: 1,
        nome: 'Bicicleta Aro 29',
        categoria: 'Mountain Bike',
        valorDiaria: 35,
        status: 'Disponível',
        descricao: 'Bicicleta esportiva ideal para trilhas e passeios longos.'
    },
    {
        id: 2,
        nome: 'Bike Urbana',
        categoria: 'Urbana',
        valorDiaria: 25,
        status: 'Disponível',
        descricao: 'Bicicleta confortável para uso urbano e deslocamentos curtos.'
    },
    {
        id: 3,
        nome: 'Bicicleta Infantil',
        categoria: 'Infantil',
        valorDiaria: 18,
        status: 'Manutenção',
        descricao: 'Modelo infantil para lazer em parques e áreas abertas.'
    }
]

export const useBicicletasStore = defineStore('bicicletas', {
    state: () => ({
        bicicletas: [] as Bicicleta[],
        carregado: false
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
        carregarBicicletas() {
            if (!import.meta.client || this.carregado) return

            const dadosSalvos = localStorage.getItem(STORAGE_KEY)

            if (dadosSalvos) {
                this.bicicletas = JSON.parse(dadosSalvos)
            } else {
                this.bicicletas = bicicletasIniciais
                this.salvarBicicletas()
            }

            this.carregado = true
        },

        salvarBicicletas() {
            if (!import.meta.client) return

            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bicicletas))
        },

        cadastrarBicicleta(dados: BicicletaFormData) {
            const novaBicicleta: Bicicleta = {
                id: Date.now(),
                ...dados
            }

            this.bicicletas.push(novaBicicleta)
            this.salvarBicicletas()
        },

        editarBicicleta(id: number, dados: BicicletaFormData) {
            const index = this.bicicletas.findIndex((bicicleta) => bicicleta.id === id)

            if (index !== -1) {
                this.bicicletas[index] = {
                    id,
                    ...dados
                }

                this.salvarBicicletas()
            }
        },

        excluirBicicleta(id: number) {
            this.bicicletas = this.bicicletas.filter((bicicleta) => bicicleta.id !== id)
            this.salvarBicicletas()
        },

        alterarStatus(id: number, status: StatusBicicleta) {
            const bicicleta = this.bicicletas.find((bicicleta) => bicicleta.id === id)

            if (bicicleta) {
                bicicleta.status = status
                this.salvarBicicletas()
            }
        }
    }
})