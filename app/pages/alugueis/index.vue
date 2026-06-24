<script setup lang="ts">
const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()
const authStore = useAuthStore()
const feedbackStore = useFeedbackStore()

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }

  await bicicletasStore.carregarBicicletas()
  await alugueisStore.carregarAlugueis()
})

const totalAlugueis = computed(() => alugueisStore.alugueis.length)

const alugueisAtivos = computed(() => {
  return alugueisStore.alugueis.filter((aluguel) => aluguel.status === 'Ativo').length
})

const alugueisFinalizados = computed(() => {
  return alugueisStore.alugueis.filter((aluguel) => aluguel.status === 'Finalizado').length
})

const alugueisCancelados = computed(() => {
  return alugueisStore.alugueis.filter((aluguel) => aluguel.status === 'Cancelado').length
})

const valorTotalAlugueis = computed(() => {
  return alugueisStore.alugueis.reduce((total, aluguel) => {
    return total + Number(aluguel.valorTotal)
  }, 0)
})

function formatarMoeda(valor: number) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function formatarData(data: string) {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
}

function statusClasse(status: string) {
  if (status === 'Ativo') {
    return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
  }

  if (status === 'Finalizado') {
    return 'border-blue-400/20 bg-blue-400/10 text-blue-300'
  }

  return 'border-red-400/20 bg-red-400/10 text-red-300'
}

function cardIcone(status: string) {
  if (status === 'Ativo') return '🚲'
  if (status === 'Finalizado') return '✅'
  return '🚫'
}

async function finalizarAluguel(id: number) {
  const confirmou = await feedbackStore.confirmar({
    titulo: 'Finalizar aluguel',
    mensagem: 'Deseja finalizar este aluguel? A bicicleta voltará a ficar disponível.',
    textoConfirmar: 'Finalizar',
    textoCancelar: 'Cancelar'
  })

  if (!confirmou) return

  try {
    await alugueisStore.finalizarAluguel(id)

    feedbackStore.sucesso('Aluguel finalizado com sucesso.')
  } catch (error) {
    feedbackStore.erro('Erro ao finalizar aluguel.')
  }
}

async function cancelarAluguel(id: number) {
  const confirmou = await feedbackStore.confirmar({
    titulo: 'Cancelar aluguel',
    mensagem: 'Deseja cancelar este aluguel? A bicicleta voltará a ficar disponível.',
    textoConfirmar: 'Cancelar aluguel',
    textoCancelar: 'Voltar',
    tipo: 'perigo'
  })

  if (!confirmou) return

  try {
    await alugueisStore.cancelarAluguel(id)

    feedbackStore.sucesso('Aluguel cancelado com sucesso.')
  } catch (error) {
    feedbackStore.erro('Erro ao cancelar aluguel.')
  }
}

async function excluirAluguel(id: number) {
  const confirmou = await feedbackStore.confirmar({
    titulo: 'Excluir aluguel',
    mensagem: 'Tem certeza que deseja excluir este aluguel? Essa ação não poderá ser desfeita.',
    textoConfirmar: 'Excluir',
    textoCancelar: 'Cancelar',
    tipo: 'perigo'
  })

  if (!confirmou) return

  try {
    await alugueisStore.excluirAluguel(id)

    feedbackStore.sucesso('Aluguel excluído com sucesso.')
  } catch (error) {
    feedbackStore.erro('Erro ao excluir aluguel.')
  }
}
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />

      <div class="relative max-w-6xl mx-auto px-6 py-14 lg:py-16">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              {{ authStore.isAdmin ? 'Gestão administrativa' : 'Área do cliente' }}
            </div>

            <h1 class="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              {{ authStore.isAdmin ? 'Gerenciamento de' : 'Meus' }}
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                aluguéis.
              </span>
            </h1>

            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              <span v-if="authStore.isAdmin">
                Acompanhe todos os aluguéis cadastrados, finalize reservas, cancele solicitações e controle as bicicletas alugadas.
              </span>

              <span v-else>
                Solicite novos aluguéis, acompanhe suas reservas e cancele solicitações ativas quando necessário.
              </span>
            </p>
          </div>

          <NuxtLink
            to="/alugueis/novo"
            class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
          >
            Novo aluguel
            <span class="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </NuxtLink>
        </div>

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10">
            <p class="text-sm text-slate-400">
              Total
            </p>

            <p class="mt-2 text-3xl font-black text-white">
              {{ totalAlugueis }}
            </p>
          </div>

          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15">
            <p class="text-sm text-emerald-200">
              Ativos
            </p>

            <p class="mt-2 text-3xl font-black text-emerald-300">
              {{ alugueisAtivos }}
            </p>
          </div>

          <div class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15">
            <p class="text-sm text-blue-100">
              Finalizados
            </p>

            <p class="mt-2 text-3xl font-black text-blue-300">
              {{ alugueisFinalizados }}
            </p>
          </div>

          <div class="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-red-400/15">
            <p class="text-sm text-red-100">
              Cancelados
            </p>

            <p class="mt-2 text-3xl font-black text-red-300">
              {{ alugueisCancelados }}
            </p>
          </div>

          <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-yellow-400/15">
            <p class="text-sm text-yellow-100">
              Valor total
            </p>

            <p class="mt-2 text-xl font-black text-yellow-300">
              {{ formatarMoeda(valorTotalAlugueis) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-12">
      <div
        v-if="alugueisStore.carregando"
        class="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

        <p class="mt-4 font-semibold text-slate-600">
          Carregando aluguéis...
        </p>
      </div>

      <div
        v-else-if="alugueisStore.alugueis.length > 0"
        class="grid gap-6 lg:grid-cols-2"
      >
        <article
          v-for="aluguel in alugueisStore.alugueis"
          :key="aluguel.id"
          class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
        >
          <div class="relative overflow-hidden bg-slate-950 p-6 text-white">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.24),transparent_38%)]" />

            <div class="relative flex items-start justify-between gap-4">
              <div>
                <span
                  class="inline-flex rounded-full border px-3 py-1 text-xs font-black backdrop-blur"
                  :class="statusClasse(aluguel.status)"
                >
                  {{ aluguel.status }}
                </span>

                <h2 class="mt-4 text-2xl font-black text-white">
                  {{ aluguel.nomeCliente }}
                </h2>

                <p class="mt-1 text-sm text-slate-300">
                  {{ aluguel.telefoneCliente }}
                </p>
              </div>

              <div class="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-4xl backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {{ cardIcone(aluguel.status) }}
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Bicicleta
                </p>

                <p class="mt-2 font-black text-slate-900">
                  {{ aluguel.bicicletaNome }}
                </p>
              </div>

              <div class="rounded-2xl bg-emerald-50 p-4">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                  Valor total
                </p>

                <p class="mt-2 font-black text-emerald-800">
                  {{ formatarMoeda(aluguel.valorTotal) }}
                </p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Retirada
                </p>

                <p class="mt-2 font-black text-slate-900">
                  {{ formatarData(aluguel.dataRetirada) }}
                </p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  Devolução
                </p>

                <p class="mt-2 font-black text-slate-900">
                  {{ formatarData(aluguel.dataDevolucao) }}
                </p>
              </div>
            </div>

            <div
              v-if="aluguel.observacao"
              class="mt-5 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Observação
              </p>

              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                {{ aluguel.observacao }}
              </p>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <NuxtLink
                v-if="authStore.isAdmin"
                :to="`/alugueis/${aluguel.id}/editar`"
                class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Editar
              </NuxtLink>

              <button
                v-if="authStore.isAdmin && aluguel.status === 'Ativo'"
                type="button"
                class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 transition-all hover:-translate-y-0.5 hover:bg-blue-100"
                @click="finalizarAluguel(aluguel.id)"
              >
                Finalizar
              </button>

              <button
                v-if="aluguel.status === 'Ativo'"
                type="button"
                class="inline-flex items-center justify-center rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-black text-yellow-700 transition-all hover:-translate-y-0.5 hover:bg-yellow-100"
                @click="cancelarAluguel(aluguel.id)"
              >
                Cancelar
              </button>

              <button
                v-if="authStore.isAdmin"
                type="button"
                class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700 transition-all hover:-translate-y-0.5 hover:bg-red-100"
                @click="excluirAluguel(aluguel.id)"
              >
                Excluir
              </button>

              <span
                v-if="!authStore.isAdmin && aluguel.status !== 'Ativo'"
                class="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500"
              >
                Nenhuma ação disponível
              </span>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-4xl">
          🚲
        </div>

        <h2 class="mt-6 text-2xl font-black text-slate-900">
          Nenhum aluguel encontrado
        </h2>

        <p class="mt-3 text-slate-600">
          {{ authStore.isAdmin ? 'Ainda não existem aluguéis cadastrados no sistema.' : 'Você ainda não possui aluguéis cadastrados.' }}
        </p>

        <NuxtLink
          to="/alugueis/novo"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
        >
          Criar novo aluguel
        </NuxtLink>
      </div>
    </section>
  </main>
</template>