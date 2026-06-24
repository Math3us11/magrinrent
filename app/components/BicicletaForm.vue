<script setup lang="ts">
import type { BicicletaFormData, StatusBicicleta } from '~/types/bicicleta'

const props = defineProps<{
  dadosIniciais?: BicicletaFormData
  carregando?: boolean
  textoBotao?: string
}>()

const emit = defineEmits<{
  salvar: [dados: BicicletaFormData]
}>()

const erro = ref('')

const form = reactive<BicicletaFormData>({
  nome: '',
  categoria: '',
  valorDiaria: 0,
  status: 'Disponível',
  descricao: ''
})

const statusOptions: StatusBicicleta[] = [
  'Disponível',
  'Alugada',
  'Manutenção'
]

watch(
  () => props.dadosIniciais,
  (dados) => {
    if (dados) {
      form.nome = dados.nome
      form.categoria = dados.categoria
      form.valorDiaria = Number(dados.valorDiaria)
      form.status = dados.status
      form.descricao = dados.descricao
    }
  },
  { immediate: true }
)

function enviarFormulario() {
  erro.value = ''

  if (!form.nome.trim()) {
    erro.value = 'Informe o nome da bicicleta.'
    return
  }

  if (!form.categoria.trim()) {
    erro.value = 'Informe a categoria da bicicleta.'
    return
  }

  if (!form.valorDiaria || Number(form.valorDiaria) <= 0) {
    erro.value = 'Informe um valor de diária válido.'
    return
  }

  emit('salvar', {
    nome: form.nome.trim(),
    categoria: form.categoria.trim(),
    valorDiaria: Number(form.valorDiaria),
    status: form.status,
    descricao: form.descricao.trim()
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
          for="nome"
          class="text-sm font-bold text-slate-200"
        >
          Nome da bicicleta
        </label>

        <input
          id="nome"
          v-model="form.nome"
          type="text"
          placeholder="Ex: Bike Urbana Aro 29"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>

      <div>
        <label
          for="categoria"
          class="text-sm font-bold text-slate-200"
        >
          Categoria
        </label>

        <input
          id="categoria"
          v-model="form.categoria"
          type="text"
          placeholder="Ex: Urbana, Mountain Bike, Elétrica"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <div>
        <label
          for="valorDiaria"
          class="text-sm font-bold text-slate-200"
        >
          Valor da diária
        </label>

        <input
          id="valorDiaria"
          v-model.number="form.valorDiaria"
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 35.00"
          class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
        >
      </div>

      <div>
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
    </div>

    <div>
      <label
        for="descricao"
        class="text-sm font-bold text-slate-200"
      >
        Descrição
      </label>

      <textarea
        id="descricao"
        v-model="form.descricao"
        rows="5"
        placeholder="Descreva características, estado da bicicleta ou observações importantes..."
        class="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
      />
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <NuxtLink
        to="/bicicletas"
        class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-white/15"
      >
        Cancelar
      </NuxtLink>

      <button
        type="submit"
        class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        :disabled="carregando"
      >
        <span v-if="carregando">
          Salvando...
        </span>

        <span
          v-else
          class="flex items-center"
        >
          {{ textoBotao || 'Salvar bicicleta' }}
          <span class="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </div>
  </form>
</template>