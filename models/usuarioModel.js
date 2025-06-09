const db = require('../config/db');
const bcrypt = require('bcrypt');


const buscarUsuarioPorId = async (id_usuario) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id_usuario]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar usuário: ' + error.message);
  }
};

const criarUsuario = async (email, senha, nome) => {
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const result = await db.query(
      'INSERT INTO usuario (email, senha, nome) VALUES ($1, $2, $3) RETURNING *',
      [email, senhaCriptografada, nome]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Detalhes do erro no modelo:', err); // Log detalhado
    throw new Error('Erro ao criar usuário: ' + err.message);
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

const buscarUsuarioPorEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao buscar usuário por email: ' + error.message);
  }
};
module.exports = {
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  buscarUsuarioPorEmail

};