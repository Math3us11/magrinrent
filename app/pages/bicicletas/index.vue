<script setup lang="ts">
const bicicletasStore = useBicicletasStore()
const feedbackStore = useFeedbackStore()

onMounted(async () => {
  await bicicletasStore.carregarBicicletas()
})

const bicicletasDisponiveis = computed(() => {
  return bicicletasStore.bicicletas.filter(
    (bicicleta) => bicicleta.status === 'Disponível'
  ).length
})

const bicicletasAlugadas = computed(() => {
  return bicicletasStore.bicicletas.filter(
    (bicicleta) => bicicleta.status === 'Alugada'
  ).length
})

const bicicletasManutencao = computed(() => {
  return bicicletasStore.bicicletas.filter(
    (bicicleta) => bicicleta.status === 'Manutenção'
  ).length
})

function formatarMoeda(valor: number) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function statusClasse(status: string) {
  if (status === 'Disponível') {
    return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
  }

  if (status === 'Alugada') {
    return 'border-yellow-400/20 bg-yellow-400/10 text-yellow-300'
  }

  return 'border-blue-400/20 bg-blue-400/10 text-blue-300'
}

async function excluirBicicleta(id: number) {
  const confirmou = await feedbackStore.confirmar({
    titulo: 'Excluir bicicleta',
    mensagem: 'Tem certeza que deseja excluir esta bicicleta? Essa ação não poderá ser desfeita.',
    textoConfirmar: 'Excluir',
    textoCancelar: 'Cancelar',
    tipo: 'perigo'
  })

  if (!confirmou) return

  try {
    await bicicletasStore.excluirBicicleta(id)

    feedbackStore.sucesso('Bicicleta excluída com sucesso.')
  } catch (error) {
    feedbackStore.erro(
      'Erro ao excluir bicicleta.',
      'Verifique se ela não está vinculada a algum aluguel.'
    )
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
              Gestão administrativa
            </div>

            <h1 class="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Gerenciamento de
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                bicicletas.
              </span>
            </h1>

            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Cadastre, edite e acompanhe o status das bicicletas disponíveis para aluguel no sistema MagrinRent.
            </p>
          </div>

          <NuxtLink
            to="/bicicletas/nova"
            class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
          >
            Nova bicicleta
            <span class="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </NuxtLink>
        </div>

        <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10">
            <p class="text-sm text-slate-400">
              Total cadastradas
            </p>

            <p class="mt-2 text-3xl font-black text-white">
              {{ bicicletasStore.totalBicicletas }}
            </p>
          </div>

          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15">
            <p class="text-sm text-emerald-200">
              Disponíveis
            </p>

            <p class="mt-2 text-3xl font-black text-emerald-300">
              {{ bicicletasDisponiveis }}
            </p>
          </div>

          <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-yellow-400/15">
            <p class="text-sm text-yellow-100">
              Alugadas
            </p>

            <p class="mt-2 text-3xl font-black text-yellow-300">
              {{ bicicletasAlugadas }}
            </p>
          </div>

          <div class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15">
            <p class="text-sm text-blue-100">
              Em manutenção
            </p>

            <p class="mt-2 text-3xl font-black text-blue-300">
              {{ bicicletasManutencao }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-12">
      <div
        v-if="bicicletasStore.carregando"
        class="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

        <p class="mt-4 font-semibold text-slate-600">
          Carregando bicicletas...
        </p>
      </div>

      <div
        v-else-if="bicicletasStore.bicicletas.length > 0"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="bicicleta in bicicletasStore.bicicletas"
          :key="bicicleta.id"
          class="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200"
        >
          <div class="relative h-44 overflow-hidden bg-slate-950">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.24),transparent_38%)]" />

            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-7xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                🚲
              </span>
            </div>

            <div class="absolute left-4 top-4">
              <span
                class="rounded-full border px-3 py-1 text-xs font-black backdrop-blur"
                :class="statusClasse(bicicleta.status)"
              >
                {{ bicicleta.status }}
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-xl font-black text-slate-900">
                  {{ bicicleta.nome }}
                </h2>

                <p class="mt-1 text-sm font-semibold text-emerald-700">
                  {{ bicicleta.categoria }}
                </p>
              </div>

              <div class="rounded-2xl bg-emerald-50 px-3 py-2 text-right">
                <p class="text-xs font-bold text-emerald-700">
                  Diária
                </p>

                <p class="text-sm font-black text-emerald-800">
                  {{ formatarMoeda(bicicleta.valorDiaria) }}
                </p>
              </div>
            </div>

            <p class="mt-5 line-clamp-3 min-h-[72px] text-sm leading-relaxed text-slate-600">
              {{ bicicleta.descricao || 'Nenhuma descrição cadastrada para esta bicicleta.' }}
            </p>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <NuxtLink
                :to="`/bicicletas/${bicicleta.id}/editar`"
                class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Editar
              </NuxtLink>

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700 transition-all hover:-translate-y-0.5 hover:bg-red-100"
                @click="excluirBicicleta(bicicleta.id)"
              >
                Excluir
              </button>
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
          Nenhuma bicicleta cadastrada
        </h2>

        <p class="mt-3 text-slate-600">
          Cadastre a primeira bicicleta para começar a gerenciar os aluguéis.
        </p>

        <NuxtLink
          to="/bicicletas/nova"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
        >
          Cadastrar bicicleta
        </NuxtLink>
      </div>
    </section>
  </main>
</template>