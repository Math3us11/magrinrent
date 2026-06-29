<script setup lang="ts">
const authStore = useAuthStore()

const anoAtual = new Date().getFullYear()

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }
})
</script>

<template>
  <footer class="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_35%)]" />

    <div class="relative max-w-6xl mx-auto px-6 py-14">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <NuxtLink
            to="/"
            class="group inline-flex items-center gap-3"
          >
            <div class="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-blue-500 font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              MR
              <div class="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div>
              <p class="text-2xl font-black tracking-tight">
                Magrin<span class="text-emerald-300">Rent</span>
              </p>

              <p class="text-xs font-medium text-slate-400">
                Aluguel de bicicletas
              </p>
            </div>
          </NuxtLink>

          <p class="mt-5 max-w-sm leading-relaxed text-slate-400">
            Sistema acadêmico desenvolvido para gerenciar bicicletas,
            controlar aluguéis e organizar operações com perfis de administrador
            e cliente.
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
              Nuxt
            </span>

            <span class="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300">
              Vue 3
            </span>

            <span class="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
              Pinia
            </span>

            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
              MySQL
            </span>
          </div>
        </div>

        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Navegação
          </h2>

          <nav class="mt-5 grid gap-3">
            <NuxtLink
              to="/"
              class="group inline-flex items-center text-sm font-semibold text-slate-400 transition-all hover:translate-x-1 hover:text-emerald-300"
            >
              <span class="mr-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Início
            </NuxtLink>

            <NuxtLink
              v-if="authStore.isAdmin"
              to="/bicicletas"
              class="group inline-flex items-center text-sm font-semibold text-slate-400 transition-all hover:translate-x-1 hover:text-emerald-300"
            >
              <span class="mr-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Bicicletas
            </NuxtLink>

            <NuxtLink
              v-if="authStore.estaLogado"
              to="/alugueis"
              class="group inline-flex items-center text-sm font-semibold text-slate-400 transition-all hover:translate-x-1 hover:text-emerald-300"
            >
              <span class="mr-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Aluguéis
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="group inline-flex items-center text-sm font-semibold text-slate-400 transition-all hover:translate-x-1 hover:text-emerald-300"
            >
              <span class="mr-2 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              Sobre
            </NuxtLink>
          </nav>
        </div>

        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.25em] text-blue-300">
            Sistema
          </h2>

          <div class="mt-5 grid gap-3">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:bg-white/10">
              <p class="text-sm font-bold text-white">
                Perfil
              </p>

              <p class="mt-1 text-sm capitalize text-slate-400">
                {{ authStore.estaLogado ? authStore.usuario?.tipo : 'Visitante' }}
              </p>
            </div>

            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:bg-white/10">
              <p class="text-sm font-bold text-white">
                Status
              </p>

              <p class="mt-1 text-sm text-emerald-300">
                Sistema operacional
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
            Acesso rápido
          </h2>

          <div class="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur">
            <p class="text-sm leading-relaxed text-slate-400">
              Continue navegando pelo sistema ou acesse sua área de gerenciamento.
            </p>

            <div class="mt-5 grid gap-3">
              <NuxtLink
                v-if="!authStore.estaLogado"
                to="/login"
                class="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
              >
                Entrar no sistema
              </NuxtLink>

              <NuxtLink
                v-if="authStore.isAdmin"
                to="/bicicletas"
                class="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
              >
                Gerenciar bicicletas
              </NuxtLink>

              <NuxtLink
                v-if="authStore.estaLogado"
                to="/alugueis"
                class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Ver aluguéis
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 border-t border-white/10 pt-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p class="text-sm text-slate-500">
            © {{ anoAtual }} MagrinRent. Projeto acadêmico de sistema web.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>