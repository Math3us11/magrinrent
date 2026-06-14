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
          to="/bicicletas"
          class="text-slate-700 hover:text-emerald-700 transition-colors"
        >
          Bicicletas
        </NuxtLink>

        <NuxtLink
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
      </nav>
    </div>
  </header>
</template>