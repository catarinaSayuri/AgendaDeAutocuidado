# Agenda de autocuidado

Este projeto é uma aplicação web para gerenciamento de atividades de autocuidado, desenvolvida utilizando Node.js com Express.js como framework e PostgreSQL como banco de dados relacional, seguindo o padrão MVC (Model-View-Controller).

## Descrição do Projeto

A Agenda de Autocuidado foi criada com o objetivo de auxiliar usuários a organizarem e acompanharem suas práticas diárias de bem-estar. A aplicação permite o cadastro de atividades personalizadas (como meditação, caminhada, leitura, etc.) e o agendamento dessas atividades ao longo do tempo, promovendo hábitos saudáveis por meio da organização pessoal.

## Requisitos

- Node.js (versão 14.x ou superior)
- PostgreSQL (versão 12.x ou superior)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/catarinaSayuri/AgendaDeAutocuidado.git
   cd AgendaDeAutocuidado
```

2. **Instalar as dependências:**

```bash
npm install
```

3. **Configurar o arquivo `.env`:**

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias, como as credenciais do banco de dados PostgreSQL.

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**

Crie um banco de dados PostgreSQL com o nome definido no seu arquivo .env.

2. **Executar o script SQL de inicialização:**

```bash
npm run init-db
```

Esse comando executa um script que cria todas as tabelas necessárias no banco de dados, incluindo as entidades usuarios, atividades e agendamentos.

Funcionalidades
---------------

Cadastro de Atividades: Criar atividades personalizadas com nome, descrição e cor.

Agendamento Diário: Definir horários e datas para realizar cada atividade.

Status de Atividades: Marcar atividades como pendentes, concluídas ou canceladas.

Visualização de Agenda: Exibir os compromissos diários de autocuidado em formato organizado.

Gestão de Usuário: Cadastro de usuários para personalização da agenda.   

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após a cada alteração no código.
* `npm run test`: Executa os testes automatizados.

Estrutura de Diretórios
-----------------------

config/: Arquivo de configuração da conexão com o banco de dados.

controllers/: Controladores responsáveis pela lógica de negócios.

models/: Modelos que definem as entidades e interagem com o banco de dados.

routes/: Definições de rotas HTTP.

services/: Camada de serviço que centraliza regras de negócio reutilizáveis.

scripts/: Script para inicialização do banco.

views/: Templates EJS para renderização da interface.

documentos/: Documentos como o WAD e diagramas do projeto.

tests/: Testes automatizados (opcional).
Modelo de Banco de Dados
-----------------------

O banco de dados utiliza o PostgreSQL e possui as seguintes entidades principais:

* **Usuarios**: Armazena informações dos usuários.
* **Atividades**: Representa as ações de autocuidado personalizadas pelo usuário.
* **Agendamentos**: Armazena quando cada atividade será realizada e seu status.
