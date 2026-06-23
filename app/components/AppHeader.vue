<script setup lang="ts">
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }
})

async function sair() {
  await authStore.logout()
}
</script>

<template>
  <header class="bg-white border-b border-slate-200 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-emerald-700">
        MagrinRent
      </NuxtLink>

      <nav class="flex items-center gap-6 text-sm font-medium">
        <NuxtLink
          to="/"
          class="text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Início
        </NuxtLink>

        <NuxtLink
          v-if="authStore.isAdmin"
          to="/bicicletas"
          class="text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Bicicletas
        </NuxtLink>

        <NuxtLink
          v-if="authStore.estaLogado"
          to="/alugueis"
          class="text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Aluguéis
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Sobre
        </NuxtLink>

        <NuxtLink
          v-if="!authStore.estaLogado"
          to="/login"
          class="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
        >
          Entrar
        </NuxtLink>

        <div
          v-else
          class="flex items-center gap-3"
        >
          <span class="text-slate-600">
            {{ authStore.usuario?.nome }}
          </span>

          <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
            {{ authStore.usuario?.tipo }}
          </span>

          <button
            class="text-red-600 hover:text-red-700 transition-colors"
            @click="sair"
          >
            Sair
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>