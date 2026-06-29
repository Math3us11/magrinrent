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
            e acompanhar as operações do sistema de forma simples e organizada.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                A
              </div>

              <h2 class="mt-4 text-lg font-black text-white">
                Perfil administrador
              </h2>

              <p class="mt-2 text-sm leading-relaxed text-slate-400">
                Gerencia bicicletas, acompanha aluguéis e controla os registros do sistema.
              </p>
            </div>

            <div class="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400 text-xl font-black text-slate-950 shadow-lg shadow-blue-500/20">
                C
              </div>

              <h2 class="mt-4 text-lg font-black text-white">
                Perfil cliente
              </h2>

              <p class="mt-2 text-sm leading-relaxed text-slate-400">
                Solicita novos aluguéis e acompanha suas reservas cadastradas.
              </p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
          <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

          <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 md:p-8">
              <div>
                <p class="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Login
                </p>

                <h2 class="mt-2 text-3xl font-black text-white">
                  Acesse sua conta
                </h2>

                <p class="mt-3 text-sm leading-relaxed text-slate-400">
                  Informe seus dados de acesso para entrar no sistema.
                </p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>