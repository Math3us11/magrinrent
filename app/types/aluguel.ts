export type StatusAluguel = 'Ativo' | 'Finalizado' | 'Cancelado'

export type Aluguel = {
    id: number
    nomeCliente: string
    telefoneCliente: string
    bicicletaId: number
    bicicletaNome: string
    dataRetirada: string
    dataDevolucao: string
    valorTotal: number
    status: StatusAluguel
    observacao: string
}

export type AluguelFormData = {
    nomeCliente: string
    telefoneCliente: string
    bicicletaId: number
    dataRetirada: string
    dataDevolucao: string
    status: StatusAluguel
    observacao: string
}