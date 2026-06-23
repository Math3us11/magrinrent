<script setup lang="ts">
const bicicletasStore = useBicicletasStore()

onMounted(() => {
  bicicletasStore.carregarBicicletas()
})

async function excluirBicicleta(id: number) {
  const confirmar = confirm('Tem certeza que deseja excluir esta bicicleta?')

  if (!confirmar) return

  try {
    await bicicletasStore.excluirBicicleta(id)
  } catch (error) {
    alert('Erro ao excluir bicicleta.')
  }
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function statusClasse(status: string) {
  if (status === 'Disponível') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (status === 'Alugada') {
    return 'bg-yellow-100 text-yellow-700'
  }

  return 'bg-red-100 text-red-700'
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">
          Bicicletas
        </h1>

        <p class="mt-2 text-slate-600">
          Gerencie as bicicletas cadastradas no sistema.
        </p>
      </div>

      <NuxtLink
        to="/bicicletas/nova"
        class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors text-center"
      >
        Nova bicicleta
      </NuxtLink>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="bicicleta in bicicletasStore.bicicletas"
        :key="bicicleta.id"
        class="bg-white border border-slate-200 rounded-xl shadow-sm p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900">
              {{ bicicleta.nome }}
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              {{ bicicleta.categoria }}
            </p>
          </div>

          <span
            class="text-xs font-semibold px-3 py-1 rounded-full"
            :class="statusClasse(bicicleta.status)"
          >
            {{ bicicleta.status }}
          </span>
        </div>

        <p class="mt-4 text-slate-600 text-sm leading-relaxed">
          {{ bicicleta.descricao }}
        </p>

        <p class="mt-4 text-lg font-bold text-emerald-700">
          {{ formatarMoeda(bicicleta.valorDiaria) }}
          <span class="text-sm font-normal text-slate-500">/ diária</span>
        </p>

        <div class="mt-5 flex items-center gap-3">
          <NuxtLink
            :to="`/bicicletas/${bicicleta.id}/editar`"
            class="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Editar
          </NuxtLink>

          <button
            class="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            @click="excluirBicicleta(bicicleta.id)"
          >
            Excluir
          </button>
        </div>
      </article>
    </div>

    <div
      v-if="bicicletasStore.bicicletas.length === 0"
      class="mt-8 bg-white border border-slate-200 rounded-xl p-6 text-slate-600"
    >
      Nenhuma bicicleta cadastrada ainda.
    </div>
  </section>
</template>