import { defineStore } from 'pinia'

type TipoToast = 'sucesso' | 'erro' | 'info'

type Toast = {
    id: number
    tipo: TipoToast
    titulo: string
    mensagem?: string
}

type TipoConfirmacao = 'normal' | 'perigo'

type Confirmacao = {
    titulo: string
    mensagem: string
    textoConfirmar: string
    textoCancelar: string
    tipo: TipoConfirmacao
    resolver: (valor: boolean) => void
}

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        toasts: [] as Toast[],
        confirmacao: null as Confirmacao | null
    }),

    actions: {
        adicionarToast(tipo: TipoToast, titulo: string, mensagem?: string) {
            const id = Date.now() + Math.random()

            this.toasts.push({
                id,
                tipo,
                titulo,
                mensagem
            })

            setTimeout(() => {
                this.removerToast(id)
            }, 4000)
        },

        sucesso(titulo: string, mensagem?: string) {
            this.adicionarToast('sucesso', titulo, mensagem)
        },

        erro(titulo: string, mensagem?: string) {
            this.adicionarToast('erro', titulo, mensagem)
        },

        info(titulo: string, mensagem?: string) {
            this.adicionarToast('info', titulo, mensagem)
        },

        removerToast(id: number) {
            this.toasts = this.toasts.filter((toast) => toast.id !== id)
        },

        confirmar(opcoes: {
            titulo: string
            mensagem: string
            textoConfirmar?: string
            textoCancelar?: string
            tipo?: TipoConfirmacao
        }) {
            return new Promise<boolean>((resolve) => {
                this.confirmacao = {
                    titulo: opcoes.titulo,
                    mensagem: opcoes.mensagem,
                    textoConfirmar: opcoes.textoConfirmar || 'Confirmar',
                    textoCancelar: opcoes.textoCancelar || 'Cancelar',
                    tipo: opcoes.tipo || 'normal',
                    resolver: resolve
                }
            })
        },

        responderConfirmacao(valor: boolean) {
            if (this.confirmacao) {
                this.confirmacao.resolver(valor)
                this.confirmacao = null
            }
        }
    }
})