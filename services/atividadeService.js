const db = require('../config/db');

// Buscar todas as atividades de um usuário
const buscarAtividadesPorUsuario = async (id_usuario) => {
  try {
    const result = await db.query(
      'SELECT * FROM atividade WHERE id_usuario = $1',
      [id_usuario]
    );
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar atividades: ' + error.message);
  }
};

// Buscar atividade por ID
const buscarAtividadePorId = async (id_atividade) => {
  try {
    const result = await db.query(
      'SELECT * FROM atividade WHERE id_atividade = $1',
      [id_atividade]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar atividade: ' + error.message);
  }
};

// Criar nova atividade
const criarAtividade = async (nome, descricao, cor_categoria, id_usuario) => {
  try {
    const result = await db.query(
      `INSERT INTO atividade (nome, descricao, cor_categoria, id_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, descricao, cor_categoria, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar atividade: ' + error.message);
  }
};

// Atualizar atividade
const atualizarAtividade = async (id_atividade, nome, descricao, cor_categoria) => {
  try {
    const result = await db.query(
      `UPDATE atividade
       SET nome = $1, descricao = $2, cor_categoria = $3
       WHERE id_atividade = $4
       RETURNING *`,
      [nome, descricao, cor_categoria, id_atividade]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar atividade: ' + error.message);
  }
};

// Deletar atividade
const deletarAtividade = async (id_atividade) => {
  try {
    const result = await db.query(
      'DELETE FROM atividade WHERE id_atividade = $1 RETURNING *',
      [id_atividade]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar atividade: ' + error.message);
  }
};

module.exports = {
  buscarAtividadesPorUsuario,
  buscarAtividadePorId,
  criarAtividade,
  atualizarAtividade,
  deletarAtividade
};
