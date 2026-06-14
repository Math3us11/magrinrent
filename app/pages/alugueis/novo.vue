<script setup lang="ts">
import type { AluguelFormData } from '~/types/aluguel'

const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()

onMounted(() => {
  bicicletasStore.carregarBicicletas()
  alugueisStore.carregarAlugueis()
})

async function cadastrarAluguel(dados: AluguelFormData) {
  try {
    alugueisStore.cadastrarAluguel(dados)
    await navigateTo('/alugueis')
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Erro ao cadastrar aluguel.')
  }
}
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900">
        Novo aluguel
      </h1>

      <p class="mt-2 text-slate-600">
        Registre o aluguel de uma bicicleta disponível.
      </p>
    </div>

    <AluguelForm
      v-if="bicicletasStore.bicicletasDisponiveis.length > 0"
      :bicicletas="bicicletasStore.bicicletasDisponiveis"
      submit-label="Cadastrar aluguel"
      @submit="cadastrarAluguel"
    />

    <div
      v-else
      class="bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Nenhuma bicicleta disponível para aluguel no momento.

      <div class="mt-4">
        <NuxtLink
          to="/bicicletas"
          class="text-emerald-700 font-medium hover:underline"
        >
          Ver bicicletas cadastradas
        </NuxtLink>
      </div>
    </div>
  </section>
</template>