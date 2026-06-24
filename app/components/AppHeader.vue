<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

const menuAberto = ref(false)

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }
})

watch(
  () => route.fullPath,
  () => {
    menuAberto.value = false
  }
)

function alternarMenu() {
  menuAberto.value = !menuAberto.value
}

async function sair() {
  menuAberto.value = false
  await authStore.logout()
}

function linkAtivo(caminho: string) {
  if (caminho === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(caminho)
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex h-20 items-center justify-between">
        <NuxtLink
          to="/"
          class="group flex items-center gap-3"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all group-hover:-translate-y-0.5 group-hover:rotate-3">
            MR
          </div>

          <div>
            <p class="text-xl font-black tracking-tight">
              Magrin<span class="text-emerald-300">Rent</span>
            </p>

            <p class="hidden text-xs font-medium text-slate-400 sm:block">
              Sistema de aluguel de bicicletas
            </p>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-2 lg:flex">
          <NuxtLink
            to="/"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-emerald-300"
            :class="linkAtivo('/') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-300'"
          >
            Início
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isAdmin"
            to="/bicicletas"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-emerald-300"
            :class="linkAtivo('/bicicletas') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-300'"
          >
            Bicicletas
          </NuxtLink>

          <NuxtLink
            v-if="authStore.estaLogado"
            to="/alugueis"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-emerald-300"
            :class="linkAtivo('/alugueis') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-300'"
          >
            Aluguéis
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-emerald-300"
            :class="linkAtivo('/about') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-300'"
          >
            Sobre
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <NuxtLink
            v-if="!authStore.estaLogado"
            to="/login"
            class="group inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Entrar
            <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>

          <div
            v-else
            class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-400/20 text-sm font-black text-emerald-300 ring-1 ring-white/10">
              {{ authStore.usuario?.nome?.charAt(0) || 'U' }}
            </div>

            <div class="max-w-40">
              <p class="truncate text-sm font-bold text-white">
                {{ authStore.usuario?.nome }}
              </p>

              <p class="text-xs font-medium capitalize text-slate-400">
                {{ authStore.usuario?.tipo }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-xl px-3 py-2 text-sm font-bold text-red-300 transition-all hover:bg-red-400/10 hover:text-red-200"
              @click="sair"
            >
              Sair
            </button>
          </div>
        </div>

        <button
          type="button"
          class="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 lg:hidden"
          aria-label="Abrir menu"
          @click="alternarMenu"
        >
          <div class="relative h-5 w-6">
            <span
              class="absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all"
              :class="menuAberto ? 'top-2 rotate-45' : 'top-0'"
            />
            <span
              class="absolute left-0 top-2 h-0.5 w-6 rounded-full bg-white transition-all"
              :class="menuAberto ? 'opacity-0' : 'opacity-100'"
            />
            <span
              class="absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all"
              :class="menuAberto ? 'top-2 -rotate-45' : 'top-4'"
            />
          </div>
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-4 scale-95"
      >
        <div
          v-if="menuAberto"
          class="pb-5 lg:hidden"
        >
          <div class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <nav class="grid gap-2">
              <NuxtLink
                to="/"
                class="rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:bg-white/10 hover:text-emerald-300"
                :class="linkAtivo('/') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-200'"
              >
                Início
              </NuxtLink>

              <NuxtLink
                v-if="authStore.isAdmin"
                to="/bicicletas"
                class="rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:bg-white/10 hover:text-emerald-300"
                :class="linkAtivo('/bicicletas') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-200'"
              >
                Bicicletas
              </NuxtLink>

              <NuxtLink
                v-if="authStore.estaLogado"
                to="/alugueis"
                class="rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:bg-white/10 hover:text-emerald-300"
                :class="linkAtivo('/alugueis') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-200'"
              >
                Aluguéis
              </NuxtLink>

              <NuxtLink
                to="/about"
                class="rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:bg-white/10 hover:text-emerald-300"
                :class="linkAtivo('/about') ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20' : 'text-slate-200'"
              >
                Sobre
              </NuxtLink>
            </nav>

            <div class="mt-3 border-t border-white/10 pt-3">
              <NuxtLink
                v-if="!authStore.estaLogado"
                to="/login"
                class="flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-300"
              >
                Entrar no sistema
              </NuxtLink>

              <div
                v-else
                class="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-blue-400/20 text-base font-black text-emerald-300 ring-1 ring-white/10">
                    {{ authStore.usuario?.nome?.charAt(0) || 'U' }}
                  </div>

                  <div class="min-w-0">
                    <p class="truncate font-bold text-white">
                      {{ authStore.usuario?.nome }}
                    </p>

                    <p class="text-sm capitalize text-slate-400">
                      {{ authStore.usuario?.tipo }}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  class="mt-4 w-full rounded-2xl bg-red-400/10 px-4 py-3 text-sm font-black text-red-300 transition-all hover:bg-red-400/20"
                  @click="sair"
                >
                  Sair da conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>