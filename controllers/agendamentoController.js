const agendamentoModel = require('../models/agendamentoModel');

const listarAgendamentos = async (req, res) => {
  try {
    const agendamentos = await agendamentoModel.buscarTodosAgendamentos();
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAgendamentoPorId = async (req, res) => {
  try {
    const agendamento = await agendamentoModel.buscarAgendamentoPorId(req.params.id);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAgendamentosPorDia = async (req, res) => {
  try {
    const agendamentos = await agendamentoModel.buscarAgendamentosPorDia(req.query.data);
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarAgendamento = async (req, res) => {
  try {
    const { id_usuario, id_atividade, data, horario_inicio, horario_fim, status } = req.body;
    const agendamento = await agendamentoModel.criarAgendamento(id_usuario, id_atividade, data, horario_inicio, horario_fim, status);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarAgendamento = async (req, res) => {
  try {
    const { id_usuario, id_atividade, data, horario_inicio, horario_fim, status } = req.body;
    const agendamento = await agendamentoModel.atualizarAgendamento(req.params.id, id_usuario, id_atividade, data, horario_inicio, horario_fim, status);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarAgendamento = async (req, res) => {
  try {
    const agendamento = await agendamentoModel.deletarAgendamento(req.params.id);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarAgendamentos,
  buscarAgendamentoPorId,
  buscarAgendamentosPorDia,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};