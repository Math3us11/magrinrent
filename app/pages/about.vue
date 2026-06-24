<template>
  <main class="min-h-screen bg-slate-50">
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />

      <div class="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Sobre o projeto
            </div>

            <h1 class="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Conheça o
              <span class="block bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                MagrinRent.
              </span>
            </h1>

            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              O MagrinRent é um sistema web acadêmico desenvolvido para gerenciar
              o aluguel de bicicletas, permitindo o controle de cadastros,
              reservas, status e perfis de acesso.
            </p>

            <div class="mt-9 flex flex-wrap gap-4">
              <NuxtLink
                to="/"
                class="group inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:bg-emerald-300"
              >
                Voltar ao início
                <span class="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </NuxtLink>

              <NuxtLink
                to="/login"
                class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Acessar sistema
              </NuxtLink>
            </div>
          </div>

          <div class="relative">
            <div class="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl" />
            <div class="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div class="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-8">
                <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-blue-500 text-2xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                  MR
                </div>

                <h2 class="mt-8 text-3xl font-black text-white">
                  Sistema de aluguel de bicicletas
                </h2>

                <p class="mt-4 leading-relaxed text-slate-400">
                  A proposta do sistema é simular uma solução real de gestão,
                  aplicando conceitos de desenvolvimento web, banco de dados,
                  autenticação, rotas protegidas e operações CRUD.
                </p>

                <div class="mt-8 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <p class="text-sm font-bold text-emerald-300">
                      Perfil admin
                    </p>

                    <p class="mt-2 text-sm leading-relaxed text-slate-400">
                      Gerencia bicicletas e acompanha todos os aluguéis.
                    </p>
                  </div>

                  <div class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
                    <p class="text-sm font-bold text-blue-300">
                      Perfil cliente
                    </p>

                    <p class="mt-2 text-sm leading-relaxed text-slate-400">
                      Solicita aluguéis e acompanha suas reservas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10">
            <p class="text-sm text-slate-400">
              Tipo
            </p>

            <p class="mt-2 text-2xl font-black text-white">
              Sistema Web
            </p>
          </div>

          <div class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-emerald-400/15">
            <p class="text-sm text-emerald-200">
              Arquitetura
            </p>

            <p class="mt-2 text-2xl font-black text-emerald-300">
              Nuxt Fullstack
            </p>
          </div>

          <div class="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-blue-400/15">
            <p class="text-sm text-blue-100">
              Banco
            </p>

            <p class="mt-2 text-2xl font-black text-blue-300">
              MySQL
            </p>
          </div>

          <div class="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-yellow-400/15">
            <p class="text-sm text-yellow-100">
              Finalidade
            </p>

            <p class="mt-2 text-2xl font-black text-yellow-300">
              Acadêmica
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-14">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
            Objetivo
          </p>

          <h2 class="mt-3 text-3xl md:text-4xl font-black text-slate-900">
            Uma solução simples para uma operação real de aluguel.
          </h2>

          <p class="mt-5 leading-relaxed text-slate-600">
            O objetivo do MagrinRent é permitir que uma empresa fictícia de
            aluguel de bicicletas consiga controlar seus principais processos:
            cadastro de bicicletas, registro de aluguéis, acompanhamento de
            disponibilidade e separação de permissões por tipo de usuário.
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🚲
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Controle de bicicletas
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              O administrador pode cadastrar bicicletas, editar informações,
              definir valor da diária e acompanhar o status de cada item.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📅
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Gestão de aluguéis
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              O sistema registra cliente, bicicleta escolhida, período,
              observações, valor calculado e status do aluguel.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
              🔐
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Perfis de acesso
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              O sistema diferencia usuários administradores e clientes,
              limitando ações conforme o tipo de perfil logado.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
              🔄
            </div>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Atualização automática
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              Ao criar, finalizar ou cancelar um aluguel, o status da bicicleta
              é atualizado para manter os dados consistentes.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-6 py-14">
        <div class="text-center">
          <p class="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
            Tecnologias
          </p>

          <h2 class="mt-3 text-3xl md:text-4xl font-black text-slate-900">
            Stack utilizada no desenvolvimento
          </h2>

          <p class="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
            O projeto foi construído utilizando tecnologias modernas para
            desenvolvimento web, controle de estado, estilização e persistência
            dos dados.
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
            <p class="text-4xl">
              ⚡
            </p>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Nuxt
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              Estrutura principal do sistema, rotas, páginas e APIs no mesmo projeto.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
            <p class="text-4xl">
              🧩
            </p>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Vue 3
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              Construção dos componentes, formulários, telas e interações do usuário.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
            <p class="text-4xl">
              🍍
            </p>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              Pinia
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              Gerenciamento de estado para autenticação, bicicletas e aluguéis.
            </p>
          </article>

          <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl">
            <p class="text-4xl">
              🗄️
            </p>

            <h3 class="mt-5 text-xl font-black text-slate-900">
              MySQL
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-slate-600">
              Banco de dados relacional usado para armazenar usuários, bicicletas e aluguéis.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-14">
      <div class="overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
        <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div class="p-8 md:p-10 lg:p-12 text-white">
            <p class="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
              Funcionamento
            </p>

            <h2 class="mt-4 text-3xl md:text-4xl font-black">
              Fluxo principal do sistema
            </h2>

            <p class="mt-5 leading-relaxed text-slate-300">
              O sistema foi pensado para representar um fluxo comum de aluguel:
              primeiro o administrador cadastra as bicicletas, depois o cliente
              solicita um aluguel e, por fim, o status é controlado até a
              finalização ou cancelamento.
            </p>
          </div>

          <div class="relative p-8 md:p-10 lg:p-12">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_35%)]" />

            <div class="relative grid gap-4">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p class="text-sm font-black text-emerald-300">
                  01. Cadastro
                </p>

                <p class="mt-2 text-sm leading-relaxed text-slate-300">
                  O administrador cadastra bicicletas informando nome, categoria,
                  valor da diária, status e descrição.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p class="text-sm font-black text-blue-300">
                  02. Solicitação
                </p>

                <p class="mt-2 text-sm leading-relaxed text-slate-300">
                  O cliente ou administrador registra um aluguel escolhendo uma
                  bicicleta disponível e informando o período desejado.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p class="text-sm font-black text-yellow-300">
                  03. Controle
                </p>

                <p class="mt-2 text-sm leading-relaxed text-slate-300">
                  A bicicleta passa para o status de alugada e retorna para
                  disponível quando o aluguel é finalizado ou cancelado.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p class="text-sm font-black text-red-300">
                  04. Permissões
                </p>

                <p class="mt-2 text-sm leading-relaxed text-slate-300">
                  Administradores possuem controle total, enquanto clientes
                  acessam apenas suas próprias informações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>