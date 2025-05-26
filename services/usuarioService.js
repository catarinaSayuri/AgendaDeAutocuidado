const db = require('../config/db');

// Buscar todos os usuários
const buscarTodosUsuarios = async () => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

// Buscar um usuário por ID
const buscarUsuarioPorId = async (id_usuario) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id_usuario]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar usuário: ' + error.message);
  }
};

// Criar novo usuário
const criarUsuario = async (nome, email, senha_hash) => {
  try {
    const result = await db.query(
      `INSERT INTO usuario (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nome, email, senha_hash]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Atualizar dados do usuário
const atualizarUsuario = async (id_usuario, nome, email) => {
  try {
    const result = await db.query(
      `UPDATE usuario 
       SET nome = $1, email = $2
       WHERE id_usuario = $3
       RETURNING *`,
      [nome, email, id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Deletar usuário
const deletarUsuario = async (id_usuario) => {
  try {
    const result = await db.query(
      'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *',
      [id_usuario]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  buscarTodosUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
