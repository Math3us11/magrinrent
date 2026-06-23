<script setup lang="ts">
import type { BicicletaFormData } from '~/types/bicicleta'

const route = useRoute()
const bicicletasStore = useBicicletasStore()

const id = computed(() => Number(route.params.id))

const bicicleta = computed(() => {
  return bicicletasStore.buscarPorId(id.value)
})

onMounted(() => {
  bicicletasStore.carregarBicicletas()
})

async function editarBicicleta(dados: BicicletaFormData) {
  try {
    await bicicletasStore.editarBicicleta(id.value, dados)
    await navigateTo('/bicicletas')
  } catch (error) {
    alert('Erro ao editar bicicleta.')
  }
}
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Editar bicicleta
      </h1>

      <p class="mt-2 text-slate-600">
        Atualize as informações da bicicleta selecionada.
      </p>
    </div>

    <BicicletaForm
      v-if="bicicleta"
      :initial-values="{
        nome: bicicleta.nome,
        categoria: bicicleta.categoria,
        valorDiaria: bicicleta.valorDiaria,
        status: bicicleta.status,
        descricao: bicicleta.descricao
      }"
      submit-label="Salvar alterações"
      @submit="editarBicicleta"
    />

    <div
      v-else
      class="bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Bicicleta não encontrada.

      <div class="mt-4">
        <NuxtLink
          to="/bicicletas"
          class="text-emerald-700 font-medium hover:underline"
        >
          Voltar para a lista
        </NuxtLink>
      </div>
    </div>
  </section>
</template>