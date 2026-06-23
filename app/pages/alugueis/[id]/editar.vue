<script setup lang="ts">
import type { AluguelFormData } from '~/types/aluguel'

const route = useRoute()
const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()

const id = computed(() => Number(route.params.id))

const aluguel = computed(() => {
  return alugueisStore.buscarPorId(id.value)
})

onMounted(() => {
  bicicletasStore.carregarBicicletas()
  alugueisStore.carregarAlugueis()
})

async function editarAluguel(dados: AluguelFormData) {
  try {
    await alugueisStore.editarAluguel(id.value, dados)
    await navigateTo('/alugueis')
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Erro ao editar aluguel.')
  }
}
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Editar aluguel
      </h1>

      <p class="mt-2 text-slate-600">
        Atualize as informações do aluguel selecionado.
      </p>
    </div>

    <AluguelForm
      v-if="aluguel"
      :bicicletas="bicicletasStore.bicicletas"
      :initial-values="{
        nomeCliente: aluguel.nomeCliente,
        telefoneCliente: aluguel.telefoneCliente,
        bicicletaId: aluguel.bicicletaId,
        dataRetirada: aluguel.dataRetirada,
        dataDevolucao: aluguel.dataDevolucao,
        status: aluguel.status,
        observacao: aluguel.observacao
      }"
      submit-label="Salvar alterações"
      :mostrar-status="true"
      @submit="editarAluguel"
    />

    <div
      v-else
      class="bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Aluguel não encontrado.

      <div class="mt-4">
        <NuxtLink
          to="/alugueis"
          class="text-emerald-700 font-medium hover:underline"
        >
          Voltar para a lista
        </NuxtLink>
      </div>
    </div>
  </section>
</template>