<script setup lang="ts">
const authStore = useAuthStore()

const email = ref('')
const senha = ref('')
const erro = ref('')

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }
})

function preencherAdmin() {
  email.value = 'admin@magrinrent.com'
  senha.value = 'admin123'
  erro.value = ''
}

function preencherCliente() {
  email.value = 'cliente@magrinrent.com'
  senha.value = 'cliente123'
  erro.value = ''
}

async function realizarLogin() {
  erro.value = ''

  if (!email.value || !senha.value) {
    erro.value = 'Informe o e-mail e a senha para continuar.'
    return
  }

  try {
    await authStore.login(email.value, senha.value)
    await navigateTo('/')
  } catch (error) {
    erro.value = 'E-mail ou senha inválidos. Verifique os dados e tente novamente.'
  }
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-950 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />
    <div class="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

    <section class="relative max-w-6xl mx-auto px-6 py-14 lg:py-20">
      <div class="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Acesso ao sistema
          </div>

          <h1 class="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Bem-vindo ao
            <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
              MagrinRent.
            </span>
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Entre com seu perfil para gerenciar bicicletas, registrar aluguéis
            e acompanhar as operações do sistema.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              class="group rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15"
              @click="preencherAdmin"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                A
              </div>

              <h2 class="mt-4 text-lg font-black text-white">
                Entrar como admin
              </h2>

              <p class="mt-2 text-sm leading-relaxed text-slate-400">
                Acesso completo para gerenciar bicicletas e todos os aluguéis.
              </p>

              <p class="mt-4 text-sm font-bold text-emerald-300 transition-all group-hover:translate-x-1">
                Preencher dados →
              </p>
            </button>

            <button
              type="button"
              class="group rounded-3xl border border-blue-400/20 bg-blue-400/10 p-5 text-left backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15"
              @click="preencherCliente"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400 text-xl font-black text-slate-950 shadow-lg shadow-blue-500/20">
                C
              </div>

              <h2 class="mt-4 text-lg font-black text-white">
                Entrar como cliente
              </h2>

              <p class="mt-2 text-sm leading-relaxed text-slate-400">
                Acesso para solicitar aluguéis e acompanhar suas reservas.
              </p>

              <p class="mt-4 text-sm font-bold text-blue-300 transition-all group-hover:translate-x-1">
                Preencher dados →
              </p>
            </button>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
          <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

          <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 md:p-8">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                    Login
                  </p>

                  <h2 class="mt-2 text-3xl font-black text-white">
                    Acesse sua conta
                  </h2>
                </div>

                <div class="hidden h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-blue-500 text-lg font-black text-slate-950 shadow-lg shadow-emerald-500/20 sm:flex">
                  MR
                </div>
              </div>

              <form class="mt-8 grid gap-5" @submit.prevent="realizarLogin">
                <div>
                  <label
                    for="email"
                    class="text-sm font-bold text-slate-200"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
                  >
                </div>

                <div>
                  <label
                    for="senha"
                    class="text-sm font-bold text-slate-200"
                  >
                    Senha
                  </label>

                  <input
                    id="senha"
                    v-model="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/60 focus:bg-white/15 focus:ring-4 focus:ring-emerald-400/10"
                  >
                </div>

                <div
                  v-if="erro"
                  class="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200"
                >
                  {{ erro }}
                </div>

                <button
                  type="submit"
                  class="group mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  :disabled="authStore.carregando"
                >
                  <span v-if="authStore.carregando">
                    Entrando...
                  </span>

                  <span
                    v-else
                    class="flex items-center"
                  >
                    Entrar no sistema
                    <span class="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
              </form>

              <div class="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p class="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                  Usuários de teste
                </p>

                <div class="mt-4 grid gap-3">
                  <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="text-sm font-bold text-white">
                          Administrador
                        </p>

                        <p class="mt-1 text-xs text-slate-400">
                          admin@magrinrent.com / admin123
                        </p>
                      </div>

                      <button
                        type="button"
                        class="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-300 transition-all hover:bg-emerald-400/20"
                        @click="preencherAdmin"
                      >
                        Usar
                      </button>
                    </div>
                  </div>

                  <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="text-sm font-bold text-white">
                          Cliente
                        </p>

                        <p class="mt-1 text-xs text-slate-400">
                          cliente@magrinrent.com / cliente123
                        </p>
                      </div>

                      <button
                        type="button"
                        class="rounded-xl bg-blue-400/10 px-3 py-2 text-xs font-black text-blue-300 transition-all hover:bg-blue-400/20"
                        @click="preencherCliente"
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p class="mt-6 text-center text-xs leading-relaxed text-slate-500">
                Projeto acadêmico desenvolvido com Nuxt, Vue 3, Pinia, Tailwind CSS e MySQL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>