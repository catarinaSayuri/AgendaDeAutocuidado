// controllers/atividadeController.js

const atividadeModel = require('../models/atividadeModel');

// Buscar todas as atividades do usuário
const buscarAtividadesPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const atividades = await atividadeModel.buscarAtividadesPorUsuario(id_usuario);
    res.status(200).json(atividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar uma atividade específica por ID
const buscarAtividadePorId = async (req, res) => {
  try {
    const atividade = await atividadeModel.buscarAtividadePorId(req.params.id);
    if (atividade) {
      res.status(200).json(atividade);
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar uma nova atividade
const criarAtividade = async (req, res) => {
  try {
    const { nome, descricao, cor_categoria, id_usuario } = req.body;

    const novaAtividade = await atividadeModel.criarAtividade(
      nome,
      descricao,
      cor_categoria,
      id_usuario
    );

    res.status(201).json(novaAtividade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma atividade existente
const atualizarAtividade = async (req, res) => {
  try {
    const { nome, descricao, cor_categoria } = req.body;

    const atividadeAtualizada = await atividadeModel.atualizarAtividade(
      req.params.id,
      nome,
      descricao,
      cor_categoria
    );

    if (atividadeAtualizada) {
      res.status(200).json(atividadeAtualizada);
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma atividade
const deletarAtividade = async (req, res) => {
  try {
    const atividadeDeletada = await atividadeModel.deletarAtividade(req.params.id);
    if (atividadeDeletada) {
      res.status(200).json({ message: 'Atividade deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Atividade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  buscarAtividadesPorUsuario,
  buscarAtividadePorId,
  criarAtividade,
  atualizarAtividade,
  deletarAtividade
};
