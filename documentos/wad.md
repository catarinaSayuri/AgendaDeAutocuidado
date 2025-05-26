# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Agenda de Autocuidado

#### Catarina Sayuri

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

## <a name="c1"></a>1. Introdução

Este projeto é uma aplicação web para ajudar os usuários a organizarem e gerenciarem suas rotinas de autocuidado. A plataforma permite agendar atividades, registrar sentimentos diários e acompanhar o progresso das metas relacionadas ao bem-estar físico e mental. O sistema é desenvolvido em Node.js com Express.js e PostgreSQL como banco de dados relacional, utilizando o padrão MVC (Model-View-Controller).
---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

Joana, 28 anos, trabalha em home office e tem dificuldade em organizar suas atividades diárias de autocuidado devido ao trabalho excessivo.

Carlos, 35 anos, busca melhorar sua saúde mental e emocional, e precisa de um sistema simples para registrar suas atividades e progresso.

### 2.2. User Stories (Semana 01 - opcional)

US01: Como usuário, quero cadastrar uma nova atividade de autocuidado para poder acompanhar minhas práticas.

US02: Como usuário, quero visualizar minha agenda de autocuidado para ver as atividades programadas para o dia.

US03: Como usuário, quero registrar meu bem-estar diário para monitorar meu progresso.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

A arquitetura do sistema Agenda de Autocuidado segue o padrão MVC (Model-View-Controller), garantindo uma separação clara entre a lógica de negócios, a interface de usuário e o controle de requisições. Esse padrão facilita a manutenção e escalabilidade da aplicação, além de permitir um desenvolvimento organizado e estruturado.

### 3.1. Modelagem do banco de dados

A modelagem do banco de dados é o processo de criar uma representação estruturada das informações que serão armazenadas no sistema. Ela envolve a identificação das entidades principais, seus atributos e os relacionamentos entre elas, resultando em um esquema que servirá como plano para a implementação física do banco de dados.

O modelo relacional do banco de dados da Agenda de Autocuidado foi projetado para garantir um gerenciamento eficiente das atividades de autocuidado e suas relações com os usuários e os registros diários de bem-estar. A estrutura do banco foi implementada utilizando PostgreSQL, um banco de dados relacional robusto, e segue os princípios de normalização para evitar redundâncias, melhorar a eficiência das consultas e garantir a integridade dos dados.

O diagrama abaixo ilustra a estrutura completa do banco de dados com todas as tabelas e seus relacionamentos:

#### Diagrama do banco no draw.io
<div align="center">
  <sup>Figura 1 - Diagrama do Banco de Dados no Draw.io</sup>
  <img src="/documentos/assets/modelo-banco.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>


##### Resumo da Estrutura

- **Users**: Armazena informações sobre os usuários da aplicação, como nome, e-mail, senha e a data de criação da conta. Cada usuário pode criar várias atividades e agendar diferentes atividades ao longo do tempo.

- **Atividade**: Representa uma atividade de autocuidado que pode ser realizada pelo usuário (ex: meditação, caminhada, etc.). Cada atividade tem um nome, descrição, cor de categoria (para exibição no calendário) e é associada a um único usuário.

- **Agendamento**: Representa os agendamentos diários dos usuários, especificando qual atividade será realizada, a data e os horários de início e fim. Além disso, cada agendamento possui um status (ex: pendente, concluída, cancelada).


##### Relacionamentos

Usuário 1:N Atividades: Um usuário pode criar várias atividades.

Usuário 1:N Agendamentos: Um usuário pode agendar várias atividades ao longo do tempo.

Atividade 1:N Agendamentos: Uma atividade pode ser agendada várias vezes, por um ou mais usuários.

### 3.1.1 BD e Models (Semana 5)
## 3.1.1.1. Model `Usuario`

**Responsabilidade:** Gerenciar dados da tabela `usuario`.

### Métodos

- `getAll()` – Retorna todos os usuários.  
- `getById(id_usuario)` – Busca um usuário específico pelo ID.  
- `create(data)` – Cria novo usuário.  
- `update(id_usuario, data)` – Atualiza nome e email de um usuário.  
- `delete(id_usuario)` – Remove usuário.

### Métodos auxiliares

- `getByEmail(email)` – Busca usuário pelo e-mail (útil para autenticação).  
- `exists(id_usuario)` – Verifica se o usuário existe.

---

## 3.1.1.2. Model `Atividade`

**Responsabilidade:** Gerenciar dados da tabela `atividade` e sua relação com `usuario`.

### Métodos

- `getAll(id_usuario = null)` – Lista todas as atividades, com opção de filtrar por usuário.  
- `getById(id_atividade)` – Busca atividade específica.  
- `create(data)` – Cria nova atividade.  
- `update(id_atividade, data)` – Atualiza dados da atividade.  
- `delete(id_atividade)` – Remove atividade.

### Métodos auxiliares

- `exists(id_atividade)` – Verifica se a atividade existe.  
- `getByUsuario(id_usuario)` – Retorna todas as atividades de um usuário.

---

## 3.1.1.3. Model `Agendamento`

**Responsabilidade:** Gerenciar dados da tabela `agendamento` e os relacionamentos com `usuario` e `atividade`.

### Métodos

- `getAll()` – Retorna todos os agendamentos.  
- `getByUsuario(id_usuario)` – Retorna todos os agendamentos de um usuário.  
- `getById(id_agendamento)` – Busca um agendamento específico.  
- `create(data)` – Cria novo agendamento.  
- `update(id_agendamento, data)` – Atualiza dados de um agendamento.  
- `delete(id_agendamento)` – Remove um agendamento.

### Métodos auxiliares

- `exists(id_agendamento)` – Verifica se o agendamento existe.  
- `getByAtividade(id_atividade)` – Retorna todos os agendamentos vinculados a uma atividade específica.


### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

#### 3.6.1. Rotas de Usuários  
- `POST /api/usuarios` – Cria um novo usuário no sistema  
- `GET /api/usuarios/:id` – Busca e retorna o perfil de um usuário específico pelo ID  
- `PUT /api/usuarios/:id` – Atualiza os dados de um usuário específico  
- `DELETE /api/usuarios/:id` – Remove um usuário do sistema  

#### 3.6.2. Rotas de Atividades  
- `GET /api/atividades` – Lista todas as atividades cadastradas no sistema  
- `POST /api/atividades` – Cria uma nova atividade de autocuidado  
- `GET /api/atividades/:id` – Retorna os detalhes de uma atividade específica  
- `PUT /api/atividades/:id` – Atualiza uma atividade existente  
- `DELETE /api/atividades/:id` – Remove uma atividade do sistema  

#### 3.6.3. Rotas de Agendamentos  
- `POST /api/agendamentos` – Registra um novo agendamento de atividade para um usuário  
- `GET /api/agendamentos/usuario/:usuarioId` – Retorna todos os agendamentos de um usuário específico  
- `PUT /api/agendamentos/:id` – Atualiza um agendamento existente  
- `DELETE /api/agendamentos/:id` – Remove um agendamento específico  
 

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
