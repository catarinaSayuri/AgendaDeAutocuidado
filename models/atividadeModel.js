const db = require('../config/db');

const listarAtividades = async () => {
  try {
    const result = await db.query('SELECT * FROM atividade');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar atividades: ' + error.message);
  }
};

const buscarAtividadePorId = async (id_atividade) => {
  try {
    const result = await db.query('SELECT * FROM atividade WHERE id_atividade = $1', [id_atividade]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar atividade: ' + error.message);
  }
};

const buscarAtividadesPorCategoria = async (nome_categoria) => {
  try {
    const result = await db.query('SELECT * FROM atividade WHERE nome = $1', [nome_categoria]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar atividades por categoria: ' + error.message);
  }
};

const buscarAtividadesPorUsuario = async (id_usuario) => {
  try {
    const result = await db.query('SELECT * FROM atividade WHERE id_usuario = $1', [id_usuario]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar atividades do usuário: ' + error.message);
  }
};

const criarAtividade = async (nome, descricao, cor_categoria, id_usuario) => {
  try {
    const result = await db.query(
      'INSERT INTO atividade (nome, descricao, cor_categoria, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, descricao, cor_categoria, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar atividade: ' + error.message);
  }
};

const atualizarAtividade = async (id_atividade, nome, descricao, cor_categoria) => {
  try {
    const result = await db.query(
      'UPDATE atividade SET nome = $1, descricao = $2, cor_categoria = $3 WHERE id_atividade = $4 RETURNING *',
      [nome, descricao, cor_categoria, id_atividade]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar atividade: ' + error.message);
  }
};

const deletarAtividade = async (id_atividade) => {
  try {
    const result = await db.query('DELETE FROM atividade WHERE id_atividade = $1 RETURNING *', [id_atividade]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar atividade: ' + error.message);
  }
};

module.exports = {
  listarAtividades,
  buscarAtividadePorId,
  buscarAtividadesPorCategoria,
  buscarAtividadesPorUsuario,
  criarAtividade,
  atualizarAtividade,
  deletarAtividade
};