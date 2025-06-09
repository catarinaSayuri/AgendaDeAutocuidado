const db = require('../config/db');

const buscarTodosAgendamentos = async (id_usuario) => {
  try {
    const result = await db.query(`
      SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome, at.categoria AS atividade_categoria, at.cor_categoria AS atividade_cor_categoria
      FROM agendamento a
      JOIN usuario u ON a.id_usuario = u.id_usuario
      LEFT JOIN atividade at ON a.id_atividade = at.id_atividade
      WHERE a.id_usuario = $1
      ORDER BY a.data, a.horario_inicio
    `, [id_usuario]);
    return result.rows;
  } catch (error) {
    console.error('Erro no model ao buscar agendamentos:', error.message);
    throw new Error('Erro ao buscar agendamentos: ' + error.message);
  }
};

const buscarAgendamentoPorId = async (id_agendamento, id_usuario) => {
  try {
    const result = await db.query(
      `SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome, at.categoria AS atividade_categoria, at.cor_categoria AS atividade_cor_categoria
      FROM agendamento a
      JOIN usuario u ON a.id_usuario = u.id_usuario
      LEFT JOIN atividade at ON a.id_atividade = at.id_atividade
      WHERE a.id_agendamento = $1 AND a.id_usuario = $2`,
      [id_agendamento, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro no model ao buscar agendamento por ID:', error.message);
    throw new Error('Erro ao buscar agendamento: ' + error.message);
  }
};

const buscarAgendamentosPorDia = async (id_usuario, data) => {
  try {
    const result = await db.query(
      `SELECT a.*, u.nome AS usuario_nome, at.nome AS atividade_nome, at.categoria AS atividade_categoria, at.cor_categoria AS atividade_cor_categoria
      FROM agendamento a
      JOIN usuario u ON a.id_usuario = u.id_usuario
      LEFT JOIN atividade at ON a.id_atividade = at.id_atividade
      WHERE a.id_usuario = $1 AND a.data = $2
      ORDER BY a.horario_inicio`,
      [id_usuario, data]
    );
    console.log('Query result:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro no model ao buscar agendamentos por dia:', error.message);
    throw new Error('Erro ao buscar agendamentos por dia: ' + error.message);
  }
};

const criarAgendamento = async (id_usuario, id_atividade, data, horario_inicio, horario_fim, status = 'pendente', nome_agendamento = null, descricao = null) => {
  try {
    const result = await db.query(
      `INSERT INTO agendamento (id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro no model ao criar agendamento:', error.message);
    throw new Error('Erro ao criar agendamento: ' + error.message);
  }
};

const atualizarAgendamento = async (id_agendamento, id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento = null, descricao = null) => {
  try {
    const result = await db.query(
      `UPDATE agendamento
      SET id_usuario = $1, id_atividade = $2, data = $3, horario_inicio = $4, horario_fim = $5, status = $6, nome_agendamento = $7, descricao = $8
      WHERE id_agendamento = $9 AND id_usuario = $10
      RETURNING *`,
      [id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao, id_agendamento, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro no model ao atualizar agendamento:', error.message);
    throw new Error('Erro ao atualizar agendamento: ' + error.message);
  }
};

const deletarAgendamento = async (id_agendamento, id_usuario) => {
  try {
    const result = await db.query(
      `DELETE FROM agendamento WHERE id_agendamento = $1 AND id_usuario = $2 RETURNING *`,
      [id_agendamento, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro no model ao deletar agendamento:', error.message);
    throw new Error('Erro ao deletar agendamento: ' + error.message);
  }
};

const checkConflitoHorario = async (id_usuario, data, horario_inicio, horario_fim, id_agendamento = null) => {
  try {
    let query = `
      SELECT * FROM agendamento
      WHERE id_usuario = $1 AND data = $2
      AND (
        (horario_inicio < $4 AND horario_fim > $3)
        OR (horario_inicio >= $3 AND horario_inicio < $4)
      )
    `;
    const values = [id_usuario, data, horario_inicio, horario_fim];
    if (id_agendamento) {
      query += ` AND id_agendamento != $5`;
      values.push(id_agendamento);
    }
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Erro no model ao verificar conflito de horário:', error.message);
    throw new Error('Erro ao verificar conflito de horário: ' + error.message);
  }
};

module.exports = {
  buscarTodosAgendamentos,
  buscarAgendamentoPorId,
  buscarAgendamentosPorDia,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
  checkConflitoHorario
};