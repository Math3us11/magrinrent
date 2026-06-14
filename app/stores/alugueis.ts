import { defineStore } from 'pinia'
import { useBicicletasStore } from '~/stores/bicicleta'
import type { Aluguel, AluguelFormData } from '~/types/aluguel'

const STORAGE_KEY = 'pedalrent_alugueis'

function calcularQuantidadeDias(dataRetirada: string, dataDevolucao: string) {
    const inicio = new Date(dataRetirada)
    const fim = new Date(dataDevolucao)

    const diferenca = fim.getTime() - inicio.getTime()
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24))

    return Math.max(dias, 1)
}

export const useAlugueisStore = defineStore('alugueis', {
    state: () => ({
        alugueis: [] as Aluguel[],
        carregado: false
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
        carregarAlugueis() {
            if (!import.meta.client || this.carregado) return

            const dadosSalvos = localStorage.getItem(STORAGE_KEY)

            if (dadosSalvos) {
                this.alugueis = JSON.parse(dadosSalvos)
            }

            this.carregado = true
        },

        salvarAlugueis() {
            if (!import.meta.client) return

            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.alugueis))
        },

        calcularValorTotal(dataRetirada: string, dataDevolucao: string, valorDiaria: number) {
            const dias = calcularQuantidadeDias(dataRetirada, dataDevolucao)
            return dias * valorDiaria
        },

        cadastrarAluguel(dados: AluguelFormData) {
            const bicicletasStore = useBicicletasStore()
            bicicletasStore.carregarBicicletas()

            const bicicleta = bicicletasStore.buscarPorId(dados.bicicletaId)

            if (!bicicleta) {
                throw new Error('Bicicleta não encontrada.')
            }

            if (bicicleta.status !== 'Disponível') {
                throw new Error('Esta bicicleta não está disponível para aluguel.')
            }

            if (new Date(dados.dataDevolucao) < new Date(dados.dataRetirada)) {
                throw new Error('A data de devolução não pode ser menor que a data de retirada.')
            }

            const novoAluguel: Aluguel = {
                id: Date.now(),
                nomeCliente: dados.nomeCliente,
                telefoneCliente: dados.telefoneCliente,
                bicicletaId: dados.bicicletaId,
                bicicletaNome: bicicleta.nome,
                dataRetirada: dados.dataRetirada,
                dataDevolucao: dados.dataDevolucao,
                valorTotal: this.calcularValorTotal(
                    dados.dataRetirada,
                    dados.dataDevolucao,
                    bicicleta.valorDiaria
                ),
                status: 'Ativo',
                observacao: dados.observacao
            }

            this.alugueis.push(novoAluguel)
            this.salvarAlugueis()

            bicicletasStore.alterarStatus(bicicleta.id, 'Alugada')
        },

        editarAluguel(id: number, dados: AluguelFormData) {
            const bicicletasStore = useBicicletasStore()
            bicicletasStore.carregarBicicletas()

            const index = this.alugueis.findIndex((aluguel) => aluguel.id === id)

            if (index === -1) {
                throw new Error('Aluguel não encontrado.')
            }

            const aluguelAtual = this.alugueis[index]
            const bicicletaNova = bicicletasStore.buscarPorId(dados.bicicletaId)

            if (!bicicletaNova) {
                throw new Error('Bicicleta não encontrada.')
            }

            if (new Date(dados.dataDevolucao) < new Date(dados.dataRetirada)) {
                throw new Error('A data de devolução não pode ser menor que a data de retirada.')
            }

            const mudouBicicleta = aluguelAtual.bicicletaId !== dados.bicicletaId
            const estavaAtivo = aluguelAtual.status === 'Ativo'
            const ficaraAtivo = dados.status === 'Ativo'

            if (mudouBicicleta && ficaraAtivo && bicicletaNova.status !== 'Disponível') {
                throw new Error('A nova bicicleta selecionada não está disponível.')
            }

            if (estavaAtivo && !ficaraAtivo) {
                bicicletasStore.alterarStatus(aluguelAtual.bicicletaId, 'Disponível')
            }

            if (!estavaAtivo && ficaraAtivo) {
                if (bicicletaNova.status !== 'Disponível') {
                    throw new Error('Esta bicicleta não está disponível para aluguel.')
                }

                bicicletasStore.alterarStatus(bicicletaNova.id, 'Alugada')
            }

            if (estavaAtivo && ficaraAtivo && mudouBicicleta) {
                bicicletasStore.alterarStatus(aluguelAtual.bicicletaId, 'Disponível')
                bicicletasStore.alterarStatus(bicicletaNova.id, 'Alugada')
            }

            this.alugueis[index] = {
                id,
                nomeCliente: dados.nomeCliente,
                telefoneCliente: dados.telefoneCliente,
                bicicletaId: dados.bicicletaId,
                bicicletaNome: bicicletaNova.nome,
                dataRetirada: dados.dataRetirada,
                dataDevolucao: dados.dataDevolucao,
                valorTotal: this.calcularValorTotal(
                    dados.dataRetirada,
                    dados.dataDevolucao,
                    bicicletaNova.valorDiaria
                ),
                status: dados.status,
                observacao: dados.observacao
            }

            this.salvarAlugueis()
        },

        finalizarAluguel(id: number) {
            const bicicletasStore = useBicicletasStore()
            bicicletasStore.carregarBicicletas()

            const aluguel = this.buscarPorId(id)

            if (!aluguel) return

            aluguel.status = 'Finalizado'
            this.salvarAlugueis()

            bicicletasStore.alterarStatus(aluguel.bicicletaId, 'Disponível')
        },

        cancelarAluguel(id: number) {
            const bicicletasStore = useBicicletasStore()
            bicicletasStore.carregarBicicletas()

            const aluguel = this.buscarPorId(id)

            if (!aluguel) return

            aluguel.status = 'Cancelado'
            this.salvarAlugueis()

            bicicletasStore.alterarStatus(aluguel.bicicletaId, 'Disponível')
        },

        excluirAluguel(id: number) {
            const bicicletasStore = useBicicletasStore()
            bicicletasStore.carregarBicicletas()

            const aluguel = this.buscarPorId(id)

            if (aluguel?.status === 'Ativo') {
                bicicletasStore.alterarStatus(aluguel.bicicletaId, 'Disponível')
            }

            this.alugueis = this.alugueis.filter((aluguel) => aluguel.id !== id)
            this.salvarAlugueis()
        }
    }
})