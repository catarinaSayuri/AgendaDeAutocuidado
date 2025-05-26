const db = require('../config/db');

// Buscar todos os agendamentos de um usuário
const buscarAgendamentosPorUsuario = async (id_usuario) => {
  try {
    const result = await db.query(
      'SELECT * FROM agendamentos WHERE id_usuario = $1',
      [id_usuario]
    );
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar agendamentos: ' + error.message);
  }
};

// Buscar um agendamento por ID
const buscarAgendamentoPorId = async (id_agendamento) => {
  try {
    const result = await db.query(
      'SELECT * FROM agendamentos WHERE id_agendamento = $1',
      [id_agendamento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar agendamento: ' + error.message);
  }
};

// Criar novo agendamento
const criarAgendamento = async (id_usuario, id_atividade, data, horario_inicio, horario_fim, status) => {
  try {
    const result = await db.query(
      `INSERT INTO agendamentos (
         id_usuario, 
         id_atividade, 
         data, 
         horario_inicio, 
         horario_fim, 
         status
       ) VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id_usuario, id_atividade, data, horario_inicio, horario_fim, status]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar agendamento: ' + error.message);
  }
};

// Atualizar um agendamento por ID
const atualizarAgendamento = async (id_agendamento, data, horario_inicio, horario_fim, status) => {
  try {
    const result = await db.query(
      `UPDATE agendamentos
       SET data = $1,
           horario_inicio = $2,
           horario_fim = $3,
           status = $4
       WHERE id_agendamento = $5
       RETURNING *`,
      [data, horario_inicio, horario_fim, status, id_agendamento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar agendamento: ' + error.message);
  }
};

// Deletar agendamento por ID
const deletarAgendamento = async (id_agendamento) => {
  try {
    const result = await db.query(
      'DELETE FROM agendamentos WHERE id_agendamento = $1 RETURNING *',
      [id_agendamento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar agendamento: ' + error.message);
  }
};

module.exports = {
  buscarAgendamentosPorUsuario,
  buscarAgendamentoPorId,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};
