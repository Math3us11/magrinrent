export type StatusBicicleta = 'Disponível' | 'Alugada' | 'Manutenção'

export type Bicicleta = {
    id: number
    nome: string
    categoria: string
    valorDiaria: number
    status: StatusBicicleta
    descricao: string
}

export type BicicletaFormData = Omit<Bicicleta, 'id'>