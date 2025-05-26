const db = require('../config/db');

class Agendamento {
  // Buscar todos os agendamentos
  static async getAll() {
    const result = await db.query('SELECT * FROM agendamento');
    return result.rows;
  }

  // Buscar agendamentos por usuário
  static async getByUsuario(id_usuario) {
    const result = await db.query(
      'SELECT * FROM agendamento WHERE id_usuario = $1',
      [id_usuario]
    );
    return result.rows;
  }

  // Buscar agendamento por ID
  static async getById(id_agendamento) {
    const result = await db.query(
      'SELECT * FROM agendamento WHERE id_agendamento = $1',
      [id_agendamento]
    );
    return result.rows[0];
  }

  // Criar um novo agendamento
  static async create(data) {
    const result = await db.query(
      `INSERT INTO agendamento (
        id_usuario,
        id_atividade,
        data,
        horario_inicio,
        horario_fim,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        data.id_usuario,
        data.id_atividade,
        data.data,
        data.horario_inicio,
        data.horario_fim,
        data.status || 'pendente'
      ]
    );
    return result.rows[0];
  }

  // Atualizar um agendamento
  static async update(id_agendamento, data) {
    const result = await db.query(
      `UPDATE agendamento
       SET data = $1,
           horario_inicio = $2,
           horario_fim = $3,
           status = $4
       WHERE id_agendamento = $5
       RETURNING *`,
      [
        data.data,
        data.horario_inicio,
        data.horario_fim,
        data.status,
        id_agendamento
      ]
    );
    return result.rows[0];
  }

  // Deletar um agendamento
  static async delete(id_agendamento) {
    const result = await db.query(
      'DELETE FROM agendamento WHERE id_agendamento = $1 RETURNING *',
      [id_agendamento]
    );
    return result.rows[0];
  }
}

module.exports = Agendamento;
