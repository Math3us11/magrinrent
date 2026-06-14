<script setup lang="ts">
import type { BicicletaFormData, StatusBicicleta } from '~/types/bicicleta'

const props = defineProps<{
  initialValues?: BicicletaFormData
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [dados: BicicletaFormData]
}>()

const form = reactive<BicicletaFormData>({
  nome: props.initialValues?.nome ?? '',
  categoria: props.initialValues?.categoria ?? '',
  valorDiaria: props.initialValues?.valorDiaria ?? 0,
  status: props.initialValues?.status ?? 'Disponível',
  descricao: props.initialValues?.descricao ?? ''
})

const statusOptions: StatusBicicleta[] = [
  'Disponível',
  'Alugada',
  'Manutenção'
]

function enviarFormulario() {
  if (!form.nome || !form.categoria || form.valorDiaria <= 0) {
    alert('Preencha nome, categoria e valor da diária corretamente.')
    return
  }

  emit('submit', {
    nome: form.nome,
    categoria: form.categoria,
    valorDiaria: Number(form.valorDiaria),
    status: form.status,
    descricao: form.descricao
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
        Nome da bicicleta
      </label>

      <input
        v-model="form.nome"
        type="text"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: Bicicleta Aro 29"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Categoria
      </label>

      <input
        v-model="form.categoria"
        type="text"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: Urbana, Mountain Bike, Infantil"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">
        Valor da diária
      </label>

      <input
        v-model.number="form.valorDiaria"
        type="number"
        min="1"
        step="0.01"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Ex: 35"
      >
    </div>

    <div>
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
        Descrição
      </label>

      <textarea
        v-model="form.descricao"
        rows="4"
        class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Descreva brevemente a bicicleta"
      />
    </div>

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
      >
        {{ submitLabel ?? 'Salvar' }}
      </button>

      <NuxtLink
        to="/bicicletas"
        class="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
      >
        Cancelar
      </NuxtLink>
    </div>
  </form>
</template>