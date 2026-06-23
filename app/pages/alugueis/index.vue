<script setup lang="ts">
const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }

  await bicicletasStore.carregarBicicletas()
  await alugueisStore.carregarAlugueis()
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

async function finalizarAluguel(id: number) {
  const confirmar = confirm('Deseja finalizar este aluguel?')

  if (!confirmar) return

  try {
    await alugueisStore.finalizarAluguel(id)
  } catch (error) {
    alert('Erro ao finalizar aluguel.')
  }
}

async function cancelarAluguel(id: number) {
  const confirmar = confirm('Deseja cancelar este aluguel?')

  if (!confirmar) return

  try {
    await alugueisStore.cancelarAluguel(id)
  } catch (error) {
    alert('Erro ao cancelar aluguel.')
  }
}

async function excluirAluguel(id: number) {
  const confirmar = confirm('Tem certeza que deseja excluir este aluguel?')

  if (!confirmar) return

  try {
    await alugueisStore.excluirAluguel(id)
  } catch (error) {
    alert('Erro ao excluir aluguel.')
  }
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
          {{ authStore.isAdmin ? 'Gestão administrativa' : 'Área do cliente' }}
        </p>

        <h1 class="mt-2 text-3xl font-bold text-slate-900">
          {{ authStore.isAdmin ? 'Aluguéis' : 'Meus aluguéis' }}
        </h1>

        <p class="mt-2 text-slate-600">
          <span v-if="authStore.isAdmin">
            Gerencie todos os aluguéis realizados pela MagrinRent.
          </span>

          <span v-else>
            Acompanhe seus aluguéis e solicite novas bicicletas disponíveis.
          </span>
        </p>
      </div>

      <NuxtLink
        to="/alugueis/novo"
        class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors text-center"
      >
        Novo aluguel
      </NuxtLink>
    </div>

    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Total de aluguéis
        </p>

        <p class="mt-2 text-3xl font-bold text-slate-900">
          {{ alugueisStore.totalAlugueis }}
        </p>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Aluguéis ativos
        </p>

        <p class="mt-2 text-3xl font-bold text-emerald-700">
          {{ alugueisStore.alugueisAtivos.length }}
        </p>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Bicicletas disponíveis
        </p>

        <p class="mt-2 text-3xl font-bold text-blue-700">
          {{ bicicletasStore.bicicletasDisponiveis.length }}
        </p>
      </div>

      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Perfil atual
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900 capitalize">
          {{ authStore.usuario?.tipo }}
        </p>
      </div>
    </div>

    <div
      v-if="alugueisStore.carregando"
      class="mt-8 bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Carregando aluguéis...
    </div>

    <div
      v-else-if="alugueisStore.alugueis.length > 0"
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
                  v-if="authStore.isAdmin"
                  :to="`/alugueis/${aluguel.id}/editar`"
                  class="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  Editar
                </NuxtLink>

                <button
                  v-if="authStore.isAdmin && aluguel.status === 'Ativo'"
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
                  v-if="authStore.isAdmin"
                  class="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                  @click="excluirAluguel(aluguel.id)"
                >
                  Excluir
                </button>

                <span
                  v-if="!authStore.isAdmin && aluguel.status !== 'Ativo'"
                  class="text-xs text-slate-500"
                >
                  Nenhuma ação disponível
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="mt-8 bg-white border border-slate-200 rounded-xl p-8 text-center"
    >
      <h2 class="text-xl font-bold text-slate-900">
        Nenhum aluguel encontrado
      </h2>

      <p class="mt-2 text-slate-600">
        {{ authStore.isAdmin ? 'Ainda não existem aluguéis cadastrados no sistema.' : 'Você ainda não possui aluguéis cadastrados.' }}
      </p>

      <NuxtLink
        to="/alugueis/novo"
        class="inline-block mt-5 bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
      >
        Criar novo aluguel
      </NuxtLink>
    </div>
  </section>
</template>