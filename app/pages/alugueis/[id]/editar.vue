<script setup lang="ts">
import type { AluguelFormData } from '~/types/aluguel'

const route = useRoute()
const alugueisStore = useAlugueisStore()
const bicicletasStore = useBicicletasStore()
const feedbackStore = useFeedbackStore()

const id = Number(route.params.id)
const carregandoPagina = ref(true)

onMounted(async () => {
  await bicicletasStore.carregarBicicletas()
  await alugueisStore.carregarAlugueis()
  carregandoPagina.value = false
})

const aluguel = computed(() => {
  return alugueisStore.buscarPorId(id)
})

const dadosFormulario = computed<AluguelFormData | undefined>(() => {
  if (!aluguel.value) return undefined

  return {
    nomeCliente: aluguel.value.nomeCliente,
    telefoneCliente: aluguel.value.telefoneCliente,
    bicicletaId: aluguel.value.bicicletaId,
    dataRetirada: aluguel.value.dataRetirada,
    dataDevolucao: aluguel.value.dataDevolucao,
    status: aluguel.value.status,
    observacao: aluguel.value.observacao
  }
})

async function salvarAluguel(dados: AluguelFormData) {
  try {
    await alugueisStore.editarAluguel(id, dados)

    feedbackStore.sucesso('Aluguel atualizado com sucesso.')

    await navigateTo('/alugueis')
  } catch (error) {
    feedbackStore.erro(
      'Erro ao editar aluguel.',
      'Verifique se a bicicleta está disponível.'
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
            <div class="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Edição de aluguel
            </div>

            <h1 class="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Editar
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                aluguel.
              </span>
            </h1>

            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Atualize cliente, bicicleta, período, observações e status do aluguel cadastrado.
            </p>
          </div>

          <NuxtLink
            to="/alugueis"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
          >
            Voltar para aluguéis
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-6 py-12">
      <div
        v-if="carregandoPagina"
        class="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

        <p class="mt-4 font-semibold text-slate-600">
          Carregando aluguel...
        </p>
      </div>

      <div
        v-else-if="!aluguel"
        class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-4xl">
          ⚠️
        </div>

        <h2 class="mt-6 text-2xl font-black text-slate-900">
          Aluguel não encontrado
        </h2>

        <p class="mt-3 text-slate-600">
          O registro solicitado não existe ou foi removido do sistema.
        </p>

        <NuxtLink
          to="/alugueis"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
        >
          Voltar para aluguéis
        </NuxtLink>
      </div>

      <div
        v-else
        class="relative"
      >
        <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-slate-300">
          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
            <div class="mb-8">
              <p class="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                Formulário
              </p>

              <h2 class="mt-2 text-3xl font-black text-white">
                {{ aluguel.nomeCliente }}
              </h2>

              <p class="mt-3 text-sm leading-relaxed text-slate-400">
                Edite as informações do aluguel e salve para atualizar o registro.
              </p>
            </div>

            <AluguelForm
              :dados-iniciais="dadosFormulario"
              :carregando="alugueisStore.carregando"
              texto-botao="Salvar alterações"
              @salvar="salvarAluguel"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>