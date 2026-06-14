<script setup lang="ts">
const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()

onMounted(() => {
  bicicletasStore.carregarBicicletas()
  alugueisStore.carregarAlugueis()
})

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function formatarData(data: string) {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
}

function statusClasse(status: string) {
  if (status === 'Ativo') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (status === 'Finalizado') {
    return 'bg-blue-100 text-blue-700'
  }

  return 'bg-red-100 text-red-700'
}

function finalizarAluguel(id: number) {
  const confirmar = confirm('Deseja finalizar este aluguel?')

  if (confirmar) {
    alugueisStore.finalizarAluguel(id)
  }
}

function cancelarAluguel(id: number) {
  const confirmar = confirm('Deseja cancelar este aluguel?')

  if (confirmar) {
    alugueisStore.cancelarAluguel(id)
  }
}

function excluirAluguel(id: number) {
  const confirmar = confirm('Tem certeza que deseja excluir este aluguel?')

  if (confirmar) {
    alugueisStore.excluirAluguel(id)
  }
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">
          Aluguéis
        </h1>

        <p class="mt-2 text-slate-600">
          Gerencie os aluguéis realizados pela PedalRent.
        </p>
      </div>

      <NuxtLink
        to="/alugueis/novo"
        class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors text-center"
      >
        Novo aluguel
      </NuxtLink>
    </div>

    <div
      v-if="alugueisStore.alugueis.length > 0"
      class="mt-8 overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm"
    >
      <table class="w-full text-sm">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="text-left px-4 py-3">Cliente</th>
            <th class="text-left px-4 py-3">Bicicleta</th>
            <th class="text-left px-4 py-3">Período</th>
            <th class="text-left px-4 py-3">Valor</th>
            <th class="text-left px-4 py-3">Status</th>
            <th class="text-left px-4 py-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="aluguel in alugueisStore.alugueis"
            :key="aluguel.id"
            class="border-t border-slate-200"
          >
            <td class="px-4 py-4">
              <p class="font-semibold text-slate-900">
                {{ aluguel.nomeCliente }}
              </p>

              <p class="text-xs text-slate-500">
                {{ aluguel.telefoneCliente }}
              </p>
            </td>

            <td class="px-4 py-4 text-slate-700">
              {{ aluguel.bicicletaNome }}
            </td>

            <td class="px-4 py-4 text-slate-700">
              {{ formatarData(aluguel.dataRetirada) }}
              até
              {{ formatarData(aluguel.dataDevolucao) }}
            </td>

            <td class="px-4 py-4 font-semibold text-emerald-700">
              {{ formatarMoeda(aluguel.valorTotal) }}
            </td>

            <td class="px-4 py-4">
              <span
                class="text-xs font-semibold px-3 py-1 rounded-full"
                :class="statusClasse(aluguel.status)"
              >
                {{ aluguel.status }}
              </span>
            </td>

            <td class="px-4 py-4">
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  :to="`/alugueis/${aluguel.id}/editar`"
                  class="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  Editar
                </NuxtLink>

                <button
                  v-if="aluguel.status === 'Ativo'"
                  class="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                  @click="finalizarAluguel(aluguel.id)"
                >
                  Finalizar
                </button>

                <button
                  v-if="aluguel.status === 'Ativo'"
                  class="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-colors"
                  @click="cancelarAluguel(aluguel.id)"
                >
                  Cancelar
                </button>

                <button
                  class="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                  @click="excluirAluguel(aluguel.id)"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="mt-8 bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Nenhum aluguel registrado ainda.
    </div>
  </section>
</template>