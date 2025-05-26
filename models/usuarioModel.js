const db = require('../config/db');

class Usuario {
  // Buscar todos os usuários
  static async getAll() {
    const result = await db.query('SELECT * FROM usuario');
    return result.rows;
  }

  // Buscar usuário por ID
  static async getById(id_usuario) {
    const result = await db.query('SELECT * FROM usuario WHERE id_usuario = $1', [id_usuario]);
    return result.rows[0];
  }

  // Criar novo usuário
  static async create(data) {
    const result = await db.query(
      `INSERT INTO usuario (nome, email, senha_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.nome, data.email, data.senha_hash]
    );
    return result.rows[0];
  }

  // Atualizar usuário
  static async update(id_usuario, data) {
    const result = await db.query(
      `UPDATE usuario
       SET nome = $1, email = $2
       WHERE id_usuario = $3
       RETURNING *`,
      [data.nome, data.email, id_usuario]
    );
    return result.rows[0];
  }

  // Deletar usuário
  static async delete(id_usuario) {
    const result = await db.query(
      'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *',
      [id_usuario]
    );
    return result.rows[0];
  }
}

module.exports = Usuario;
