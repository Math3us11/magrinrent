<script setup lang="ts">
import type { BicicletaFormData } from '~/types/bicicleta'

const bicicletasStore = useBicicletasStore()

onMounted(() => {
  bicicletasStore.carregarBicicletas()
})

async function cadastrarBicicleta(dados: BicicletaFormData) {
  bicicletasStore.cadastrarBicicleta(dados)

  await navigateTo('/bicicletas')
}
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Nova bicicleta
      </h1>

      <p class="mt-2 text-slate-600">
        Preencha os dados para cadastrar uma nova bicicleta.
      </p>
    </div>

    <BicicletaForm
      submit-label="Cadastrar bicicleta"
      @submit="cadastrarBicicleta"
    />
  </section>
</template>