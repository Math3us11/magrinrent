<script setup lang="ts">
import type { Bicicleta } from '~/types/bicicleta'
import type { AluguelFormData, StatusAluguel } from '~/types/aluguel'

const props = defineProps<{
  bicicletas: Bicicleta[]
  initialValues?: AluguelFormData
  submitLabel?: string
  mostrarStatus?: boolean
}>()

const emit = defineEmits<{
  submit: [dados: AluguelFormData]
}>()

const form = reactive<AluguelFormData>({
  nomeCliente: props.initialValues?.nomeCliente ?? '',
  telefoneCliente: props.initialValues?.telefoneCliente ?? '',
  bicicletaId: props.initialValues?.bicicletaId ?? 0,
  dataRetirada: props.initialValues?.dataRetirada ?? '',
  dataDevolucao: props.initialValues?.dataDevolucao ?? '',
  status: props.initialValues?.status ?? 'Ativo',
  observacao: props.initialValues?.observacao ?? ''
})

const statusOptions: StatusAluguel[] = [
  'Ativo',
  'Finalizado',
  'Cancelado'
]

const bicicletaSelecionada = computed(() => {
  return props.bicicletas.find((bicicleta) => bicicleta.id === form.bicicletaId)
})

const totalPrevisto = computed(() => {
  if (!bicicletaSelecionada.value || !form.dataRetirada || !form.dataDevolucao) {
    return 0
  }

  const inicio = new Date(form.dataRetirada)
  const fim = new Date(form.dataDevolucao)

  if (fim < inicio) {
    return 0
  }

  const diferenca = fim.getTime() - inicio.getTime()
  const dias = Math.max(Math.ceil(diferenca / (1000 * 60 * 60 * 24)), 1)

  return dias * bicicletaSelecionada.value.valorDiaria
})

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function enviarFormulario() {
  if (!form.nomeCliente || !form.telefoneCliente || !form.bicicletaId) {
    alert('Preencha cliente, telefone e bicicleta.')
    return
  }

  if (!form.dataRetirada || !form.dataDevolucao) {
    alert('Preencha as datas do aluguel.')
    return
  }

  if (new Date(form.dataDevolucao) < new Date(form.dataRetirada)) {
    alert('A data de devolução não pode ser menor que a data de retirada.')
    return
  }

  emit('submit', {
    nomeCliente: form.nomeCliente,
    telefoneCliente: form.telefoneCliente,
    bicicletaId: Number(form.bicicletaId),
    dataRetirada: form.dataRetirada,
    dataDevolucao: form.dataDevolucao,
    status: form.status,
    observacao: form.observacao
  })
}
</script>

<template>
  <form
    class="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5"
    @submit.prevent="enviarFormulario"
  >
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Nome do cliente
      </label>

      <input
        v-model="form.nomeCliente"
        type="text"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: João Silva"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Telefone do cliente
      </label>

      <input
        v-model="form.telefoneCliente"
        type="text"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: (69) 99999-9999"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Bicicleta
      </label>

      <select
        v-model.number="form.bicicletaId"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
      >
        <option :value="0">
          Selecione uma bicicleta
        </option>

        <option
          v-for="bicicleta in bicicletas"
          :key="bicicleta.id"
          :value="bicicleta.id"
        >
          {{ bicicleta.nome }} - R$ {{ bicicleta.valorDiaria }} / diária
        </option>
      </select>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">
          Data de retirada
        </label>

        <input
          v-model="form.dataRetirada"
          type="date"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">
          Data de devolução
        </label>

        <input
          v-model="form.dataDevolucao"
          type="date"
          class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        >
      </div>
    </div>

    <div v-if="mostrarStatus">
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Status
      </label>

      <select
        v-model="form.status"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
      >
        <option
          v-for="status in statusOptions"
          :key="status"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Observação
      </label>

      <textarea
        v-model="form.observacao"
        rows="4"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: Cliente solicitou capacete junto com a bicicleta"
      />
    </div>

    <div class="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
      <p class="text-sm text-slate-600">
        Valor previsto:
      </p>

      <p class="text-2xl font-bold text-emerald-700">
        {{ formatarMoeda(totalPrevisto) }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
      >
        {{ submitLabel ?? 'Salvar' }}
      </button>

      <NuxtLink
        to="/alugueis"
        class="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
      >
        Cancelar
      </NuxtLink>
    </div>
  </form>
</template>