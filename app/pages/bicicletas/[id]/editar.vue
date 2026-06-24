<script setup lang="ts">
import type { BicicletaFormData } from '~/types/bicicleta'

const route = useRoute()
const bicicletasStore = useBicicletasStore()
const feedbackStore = useFeedbackStore()

const id = Number(route.params.id)
const carregandoPagina = ref(true)

onMounted(async () => {
  await bicicletasStore.carregarBicicletas()
  carregandoPagina.value = false
})

const bicicleta = computed(() => {
  return bicicletasStore.buscarPorId(id)
})

const dadosFormulario = computed<BicicletaFormData | undefined>(() => {
  if (!bicicleta.value) return undefined

  return {
    nome: bicicleta.value.nome,
    categoria: bicicleta.value.categoria,
    valorDiaria: bicicleta.value.valorDiaria,
    status: bicicleta.value.status,
    descricao: bicicleta.value.descricao
  }
})

async function salvarBicicleta(dados: BicicletaFormData) {
  try {
    await bicicletasStore.editarBicicleta(id, dados)

    feedbackStore.sucesso('Bicicleta atualizada com sucesso.')

    await navigateTo('/bicicletas')
  } catch (error) {
    feedbackStore.erro('Erro ao editar bicicleta.')
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
              Edição de bicicleta
            </div>

            <h1 class="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Editar
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                bicicleta.
              </span>
            </h1>

            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Atualize os dados, valor da diária e status da bicicleta cadastrada.
            </p>
          </div>

          <NuxtLink
            to="/bicicletas"
            class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
          >
            Voltar para bicicletas
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
          Carregando bicicleta...
        </p>
      </div>

      <div
        v-else-if="!bicicleta"
        class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-4xl">
          ⚠️
        </div>

        <h2 class="mt-6 text-2xl font-black text-slate-900">
          Bicicleta não encontrada
        </h2>

        <p class="mt-3 text-slate-600">
          O registro solicitado não existe ou foi removido do sistema.
        </p>

        <NuxtLink
          to="/bicicletas"
          class="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
        >
          Voltar para bicicletas
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
                {{ bicicleta.nome }}
              </h2>

              <p class="mt-3 text-sm leading-relaxed text-slate-400">
                Edite as informações da bicicleta e salve para atualizar o cadastro.
              </p>
            </div>

            <BicicletaForm
              :dados-iniciais="dadosFormulario"
              :carregando="bicicletasStore.carregando"
              texto-botao="Salvar alterações"
              @salvar="salvarBicicleta"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>