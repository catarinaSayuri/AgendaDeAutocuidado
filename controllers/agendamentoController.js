const agendamentoModel = require('../models/agendamentoModel');

const listarAgendamentos = async (req, res) => {
  try {
    const userId = req.session.user.id_usuario;
    console.log('Listando agendamentos para usuário:', userId);
    const agendamentos = await agendamentoModel.buscarTodosAgendamentos(userId);
    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error.message);
    res.status(500).json({ error: 'Erro ao listar agendamentos: ' + error.message });
  }
};

const buscarAgendamentoPorId = async (req, res) => {
  try {
    const userId = req.session.user.id_usuario;
    console.log('Buscando agendamento ID:', req.params.id, 'para usuário:', userId);
    const agendamento = await agendamentoModel.buscarAgendamentoPorId(req.params.id, userId);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch (error) {
    console.error('Erro ao buscar agendamento por ID:', error.message);
    res.status(500).json({ error: 'Erro ao buscar agendamento: ' + error.message });
  }
};

const buscarAgendamentosPorDia = async (req, res) => {
  try {
    const { data } = req.query;
    const userId = req.session.user.id_usuario;
    console.log('Buscando agendamentos para data:', data, 'e usuário:', userId);
    if (!data) {
      return res.status(400).json({ error: 'Data é obrigatória' });
    }
    const agendamentos = await agendamentoModel.buscarAgendamentosPorDia(userId, data);
    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos por dia:', error.message);
    res.status(500).json({ error: 'Erro ao buscar agendamentos por dia: ' + error.message });
  }
};

const criarAgendamento = async (req, res) => {
  try {
    const { id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao } = req.body;
    const userId = req.session.user.id_usuario;
    console.log('Criando agendamento para usuário:', userId, 'com dados:', req.body);
    if (!id_usuario || !id_atividade || !data || !horario_inicio || !horario_fim || !nome_agendamento) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }
    if (!['pendente', 'concluido', 'cancelado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' });
    }
    if (horario_fim <= horario_inicio) {
      return res.status(400).json({ error: 'Hora de fim deve ser posterior à hora de início.' });
    }
    const conflitos = await agendamentoModel.checkConflitoHorario(id_usuario, data, horario_inicio, horario_fim);
    if (conflitos.length) {
      return res.status(400).json({ error: 'Conflito de horário com outro agendamento.' });
    }
    const agendamento = await agendamentoModel.criarAgendamento(id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao);
    res.status(201).json(agendamento);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error.message);
    res.status(500).json({ error: 'Erro ao criar agendamento: ' + error.message });
  }
};

const atualizarAgendamento = async (req, res) => {
  try {
    const { id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao } = req.body;
    const userId = req.session.user.id_usuario;
    console.log('Atualizando agendamento ID:', req.params.id, 'para usuário:', userId);
    if (!id_usuario || !id_atividade || !data || !horario_inicio || !horario_fim || !nome_agendamento) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }
    if (!['pendente', 'concluido', 'cancelado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' });
    }
    if (horario_fim <= horario_inicio) {
      return res.status(400).json({ error: 'Hora de fim deve ser posterior à hora de início.' });
    }
    const conflitos = await agendamentoModel.checkConflitoHorario(id_usuario, data, horario_inicio, horario_fim, req.params.id);
    if (conflitos.length) {
      return res.status(400).json({ error: 'Conflito de horário com outro agendamento.' });
    }
    const agendamento = await agendamentoModel.atualizarAgendamento(req.params.id, id_usuario, id_atividade, data, horario_inicio, horario_fim, status, nome_agendamento, descricao);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar agendamento: ' + error.message });
  }
};

const deletarAgendamento = async (req, res) => {
  try {
    const userId = req.session.user.id_usuario;
    console.log('Deletando agendamento ID:', req.params.id, 'para usuário:', userId);
    const agendamento = await agendamentoModel.deletarAgendamento(req.params.id, userId);
    if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error.message);
    res.status(500).json({ error: 'Erro ao deletar agendamento: ' + error.message });
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