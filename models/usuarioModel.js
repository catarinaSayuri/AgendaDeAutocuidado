const db = require('../config/db');
const bcrypt = require('bcrypt');

const buscarTodosUsuarios = async () => {
  try {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

const buscarUsuarioPorId = async (id_usuario) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id_usuario]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar usuário: ' + error.message);
  }
};

const criarUsuario = async (nome, email, senha) => {
  try {
    const senha_hash = await bcrypt.hash(senha, 10);
    const result = await db.query(
      `INSERT INTO usuario (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nome, email, senha_hash]
    );
    return result.rows[0];
  } catch (error) {
    throw error; 
  }
};


const loginUsuario = async (email, senha) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    const usuario = result.rows[0];
    if (usuario && await bcrypt.compare(senha, usuario.senha_hash)) {
      return usuario;
    }
    return null;
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error.message);
  }
};

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
  loginUsuario,
  atualizarUsuario,
  deletarUsuario
};