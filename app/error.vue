<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => {
  return props.error.statusCode || 500
})

const is404 = computed(() => statusCode.value === 404)

const titulo = computed(() => {
  if (is404.value) {
    return 'Página não encontrada'
  }

  return 'Erro interno no sistema'
})

const subtitulo = computed(() => {
  if (is404.value) {
    return 'A página que você tentou acessar não existe, foi removida ou teve o endereço alterado.'
  }

  return 'Ocorreu um problema inesperado ao processar sua solicitação. Tente novamente em alguns instantes.'
})

const etiqueta = computed(() => {
  if (is404.value) {
    return 'Erro 404'
  }

  return `Erro ${statusCode.value}`
})

const icone = computed(() => {
  if (is404.value) {
    return '🔎'
  }

  return '⚠️'
})

const detalhes = computed(() => {
  if (is404.value) {
    return [
      'Verifique se o endereço digitado está correto.',
      'Use o menu para voltar para uma área existente.',
      'Acesse a página inicial para continuar navegando.'
    ]
  }

  return [
    'Recarregue a página e tente novamente.',
    'Verifique se o servidor e o banco de dados estão funcionando.',
    'Caso o erro continue, revise o terminal do projeto.'
  ]
})

async function voltarInicio() {
  await clearError({
    redirect: '/'
  })
}

async function irLogin() {
  await clearError({
    redirect: '/login'
  })
}

function recarregarPagina() {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>

<template>
  <NuxtLayout>
    <main class="min-h-screen bg-slate-50">
      <section class="relative overflow-hidden bg-slate-950 text-white">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />
        <div class="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

        <div class="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div class="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {{ etiqueta }}
              </div>

              <h1 class="mt-6 text-5xl md:text-7xl font-black leading-tight tracking-tight">
                {{ statusCode }}
                <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                  {{ titulo }}
                </span>
              </h1>

              <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {{ subtitulo }}
              </p>

              <div class="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
                  @click="voltarInicio"
                >
                  Voltar ao início
                  <span class="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
                  @click="recarregarPagina"
                >
                  Tentar novamente
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 px-6 py-3.5 text-sm font-black text-emerald-200 transition-all hover:-translate-y-1 hover:bg-emerald-400/10"
                  @click="irLogin"
                >
                  Ir para login
                </button>
              </div>
            </div>

            <div class="relative">
              <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
              <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

              <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-8">
                  <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-blue-500 text-4xl shadow-lg shadow-emerald-500/20">
                    {{ icone }}
                  </div>

                  <h2 class="mt-8 text-3xl font-black text-white">
                    O que aconteceu?
                  </h2>

                  <p class="mt-4 leading-relaxed text-slate-400">
                    O MagrinRent não conseguiu abrir esta área da forma esperada.
                    Abaixo estão algumas ações recomendadas para continuar.
                  </p>

                  <div class="mt-8 grid gap-4">
                    <div
                      v-for="(item, index) in detalhes"
                      :key="item"
                      class="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:bg-white/10"
                    >
                      <div class="flex gap-4">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-black text-emerald-300 ring-1 ring-emerald-400/20">
                          {{ String(index + 1).padStart(2, '0') }}
                        </div>

                        <p class="text-sm leading-relaxed text-slate-300">
                          {{ item }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="error.statusMessage || error.message"
                    class="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4"
                  >
                    <p class="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                      Informação técnica
                    </p>

                    <p class="mt-2 break-words text-sm leading-relaxed text-yellow-100">
                      {{ error.statusMessage || error.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              class="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10"
              @click="voltarInicio"
            >
              <p class="text-sm text-slate-400">
                Navegação
              </p>

              <p class="mt-2 text-2xl font-black text-white">
                Início
              </p>
            </button>

            <button
              type="button"
              class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15"
              @click="irLogin"
            >
              <p class="text-sm text-emerald-200">
                Acesso
              </p>

              <p class="mt-2 text-2xl font-black text-emerald-300">
                Login
              </p>
            </button>

            <button
              type="button"
              class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15"
              @click="recarregarPagina"
            >
              <p class="text-sm text-blue-100">
                Sistema
              </p>

              <p class="mt-2 text-2xl font-black text-blue-300">
                Recarregar
              </p>
            </button>

            <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-yellow-400/15">
              <p class="text-sm text-yellow-100">
                Código
              </p>

              <p class="mt-2 text-2xl font-black text-yellow-300">
                {{ statusCode }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </NuxtLayout>
</template>