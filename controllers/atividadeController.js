const atividadeModel = require('../models/atividadeModel');

const listarAtividades = async (req, res) => {
  try {
    const atividades = await atividadeModel.listarAtividades();
    res.status(200).json(atividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAtividadePorId = async (req, res) => {
  try {
    const atividade = await atividadeModel.buscarAtividadePorId(req.params.id);
    if (!atividade) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    res.status(200).json(atividade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAtividadesPorCategoria = async (req, res) => {
  try {
    const { nome_categoria } = req.query;
    if (!['Física', 'Criativa', 'Mental'].includes(nome_categoria)) {
      return res.status(400).json({ error: 'Categoria inválida' });
    }
    const atividades = await atividadeModel.buscarAtividadesPorCategoria(nome_categoria);
    res.status(200).json(atividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAtividadesPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.query;
    const atividades = await atividadeModel.buscarAtividadesPorUsuario(id_usuario);
    res.status(200).json(atividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarAtividade = async (req, res) => {
  try {
    const { nome, descricao, cor_categoria, id_usuario } = req.body;
    if (!['Física', 'Criativa', 'Mental'].includes(nome)) {
      return res.status(400).json({ error: 'Categoria inválida' });
    }
    const atividade = await atividadeModel.criarAtividade(nome, descricao, cor_categoria, id_usuario);
    res.status(201).json(atividade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarAtividade = async (req, res) => {
  try {
    const { nome, descricao, cor_categoria } = req.body;
    if (!['Física', 'Criativa', 'Mental'].includes(nome)) {
      return res.status(400).json({ error: 'Categoria inválida' });
    }
    const atividade = await atividadeModel.atualizarAtividade(req.params.id, nome, descricao, cor_categoria);
    if (!atividade) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    res.status(200).json(atividade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarAtividade = async (req, res) => {
  try {
    const atividade = await atividadeModel.deletarAtividade(req.params.id);
    if (!atividade) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }
    res.status(200).json({ message: 'Atividade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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