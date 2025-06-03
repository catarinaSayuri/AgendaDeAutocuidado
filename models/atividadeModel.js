  const db = require('../config/db');

  class Atividade {
    // Buscar todas as atividades (opcional: filtrar por usuário)
    static async getAll(id_usuario = null) {
      if (id_usuario) {
        const result = await db.query('SELECT * FROM atividade WHERE id_usuario = $1', [id_usuario]);
        return result.rows;
      } else {
        const result = await db.query('SELECT * FROM atividade');
        return result.rows;
      }
    }

    // Buscar atividade por ID
    static async getById(id_atividade) {
      const result = await db.query('SELECT * FROM atividade WHERE id_atividade = $1', [id_atividade]);
      return result.rows[0];
    }

    // Criar nova atividade
    static async create(data) {
      const result = await db.query(
        `INSERT INTO atividade (nome, descricao, cor_categoria, id_usuario)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [data.nome, data.descricao, data.cor_categoria, data.id_usuario]
      );
      return result.rows[0];
    }

    // Atualizar atividade
    static async update(id_atividade, data) {
      const result = await db.query(
        `UPDATE atividade
        SET nome = $1, descricao = $2, cor_categoria = $3
        WHERE id_atividade = $4
        RETURNING *`,
        [data.nome, data.descricao, data.cor_categoria, id_atividade]
      );
      return result.rows[0];
    }

    // Deletar atividade
    static async delete(id_atividade) {
      const result = await db.query(
        'DELETE FROM atividade WHERE id_atividade = $1 RETURNING *',
        [id_atividade]
      );
      return result.rows[0];
    }
  }

  module.exports = Atividade;
