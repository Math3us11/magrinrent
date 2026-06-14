<script setup lang="ts">
const bicicletasStore = useBicicletasStore()
const alugueisStore = useAlugueisStore()

onMounted(() => {
  bicicletasStore.carregarBicicletas()
  alugueisStore.carregarAlugueis()
})

const totalBicicletas = computed(() => bicicletasStore.bicicletas.length)

const bicicletasDisponiveis = computed(() => {
  return bicicletasStore.bicicletas.filter(
    (bicicleta) => bicicleta.status === 'Disponível'
  ).length
})

const bicicletasAlugadas = computed(() => {
  return bicicletasStore.bicicletas.filter(
    (bicicleta) => bicicleta.status === 'Alugada'
  ).length
})

const alugueisAtivos = computed(() => {
  return alugueisStore.alugueis.filter(
    (aluguel) => aluguel.status === 'Ativo'
  ).length
})

const valorTotalAlugueis = computed(() => {
  return alugueisStore.alugueis.reduce((total, aluguel) => {
    return total + aluguel.valorTotal
  }, 0)
})

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-100" />

    <div class="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <p class="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Sistema de aluguel de bicicletas
          </p>

          <h1 class="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Controle seus aluguéis de forma simples e rápida.
          </h1>

          <p class="mt-5 text-lg text-slate-600 leading-relaxed">
            A MagrinRent é a maior corporação de mobilidade sustentável de duas rodas!
            Nosso ecossistema tecnológico de altíssima performance permite cadastrar nossa rigorosa frota de 'magrelas',
            registrar aluguéis com precisão cirúrgica antes mesmo de o cliente suar a camisa, controlar o status
            de cada pneu careca e acompanhar todas as operações corporativas com uma organização tão impecável que parece até mentira.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/bicicletas"
              class="bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Ver bicicletas
            </NuxtLink>

            <NuxtLink
              to="/alugueis"
              class="bg-white text-slate-800 px-5 py-3 rounded-lg font-medium border border-slate-300 hover:border-emerald-700 hover:text-emerald-700 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Ver aluguéis
            </NuxtLink>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -top-6 -left-6 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-70" />
          <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-slate-300 rounded-full blur-3xl opacity-60" />

          <div class="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <img
              src="/img/bike-hero.jpg"
              alt="Bicicleta para aluguel"
              class="w-full h-72 md:h-96 object-cover object-center"
            >

            <div class="absolute top-5 left-5 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
              <p class="text-xs text-slate-500">
                Bicicletas disponíveis
              </p>

              <p class="text-2xl font-bold text-emerald-700">
                {{ bicicletasDisponiveis }}
              </p>
            </div>

            <div class="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
              <p class="text-xs text-slate-300">
                Aluguéis ativos
              </p>

              <p class="text-2xl font-bold text-white">
                {{ alugueisAtivos }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p class="text-sm text-slate-500">
            Total de bicicletas
          </p>

          <p class="mt-2 text-3xl font-bold text-slate-900">
            {{ totalBicicletas }}
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p class="text-sm text-slate-500">
            Disponíveis
          </p>

          <p class="mt-2 text-3xl font-bold text-emerald-700">
            {{ bicicletasDisponiveis }}
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p class="text-sm text-slate-500">
            Alugadas
          </p>

          <p class="mt-2 text-3xl font-bold text-yellow-600">
            {{ bicicletasAlugadas }}
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p class="text-sm text-slate-500">
            Valor em aluguéis
          </p>

          <p class="mt-2 text-2xl font-bold text-slate-900">
            {{ formatarMoeda(valorTotalAlugueis) }}
          </p>
        </div>
      </div>

      <div class="mt-16 grid gap-8 lg:grid-cols-3">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
            🚲
          </div>

          <h2 class="mt-5 text-xl font-bold text-slate-900">
            Cadastro de bicicletas
          </h2>

          <p class="mt-3 text-slate-600 leading-relaxed">
            Registre bicicletas com nome, categoria, valor da diária, descrição
            e status atual.
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
            📋
          </div>

          <h2 class="mt-5 text-xl font-bold text-slate-900">
            Controle de aluguéis
          </h2>

          <p class="mt-3 text-slate-600 leading-relaxed">
            Cadastre aluguéis, acompanhe clientes, datas, valores e status da
            locação.
          </p>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
            ⚙️
          </div>

          <h2 class="mt-5 text-xl font-bold text-slate-900">
            Status automático
          </h2>

          <p class="mt-3 text-slate-600 leading-relaxed">
            Ao criar um aluguel, a bicicleta fica alugada. Ao finalizar ou cancelar,
            ela volta a ficar disponível.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>