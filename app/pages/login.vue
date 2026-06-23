<script setup lang="ts">
const authStore = useAuthStore()

const form = reactive({
  email: '',
  senha: ''
})

const erro = ref('')

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }

  if (authStore.estaLogado) {
    await navigateTo('/')
  }
})

async function fazerLogin() {
  erro.value = ''

  if (!form.email || !form.senha) {
    erro.value = 'Preencha o e-mail e a senha.'
    return
  }

  try {
    await authStore.login(form.email, form.senha)

    if (authStore.isAdmin) {
      await navigateTo('/bicicletas')
    } else {
      await navigateTo('/alugueis')
    }
  } catch {
    erro.value = 'E-mail ou senha inválidos.'
  }
}
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-slate-900">
          Entrar no MagrinRent
        </h1>

        <p class="mt-2 text-slate-600">
          Acesse sua conta para gerenciar os aluguéis.
        </p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="fazerLogin">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            E-mail
          </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="admin@magrinrent.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Senha
          </label>

          <input
            v-model="form.senha"
            type="password"
            class="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="Digite sua senha"
          >
        </div>

        <div
          v-if="erro"
          class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
        >
          {{ erro }}
        </div>

        <button
          type="submit"
          class="w-full bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors disabled:opacity-60"
          :disabled="authStore.carregando"
        >
          {{ authStore.carregando ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <div class="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
        <p class="font-semibold text-slate-800">
          Usuários de teste:
        </p>

        <p class="mt-2">
          Admin: admin@magrinrent.com / admin123
        </p>

        <p>
          Cliente: cliente@magrinrent.com / cliente123
        </p>
      </div>
    </div>
  </section>
</template>