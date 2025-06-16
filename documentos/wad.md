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

### 2.1. Personas 

Joana, 28 anos, trabalha em home office e tem dificuldade em organizar suas atividades diárias de autocuidado devido ao trabalho excessivo.

Carlos, 35 anos, busca melhorar sua saúde mental e emocional, e precisa de um sistema simples para registrar suas atividades e progresso.

### 2.2. User Stories 

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

**Responsabilidade:** Gerenciar dados da tabela `usuario` no banco de dados PostgreSQL, incluindo criação, leitura, atualização e exclusão de registros, além de suporte à autenticação.

### Métodos principais

- `buscarUsuarioPorId(id_usuario)`  
  Retorna os dados de um usuário específico com base no seu ID.

- `criarUsuario(email, senha, nome)`  
  Cria um novo usuário no banco de dados, criptografando a senha antes do armazenamento.

- `atualizarUsuario(id_usuario, nome, email)`  
  Atualiza os campos de nome e email de um usuário existente.

- `deletarUsuario(id_usuario)`  
  Remove um usuário do banco de dados com base no seu ID.

### Métodos auxiliares

- `buscarUsuarioPorEmail(email)`  
  Retorna os dados de um usuário com base no email. Esse método é útil para autenticação e verificação de existência de email já cadastrado.

## 3.1.1.2. Model `Atividade`

**Responsabilidade:** Gerenciar dados da tabela `atividade` e sua relação com o usuário, incluindo criação, leitura, atualização, exclusão e organização por categoria e favoritos.

### Métodos principais

- `buscarAtividadePorId(id_atividade, id_usuario)`  
  Retorna uma atividade específica, garantindo que ela pertença ao usuário informado.

- `buscarTodasAtividadesPorUsuario(id_usuario)`  
  Retorna todas as atividades vinculadas a um determinado usuário.

- `criarAtividade(nome, categoria, descricao, cor_categoria, id_usuario)`  
  Cria uma nova atividade associada a um usuário. A atividade é criada inicialmente com `is_favorite = false`.

- `atualizarAtividade(id_atividade, id_usuario, { nome, categoria, descricao, cor_categoria, is_favorite })`  
  Atualiza os dados de uma atividade. Apenas os campos informados são modificados.

- `deletarAtividade(id_atividade, id_usuario)`  
  Remove uma atividade pertencente a um usuário específico.

### Métodos auxiliares

- `buscarAtividadesFavoritasPorUsuario(id_usuario)`  
  Retorna todas as atividades marcadas como favoritas de um usuário.

- `buscarAtividadesPorCategoria(id_usuario, categoria)`  
  Retorna atividades de um usuário filtradas por categoria.

- `buscarCategoriasUnicasAtividades(id_usuario)`  
  Lista todas as categorias únicas utilizadas nas atividades de um usuário.

- `atualizarFavorito(id_usuario, id_atividade, is_favorite)`  
  Atualiza o status de favorito de uma atividade.


## 3.1.1.3. Model `Agendamento`

**Responsabilidade:** Gerenciar dados da tabela `agendamento` e os relacionamentos com `usuario` e `atividade`, além de controlar horários e evitar conflitos.

### Métodos principais

- `buscarTodosAgendamentos(id_usuario)`  
  Retorna todos os agendamentos de um usuário, incluindo informações da atividade e do usuário. Ordena por data e horário de início.

- `buscarAgendamentoPorId(id_agendamento, id_usuario)`  
  Retorna um agendamento específico, com informações adicionais sobre o usuário e a atividade associada.

- `buscarAgendamentosPorDia(id_usuario, data)`  
  Retorna todos os agendamentos de um usuário para um dia específico, ordenados por horário de início.

- `criarAgendamento(id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao)`  
  Cria um novo agendamento para um usuário e uma atividade, com dados opcionais como nome e descrição. O status padrão é `'pendente'`.

- `atualizarAgendamento(id_agendamento, id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao)`  
  Atualiza os dados de um agendamento, garantindo que ele pertença ao usuário.

- `deletarAgendamento(id_agendamento, id_usuario)`  
  Remove um agendamento pertencente a um usuário.

### Métodos auxiliares

- `checkConflitoHorario(id_usuario, data, horario_inicio, horario_fim, id_agendamento = null)`  
  Verifica se há conflitos de horário com outros agendamentos do mesmo usuário. Se `id_agendamento` for fornecido, ele é ignorado na verificação (útil ao editar um agendamento).


### 3.2. Arquitetura (Semana 5)

O diagrama abaixo ilustra a arquitetura completa do sistema web:

#### Diagrama de Arquitetura
<div align="center">
  <sup>Figura 1 - Diagrama de Arquitetura</sup>
  <img src="/documentos/assets/diagrama de arquitetura.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

### 3.3. Wireframes 

A entrega realizada não abrangeu esse aspecto.

### 3.4. Guia de estilos 

A entrega realizada não abrangeu esse aspecto.


### 3.5. Protótipo de alta fidelidade 

A entrega realizada não abrangeu esse aspecto.

### 3.6. WebAPI e endpoints (Semana 05)

#### 3.6.1. Rotas de Usuários  
- `POST /api/usuario/create` – Cria um novo usuário no sistema.  
- `POST /api/usuario/login` – Realiza o login de um usuário com e-mail e senha.  
- `GET /api/usuario/:id` – Retorna os dados de um usuário específico (requer autenticação).  
- `PUT /api/usuario/:id` – Atualiza os dados de um usuário específico (requer autenticação).  
- `DELETE /api/usuario/:id` – Remove um usuário do sistema (requer autenticação).  
- `GET /api/user/session` – Verifica se há um usuário logado na sessão atual.

#### 3.6.2. Rotas de Atividades  
- `POST /api/atividade` – Cria uma nova atividade para o usuário autenticado.  
- `POST /api/atividade/favorite` – Atualiza o status de favorito de uma atividade.  
- `GET /api/atividade/usuario` – Lista todas as atividades do usuário autenticado.  
- `GET /api/atividade/categoria` – Lista atividades filtradas por categoria.  
- `GET /api/atividade/categorias` – Retorna todas as categorias únicas de atividades do usuário.  
- `GET /api/atividade/:id` – Retorna os dados de uma atividade específica.  
- `PUT /api/atividade/:id` – Atualiza uma atividade específica.  
- `DELETE /api/atividade/:id` – Remove uma atividade específica.

#### 3.6.3. Rotas de Agendamentos  
- `POST /api/agendamento` – Cria um novo agendamento de atividade para o usuário autenticado.  
- `GET /api/agendamentos` – Lista todos os agendamentos do usuário autenticado.  
- `GET /api/agendamentos/dia` – Retorna os agendamentos de um dia específico para o usuário autenticado.  
- `GET /api/agendamento/:id` – Retorna os dados de um agendamento específico.  
- `PUT /api/agendamento/:id` – Atualiza os dados de um agendamento específico.  
- `DELETE /api/agendamento/:id` – Remove um agendamento específico.

#### 3.6.4. Rotas de Views (HTML)  
- `GET /` – Página inicial (welcome).  
- `GET /register` – Página de cadastro de usuário.  
- `GET /login` – Página de login.  
- `GET /myroutine` – Página com a rotina do usuário (requer autenticação).  
- `GET /agenda` – Página de visualização dos agendamentos (requer autenticação).  
- `GET /atividades` – Página de gerenciamento de atividades (requer autenticação).  
- `GET /calendario` – Página do calendário de atividades (requer autenticação).
 

### 3.7 Interface e Navegação (Semana 07)

<div align="center">
  <sup>Figura 1 - Tela de Login</sup>
  <img src="/documentos/assets/tela-login.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

A tela de login é a porta de entrada do sistema, onde o usuário insere suas credenciais para acessar a aplicação. Ela prioriza a simplicidade e clareza, com campos para e-mail e senha, além de um botão para autenticação.

<div align="center">
  <sup>Figura 2 - Tela de Cadastro</sup>
  <img src="/documentos/assets/tela-cadastro.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

A tela de cadastro permite que novos usuários se registrem no sistema, preenchendo informações básicas para criar uma conta. O design é intuitivo para facilitar o processo inicial de adesão.

<div align="center">
  <sup>Figura 3 - Tela Home</sup>
  <img src="/documentos/assets/tela-welcome.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

A tela inicial (Home) dá as boas-vindas ao usuário e apresenta uma visão geral das funcionalidades disponíveis, como acesso rápido à agenda e às atividades de autocuidado.

<div align="center">
  <sup>Figura 4 - Tela de Atividades</sup>
  <img src="/documentos/assets/tela-atividades.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

Nesta tela, o usuário pode visualizar, criar e gerenciar suas atividades de autocuidado, definindo nome, descrição e outras configurações para cada tarefa.

<div align="center">
  <sup>Figura 5 - Tela de Minha Rotina</sup>
  <img src="/documentos/assets/tela-rotina.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

A tela de Minha Rotina exibe a programação diária do usuário, com os horários e status das atividades agendadas, permitindo controle e acompanhamento das práticas de autocuidado.

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

Para conhecer melhor o projeto e suas funcionalidades, assista ao vídeo explicativo:

[Assista ao vídeo aqui](https://www.youtube.com/watch?v=dBCzEHZ5X6w)

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

O projeto Agenda de Autocuidado tem uma boa estrutura e funcionalidades essenciais para organizar atividades de bem-estar. Porém, a interface pode ser mais moderna e melhor tratamento de erros. Melhorias futuras incluem notificações, relatórios e tela de visuzalização de perfil.

## <a name="c5"></a>5. Referências

A entrega realizada não abrangeu esse aspecto.

---
