<script setup lang="ts">
import type { AluguelFormData, StatusAluguel } from '~/types/aluguel'

const props = defineProps<{
  dadosIniciais?: AluguelFormData
  carregando?: boolean
  textoBotao?: string
  exibirStatus?: boolean
}>()

const emit = defineEmits<{
  salvar: [dados: AluguelFormData]
}>()

const bicicletasStore = useBicicletasStore()

const erro = ref('')

const form = reactive<AluguelFormData>({
  nomeCliente: '',
  telefoneCliente: '',
  bicicletaId: 0,
  dataRetirada: '',
  dataDevolucao: '',
  status: 'Ativo',
  observacao: ''
})

const statusOptions: StatusAluguel[] = [
  'Ativo',
  'Finalizado',
  'Cancelado'
]

onMounted(async () => {
  await bicicletasStore.carregarBicicletas()
})

function mascararTelefone(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11)

  if (numeros.length <= 2) {
    return numeros
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
  }

  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
}

function aplicarMascaraTelefone(event: Event) {
  const input = event.target as HTMLInputElement

  form.telefoneCliente = mascararTelefone(input.value)
}

watch(
  () => props.dadosIniciais,
  (dados) => {
    if (dados) {
      form.nomeCliente = dados.nomeCliente
      form.telefoneCliente = mascararTelefone(dados.telefoneCliente)
      form.bicicletaId = Number(dados.bicicletaId)
      form.dataRetirada = dados.dataRetirada
      form.dataDevolucao = dados.dataDevolucao
      form.status = dados.status
      form.observacao = dados.observacao
    }
  },
  { immediate: true }
)

const bicicletasParaSelecao = computed(() => {
  return bicicletasStore.bicicletas.filter((bicicleta) => {
    return bicicleta.status === 'Disponível' || bicicleta.id === Number(form.bicicletaId)
  })
})

const bicicletaSelecionada = computed(() => {
  return bicicletasStore.bicicletas.find((bicicleta) => bicicleta.id === Number(form.bicicletaId))
})

const quantidadeDias = computed(() => {
  if (!form.dataRetirada || !form.dataDevolucao) return 0

  const inicio = new Date(form.dataRetirada)
  const fim = new Date(form.dataDevolucao)

  if (fim < inicio) return 0

  const diferenca = fim.getTime() - inicio.getTime()
  const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24))

  return Math.max(dias, 1)
})

const valorPrevisto = computed(() => {
  if (!bicicletaSelecionada.value) return 0

  return quantidadeDias.value * Number(bicicletaSelecionada.value.valorDiaria)
})

function formatarMoeda(valor: number) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function enviarFormulario() {
  erro.value = ''

  if (!form.nomeCliente.trim()) {
    erro.value = 'Informe o nome do cliente.'
    return
  }

  const telefoneNumeros = form.telefoneCliente.replace(/\D/g, '')

  if (!telefoneNumeros) {
    erro.value = 'Informe o telefone do cliente.'
    return
  }

  if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
    erro.value = 'Informe um telefone válido com DDD.'
    return
  }

  if (!form.bicicletaId) {
    erro.value = 'Selecione uma bicicleta.'
    return
  }

  if (!form.dataRetirada) {
    erro.value = 'Informe a data de retirada.'
    return
  }

  if (!form.dataDevolucao) {
    erro.value = 'Informe a data de devolução.'
    return
  }

  if (new Date(form.dataDevolucao) < new Date(form.dataRetirada)) {
    erro.value = 'A data de devolução não pode ser menor que a data de retirada.'
    return
  }

  emit('salvar', {
    nomeCliente: form.nomeCliente.trim(),
    telefoneCliente: mascararTelefone(form.telefoneCliente),
    bicicletaId: Number(form.bicicletaId),
    dataRetirada: form.dataRetirada,
    dataDevolucao: form.dataDevolucao,
    status: form.status,
    observacao: form.observacao.trim()
  })
}
</script>

<template>
  <form
    class="grid gap-6"
    @submit.prevent="enviarFormulario"
  >
    <div
      v-if="erro"
      class="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200"
    >
      {{ erro }}
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <div>
        <label
          for="nomeCliente"
          class="text-sm font-bold text-slate-200"
        >
          Nome do cliente
        </label>

        <input
          id="nomeCliente"
          v-model="form.nomeCliente"
          type="text"
          placeholder="Ex: Dom Quixote"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>

      <div>
        <label
          for="telefoneCliente"
          class="text-sm font-bold text-slate-200"
        >
          Telefone
        </label>

        <input
          id="telefoneCliente"
          v-model="form.telefoneCliente"
          type="text"
          inputmode="numeric"
          maxlength="15"
          autocomplete="tel"
          placeholder="Ex: (69) 99999-9999"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
          @input="aplicarMascaraTelefone"
        >
      </div>
    </div>

    <div>
      <label
        for="bicicleta"
        class="text-sm font-bold text-slate-200"
      >
        Bicicleta
      </label>

      <select
        id="bicicleta"
        v-model.number="form.bicicletaId"
        class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all focus:border-emerald-400/60 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-400/10"
      >
        <option
          :value="0"
          disabled
          class="bg-slate-950 text-white"
        >
          Selecione uma bicicleta
        </option>

        <option
          v-for="bicicleta in bicicletasParaSelecao"
          :key="bicicleta.id"
          :value="bicicleta.id"
          class="bg-slate-950 text-white"
        >
          {{ bicicleta.nome }} - {{ bicicleta.categoria }} - {{ formatarMoeda(bicicleta.valorDiaria) }}
        </option>
      </select>

      <p
        v-if="bicicletasParaSelecao.length === 0"
        class="mt-2 text-sm text-yellow-300"
      >
        Nenhuma bicicleta disponível para aluguel no momento.
      </p>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <div>
        <label
          for="dataRetirada"
          class="text-sm font-bold text-slate-200"
        >
          Data de retirada
        </label>

        <input
          id="dataRetirada"
          v-model="form.dataRetirada"
          type="date"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>

      <div>
        <label
          for="dataDevolucao"
          class="text-sm font-bold text-slate-200"
        >
          Data de devolução
        </label>

        <input
          id="dataDevolucao"
          v-model="form.dataDevolucao"
          type="date"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>
    </div>

    <div
      v-if="props.exibirStatus !== false"
    >
      <label
        for="status"
        class="text-sm font-bold text-slate-200"
      >
        Status
      </label>

      <select
        id="status"
        v-model="form.status"
        class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all focus:border-emerald-400/60 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-400/10"
      >
        <option
          v-for="status in statusOptions"
          :key="status"
          :value="status"
          class="bg-slate-950 text-white"
        >
          {{ status }}
        </option>
      </select>
    </div>

    <div>
      <label
        for="observacao"
        class="text-sm font-bold text-slate-200"
      >
        Observação
      </label>

      <textarea
        id="observacao"
        v-model="form.observacao"
        rows="4"
        placeholder="Informe alguma observação sobre o aluguel..."
        class="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Bicicleta
        </p>

        <p class="mt-2 font-black text-white">
          {{ bicicletaSelecionada?.nome || 'Não selecionada' }}
        </p>
      </div>

      <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
          Diárias
        </p>

        <p class="mt-2 font-black text-emerald-200">
          {{ quantidadeDias }}
        </p>
      </div>

      <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
          Valor previsto
        </p>

        <p class="mt-2 font-black text-yellow-200">
          {{ formatarMoeda(valorPrevisto) }}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <NuxtLink
        to="/alugueis"
        class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-white/15"
      >
        Cancelar
      </NuxtLink>

      <button
        type="submit"
        class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        :disabled="props.carregando || bicicletasParaSelecao.length === 0"
      >
        <span v-if="props.carregando">
          Salvando...
        </span>

        <span
          v-else
          class="flex items-center"
        >
          {{ props.textoBotao || 'Salvar aluguel' }}
          <span class="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </div>
  </form>
</template>