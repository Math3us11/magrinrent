<script setup lang="ts">

const authStore = useAuthStore()
const bicicletasStore = useBicicletasStore()
const alugueisStore = useAlugueisStore()


const banners = [
  {
    titulo: 'Mobilidade urbana com praticidade',
    subtitulo: 'Alugue bicicletas de forma rápida, simples e organizada.',
    imagem: '/img/banner-bike-1.jpg'
  },
  {
    titulo: 'Controle completo para administradores',
    subtitulo: 'Gerencie bicicletas, status, valores e aluguéis em poucos cliques.',
    imagem: '/img/banner-bike-2.png'
  },
  {
    titulo: 'Uma experiência simples para clientes',
    subtitulo: 'Clientes podem solicitar aluguéis e acompanhar suas reservas.',
    imagem: '/img/banner-bike-3.png'
  }
]

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }

  await bicicletasStore.carregarBicicletas()

  if (authStore.estaLogado) {
    await alugueisStore.carregarAlugueis()
  }
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
  if (!authStore.estaLogado) return 0

  return alugueisStore.alugueis.filter(
    (aluguel) => aluguel.status === 'Ativo'
  ).length
})

const valorTotalAlugueis = computed(() => {
  if (!authStore.estaLogado) return 0

  return alugueisStore.alugueis.reduce((total, aluguel) => {
    return total + Number(aluguel.valorTotal)
  }, 0)
})

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

const bannerAtual = ref(0)

let intervaloBanner: ReturnType<typeof setInterval> | null = null

const bannerSelecionado = computed(() => {
  return banners[bannerAtual.value]
})

function selecionarBanner(index: number) {
  bannerAtual.value = index
}

onMounted(async () => {
  if (!authStore.inicializado) {
    await authStore.carregarUsuario()
  }

  await bicicletasStore.carregarBicicletas()

  if (authStore.estaLogado) {
    await alugueisStore.carregarAlugueis()
  }

  intervaloBanner = setInterval(() => {
    bannerAtual.value = (bannerAtual.value + 1) % banners.length
  }, 5000)
})

onUnmounted(() => {
  if (intervaloBanner) {
    clearInterval(intervaloBanner)
  }
})

</script>

<template>
  <main class="overflow-hidden">
    <section class="relative bg-slate-950 text-white">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />

      <div class="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistema acadêmico de aluguel
            </div>

            <h1 class="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
              MagrinRent,
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                gestão moderna de bicicletas.
              </span>
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Uma plataforma simples e elegante para controlar bicicletas, registrar
              aluguéis, acompanhar status e organizar operações com perfis de
              administrador e cliente.
            </p>

            <div class="mt-9 flex flex-wrap gap-4">
              <NuxtLink
                v-if="!authStore.estaLogado"
                to="/login"
                class="group inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
              >
                Entrar no sistema
                <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </NuxtLink>

              <NuxtLink
                v-if="authStore.isAdmin"
                to="/bicicletas"
                class="group inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-400"
              >
                Gerenciar bicicletas
                <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </NuxtLink>

              <NuxtLink
                v-if="authStore.estaLogado"
                to="/alugueis"
                class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Ver aluguéis
              </NuxtLink>

              <NuxtLink
                v-if="authStore.estaLogado"
                to="/alugueis/novo"
                class="inline-flex items-center justify-center rounded-xl border border-emerald-300/30 px-6 py-3 font-bold text-emerald-200 transition-all hover:-translate-y-1 hover:bg-emerald-400/10"
              >
                Novo aluguel
              </NuxtLink>
            </div>
          </div>

          <div class="relative w-full">
            <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
            <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

            <div class="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
              <div class="relative h-[320px] md:h-[420px] lg:h-[480px] w-full overflow-hidden">
                <Transition
                  enter-active-class="transition-all duration-700 ease-out"
                  enter-from-class="opacity-0 scale-105"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition-all duration-500 ease-in absolute inset-0"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                  mode="out-in"
                >
                  <div
                    :key="bannerSelecionado.imagem"
                    class="absolute inset-0"
                  >
                    <img
                      :src="bannerSelecionado.imagem"
                      :alt="bannerSelecionado.titulo"
                      class="h-full w-full object-cover object-center"
                    >

                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                        MagrinRent
                      </p>

                      <h2 class="mt-3 max-w-md text-2xl md:text-3xl font-black text-white leading-tight">
                        {{ bannerSelecionado.titulo }}
                      </h2>

                      <p class="mt-3 max-w-md text-sm leading-relaxed text-slate-200">
                        {{ bannerSelecionado.subtitulo }}
                      </p>
                    </div>
                  </div>
                </Transition>
              </div>

              <div class="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                <button
                  v-for="(_, index) in banners"
                  :key="index"
                  type="button"
                  class="h-2.5 rounded-full transition-all"
                  :class="bannerAtual === index ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/50 hover:bg-white'"
                  @click="selecionarBanner(index)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10">
            <p class="text-sm text-slate-400">
              Bicicletas cadastradas
            </p>

            <p class="mt-2 text-3xl font-black text-white">
              {{ totalBicicletas }}
            </p>
          </div>

          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15">
            <p class="text-sm text-emerald-200">
              Disponíveis para aluguel
            </p>

            <p class="mt-2 text-3xl font-black text-emerald-300">
              {{ bicicletasDisponiveis }}
            </p>
          </div>

          <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-yellow-400/15">
            <p class="text-sm text-yellow-100">
              Bicicletas alugadas
            </p>

            <p class="mt-2 text-3xl font-black text-yellow-300">
              {{ bicicletasAlugadas }}
            </p>
          </div>

          <div class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15">
            <p class="text-sm text-blue-100">
              Aluguéis ativos
            </p>

            <p class="mt-2 text-3xl font-black text-blue-300">
              {{ alugueisAtivos }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative bg-slate-50 px-6 py-16">
      <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 to-transparent opacity-10" />

      <div class="relative max-w-6xl mx-auto">
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🚲
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-500">
              Total de bicicletas
            </p>

            <p class="mt-2 text-4xl font-black text-slate-900">
              {{ totalBicicletas }}
            </p>
          </div>

          <div class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              ✅
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-500">
              Bicicletas disponíveis
            </p>

            <p class="mt-2 text-4xl font-black text-blue-700">
              {{ bicicletasDisponiveis }}
            </p>
          </div>

          <div class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
              🔒
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-500">
              Bicicletas alugadas
            </p>

            <p class="mt-2 text-4xl font-black text-yellow-600">
              {{ bicicletasAlugadas }}
            </p>
          </div>

          <div class="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              💰
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-500">
              Valor em aluguéis
            </p>

            <p class="mt-2 text-2xl font-black text-slate-900">
              {{ formatarMoeda(valorTotalAlugueis) }}
            </p>
          </div>
        </div>

        <div class="mt-16 grid gap-8 lg:grid-cols-3">
          <article class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-emerald-100" />

            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow-lg shadow-emerald-600/25">
                01
              </div>

              <h2 class="mt-6 text-2xl font-black text-slate-900">
                Cadastre bicicletas
              </h2>

              <p class="mt-3 leading-relaxed text-slate-600">
                Controle nome, categoria, valor da diária, descrição e status de
                cada bicicleta cadastrada.
              </p>
            </div>
          </article>

          <article class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-blue-100" />

            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/25">
                02
              </div>

              <h2 class="mt-6 text-2xl font-black text-slate-900">
                Registre aluguéis
              </h2>

              <p class="mt-3 leading-relaxed text-slate-600">
                Associe clientes a bicicletas disponíveis, definindo retirada,
                devolução, valor total e observações.
              </p>
            </div>
          </article>

          <article class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div class="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-yellow-100" />

            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-2xl text-white shadow-lg shadow-yellow-500/25">
                03
              </div>

              <h2 class="mt-6 text-2xl font-black text-slate-900">
                Atualize status
              </h2>

              <p class="mt-3 leading-relaxed text-slate-600">
                Ao registrar um aluguel, a bicicleta fica alugada. Ao cancelar ou
                finalizar, ela volta a ficar disponível.
              </p>
            </div>
          </article>
        </div>

        <div class="mt-16 overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
          <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div class="p-8 md:p-10 lg:p-12">
              <p class="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                Projeto acadêmico
              </p>

              <h2 class="mt-4 text-3xl md:text-4xl font-black text-white">
                Interface moderna, dados reais e controle por perfil.
              </h2>

              <p class="mt-5 leading-relaxed text-slate-300">
                O MagrinRent utiliza Nuxt, Vue 3, Pinia, Tailwind CSS, MySQL e
                autenticação simples com perfis de administrador e cliente.
              </p>

              <div class="mt-8 flex flex-wrap gap-3">
                <span class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Nuxt
                </span>

                <span class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Vue 3
                </span>

                <span class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Pinia
                </span>

                <span class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  MySQL
                </span>
              </div>
            </div>

            <div class="relative min-h-80">
              <img
                src="/img/banner-bike-1.jpg"
                alt="Bicicleta do sistema MagrinRent"
                class="absolute inset-0 h-full w-full object-cover"
              >

              <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>