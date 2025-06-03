const agendamentoModel = require('../models/agendamentoModel');

// Buscar todos os agendamentos de um usuário
const buscarAgendamentosPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const agendamentos = await agendamentoModel.buscarAgendamentosPorUsuario(id_usuario);
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um agendamento por ID
const buscarAgendamentoPorId = async (req, res) => {
  try {
    const agendamento = await agendamentoModel.buscarAgendamentoPorId(req.params.id);
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar novo agendamento
const criarAgendamento = async (req, res) => {
  try {
    const { id_usuario, id_atividade, data, horario_inicio, horario_fim, status } = req.body;
    const novoAgendamento = await agendamentoModel.criarAgendamento(
      id_usuario, id_atividade, data, horario_inicio, horario_fim, status
    );
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar agendamento
const atualizarAgendamento = async (req, res) => {
  try {
    const { data, horario_inicio, horario_fim, status } = req.body;
    const agendamentoAtualizado = await agendamentoModel.atualizarAgendamento(
      req.params.id, data, horario_inicio, horario_fim, status
    );
    if (agendamentoAtualizado) {
      res.status(200).json(agendamentoAtualizado);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar agendamento
const deletarAgendamento = async (req, res) => {
  try {
    const agendamentoDeletado = await agendamentoModel.deletarAgendamento(req.params.id);
    if (agendamentoDeletado) {
      res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  buscarAgendamentosPorUsuario,
  buscarAgendamentoPorId,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};
