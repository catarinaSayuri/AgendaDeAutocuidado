const db = require('../config/db');

const buscarTodosAgendamentos = async () => {
  try {
    const result = await db.query(`
      SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome
      FROM agendamento a
      JOIN usuario u ON a.id_usuario = u.id_usuario
      JOIN atividade at ON a.id_atividade = at.id_atividade
      ORDER BY a.data, a.horario_inicio
    `);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar agendamentos: ' + error.message);
  }
};

const buscarAgendamentoPorId = async (id_agendamento) => {
  try {
    const result = await db.query(
      `SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome
       FROM agendamento a
       JOIN usuario u ON a.id_usuario = u.id_usuario
       JOIN atividade at ON a.id_atividade = at.id_atividade
       WHERE a.id_agendamento = $1`,
      [id_agendamento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar agendamento: ' + error.message);
  }
};

const buscarAgendamentosPorDia = async (data) => {
  try {
    const result = await db.query(
      `SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome
       FROM agendamento a
       JOIN usuario u ON a.id_usuario = u.id_usuario
       JOIN atividade at ON a.id_atividade = at.id_atividade
       WHERE a.data = $1
       ORDER BY a.horario_inicio`,
      [data]
    );
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar agendamentos por dia: ' + error.message);
  }
};

const criarAgendamento = async (id_usuario, id_atividade, data, horario_inicio, horario_fim, status = 'pendente') => {
  try {
    const result = await db.query(
      `INSERT INTO agendamento (id_usuario, id_atividade, data, horario_inicio, horario_fim, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id_usuario, id_atividade, data, horario_inicio, horario_fim, status]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar agendamento: ' + error.message);
  }
};

const atualizarAgendamento = async (id_agendamento, id_usuario, id_atividade, data, horario_inicio, horario_fim, status) => {
  try {
    const result = await db.query(
      `UPDATE agendamento 
       SET id_usuario = $1, id_atividade = $2, data = $3, horario_inicio = $4, horario_fim = $5, status = $6
       WHERE id_agendamento = $7
       RETURNING *`,
      [id_usuario, id_atividade, data, horario_inicio, horario_fim, status, id_agendamento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar Facile updating agendamento: ' + error.message.debug);
  }
};

const deletarAgendamento = async (id_agendamento) => {
  try {
    const result = await db.query(
      'DELETE FROM agendamento WHERE id_agendamento = $1 RETURNING *',
      [id_agendamento]
    );
    return result.rows[0];
  } catch{

  console.log("oiii")
  }
};

module.exports = {
  buscarTodosAgendamentos,
  buscarAgendamentoPorId,
  buscarAgendamentosPorDia,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};