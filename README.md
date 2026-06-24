# MagrinRent 🚲

Sistema web acadêmico para gerenciamento de aluguel de bicicletas, desenvolvido com **Nuxt**, **Vue 3**, **Pinia**, **Tailwind CSS** e **MySQL**.

O projeto simula uma plataforma de aluguel de bicicletas com controle de usuários, perfis de acesso, cadastro de bicicletas, registro de aluguéis e atualização automática de status.

---

## 📌 Sobre o projeto

O **MagrinRent** foi desenvolvido como um projeto acadêmico com o objetivo de aplicar, na prática, conceitos de desenvolvimento web moderno, banco de dados relacional, autenticação simples, controle de permissões e operações CRUD.

A aplicação possui dois tipos principais de usuários:

* **Administrador:** pode gerenciar bicicletas e visualizar todos os aluguéis.
* **Cliente:** pode criar aluguéis e visualizar apenas seus próprios registros.

---

## 🎯 Objetivo

Desenvolver um sistema web funcional para controle de aluguel de bicicletas, permitindo cadastro de bicicletas, registro de aluguéis, atualização automática de status, controle de usuários e separação de permissões por perfil.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia   | Função no projeto                      |
| ------------ | -------------------------------------- |
| Nuxt         | Framework principal da aplicação       |
| Vue 3        | Construção da interface                |
| Pinia        | Gerenciamento de estado                |
| Tailwind CSS | Estilização e responsividade           |
| MySQL        | Banco de dados relacional              |
| mysql2       | Conexão entre Nuxt e MySQL             |
| bcryptjs     | Criptografia de senhas                 |
| DBeaver      | Gerenciamento visual do banco de dados |

---

## ✨ Funcionalidades

### Autenticação

* Login com e-mail e senha;
* Sessão via cookie;
* Identificação do usuário logado;
* Separação entre perfil administrador e cliente;
* Logout.

### Bicicletas

* Listagem de bicicletas;
* Cadastro de nova bicicleta;
* Edição de bicicleta existente;
* Exclusão de bicicleta;
* Controle de status: **Disponível**, **Alugada** e **Manutenção**.

### Aluguéis

* Cadastro de novo aluguel;
* Edição de aluguel;
* Finalização de aluguel;
* Cancelamento de aluguel;
* Exclusão de aluguel pelo administrador;
* Cálculo automático do valor total;
* Atualização automática do status da bicicleta.

### Interface

* Layout responsivo;
* Header com menu mobile;
* Footer personalizado;
* Página inicial com banners;
* Login estilizado;
* Página sobre;
* Notificações e modais personalizados.

---

## 🔐 Perfis de acesso

### Administrador

O administrador pode acessar a tela de bicicletas, cadastrar, editar e excluir bicicletas, visualizar todos os aluguéis, editar, finalizar, cancelar e excluir aluguéis.

### Cliente

O cliente pode criar novos aluguéis, visualizar apenas seus próprios aluguéis e cancelar aluguéis ativos.

O cliente não pode acessar a área administrativa de bicicletas.

---

## ⚙️ Requisitos

Antes de iniciar, é necessário ter instalado:

* Node.js;
* npm;
* MySQL;
* DBeaver ou outro gerenciador MySQL;
* Git.

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/Math3us11/magrinrent.git
```

Entre na pasta do projeto:

```bash
cd magrinrent
```

Instale as dependências:

```bash
npm install
```

---

## 🔧 Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## 🗄️ Banco de dados

O projeto possui um script SQL pronto:

```text
database/magrinrent.sql
```

Ele cria:

* Banco `magrinrent`;
* Tabela `usuarios`;
* Tabela `bicicletas`;
* Tabela `alugueis`;
* Usuário administrador;
* Usuário cliente;
* Bicicletas de exemplo;
* Aluguéis de exemplo.

---

## 👤 Usuários de teste

### Administrador

```text
E-mail: admin@magrinrent.com
Senha: admin123
```

### Cliente

```text
E-mail: cliente@magrinrent.com
Senha: cliente123
```

---

## ▶️ Rodando o projeto

Com o banco configurado e as dependências instaladas, execute:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

---

## 🔄 Fluxo principal

1. O usuário acessa o sistema;
2. Realiza login como administrador ou cliente;
3. O administrador cadastra bicicletas;
4. O cliente cria um aluguel selecionando uma bicicleta disponível;
5. Ao criar o aluguel, a bicicleta passa para o status **Alugada**;
6. Ao finalizar ou cancelar o aluguel, a bicicleta volta para **Disponível**;
7. O administrador visualiza e gerencia todos os registros;
8. O cliente visualiza apenas seus próprios aluguéis.

---

## 🧠 Regras de negócio

* Uma bicicleta só pode ser alugada se estiver com status **Disponível**.
* Ao cadastrar um aluguel ativo, a bicicleta é marcada como **Alugada**.
* Ao finalizar ou cancelar um aluguel ativo, a bicicleta volta para **Disponível**.
* Clientes não podem acessar a tela administrativa de bicicletas.
* Clientes visualizam apenas os próprios aluguéis.
* Administradores visualizam todos os aluguéis.
* O valor total é calculado com base no valor da diária e quantidade de dias.

---

## 📱 Responsividade

O sistema se adapta para desktop, notebook, tablet e celular. No mobile, o header possui menu expansível no estilo hambúrguer.

---

## 🧪 Testes manuais recomendados

### Como administrador

* Fazer login como administrador;
* Cadastrar bicicleta;
* Editar bicicleta;
* Excluir bicicleta;
* Criar aluguel;
* Editar aluguel;
* Finalizar aluguel;
* Cancelar aluguel;
* Verificar mudança de status da bicicleta.

### Como cliente

* Fazer login como cliente;
* Criar aluguel;
* Visualizar apenas seus próprios aluguéis;
* Cancelar aluguel ativo;
* Tentar acessar `/bicicletas` e verificar o bloqueio.

---

## 📌 Observações para apresentação

Para apresentar o projeto na faculdade, recomenda-se:

* Levar o notebook com o MySQL configurado;
* Deixar o banco já importado;
* Rodar o projeto localmente com `npm run dev`;
* Acessar pelo navegador em `http://localhost:3000`;
* Ter o arquivo `database/magrinrent.sql` como backup;
* Testar login de administrador e cliente antes da apresentação.

---

## 🚀 Melhorias futuras

* Cadastro público de clientes;
* Recuperação de senha;
* Filtros por status;
* Busca por nome;
* Dashboard com gráficos;
* Relatórios financeiros;
* Upload de imagens das bicicletas;
* Deploy online da aplicação;
* Banco de dados em nuvem.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Matheus Endlich Vieira**.

---

## 📚 Finalidade

Este projeto possui finalidade acadêmica e foi desenvolvido para praticar conceitos de desenvolvimento web fullstack, banco de dados, autenticação, autorização, responsividade e organização de sistemas CRUD.
