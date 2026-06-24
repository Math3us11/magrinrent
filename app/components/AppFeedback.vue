<script setup lang="ts">
const feedbackStore = useFeedbackStore()

function iconeToast(tipo: string) {
  if (tipo === 'sucesso') return '✓'
  if (tipo === 'erro') return '!'
  return 'i'
}

function classeToast(tipo: string) {
  if (tipo === 'sucesso') {
    return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
  }

  if (tipo === 'erro') {
    return 'border-red-400/20 bg-red-400/10 text-red-300'
  }

  return 'border-blue-400/20 bg-blue-400/10 text-blue-300'
}

function classeBotaoConfirmar(tipo: string) {
  if (tipo === 'perigo') {
    return 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-400'
  }

  return 'bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:bg-emerald-300'
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-24 z-[9999] grid w-[calc(100%-2rem)] max-w-sm gap-3">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-8 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-8 scale-95"
      >
        <div
          v-for="toast in feedbackStore.toasts"
          :key="toast.id"
          class="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div class="flex gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-lg font-black"
              :class="classeToast(toast.tipo)"
            >
              {{ iconeToast(toast.tipo) }}
            </div>

            <div class="min-w-0 flex-1">
              <p class="font-black text-white">
                {{ toast.titulo }}
              </p>

              <p
                v-if="toast.mensagem"
                class="mt-1 text-sm leading-relaxed text-slate-400"
              >
                {{ toast.mensagem }}
              </p>
            </div>

            <button
              type="button"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-white/10 hover:text-white"
              @click="feedbackStore.removerToast(toast.id)"
            >
              ×
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="feedbackStore.confirmacao"
        class="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/80 px-6 backdrop-blur-sm"
      >
        <Transition
          appear
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div class="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-4 text-white shadow-2xl shadow-black/40">
            <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black"
                :class="feedbackStore.confirmacao.tipo === 'perigo'
                  ? 'bg-red-400/10 text-red-300 ring-1 ring-red-400/20'
                  : 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20'"
              >
                {{ feedbackStore.confirmacao.tipo === 'perigo' ? '!' : '?' }}
              </div>

              <h2 class="mt-6 text-2xl font-black text-white">
                {{ feedbackStore.confirmacao.titulo }}
              </h2>

              <p class="mt-3 leading-relaxed text-slate-400">
                {{ feedbackStore.confirmacao.mensagem }}
              </p>

              <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                  @click="feedbackStore.responderConfirmacao(false)"
                >
                  {{ feedbackStore.confirmacao.textoCancelar }}
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-black shadow-lg transition-all hover:-translate-y-1"
                  :class="classeBotaoConfirmar(feedbackStore.confirmacao.tipo)"
                  @click="feedbackStore.responderConfirmacao(true)"
                >
                  {{ feedbackStore.confirmacao.textoConfirmar }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>