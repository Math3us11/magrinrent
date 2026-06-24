<script setup lang="ts">
import type { BicicletaFormData } from '~/types/bicicleta'

const bicicletasStore = useBicicletasStore()
const feedbackStore = useFeedbackStore()

async function salvarBicicleta(dados: BicicletaFormData) {
  try {
    await bicicletasStore.cadastrarBicicleta(dados)

    feedbackStore.sucesso('Bicicleta cadastrada com sucesso.')

    await navigateTo('/bicicletas')
  } catch (error) {
    feedbackStore.erro('Erro ao cadastrar bicicleta.')
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
              Cadastro de bicicleta
            </div>

            <h1 class="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tight">
              Nova
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                bicicleta.
              </span>
            </h1>

            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Preencha os dados da bicicleta para disponibilizá-la no sistema MagrinRent.
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
      <div class="relative">
        <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
        <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-slate-300">
          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
            <div class="mb-8">
              <p class="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                Formulário
              </p>

              <h2 class="mt-2 text-3xl font-black text-white">
                Dados da bicicleta
              </h2>

              <p class="mt-3 text-sm leading-relaxed text-slate-400">
                Os campos de nome, categoria e valor da diária são obrigatórios.
              </p>
            </div>

            <BicicletaForm
              :carregando="bicicletasStore.carregando"
              texto-botao="Cadastrar bicicleta"
              @salvar="salvarBicicleta"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>