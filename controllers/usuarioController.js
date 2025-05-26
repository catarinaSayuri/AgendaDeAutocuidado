const usuarioService = require('../services/usuarioService');

// Buscar todos os usuários
const buscarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um usuário por ID
const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo usuário
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha_hash } = req.body;

    const novoUsuario = await usuarioService.criarUsuario(nome, email, senha_hash);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar usuário
const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha_hash } = req.body;

    const usuarioAtualizado = await usuarioService.atualizarUsuario(
      req.params.id,
      nome,
      email,
      senha_hash
    );

    if (usuarioAtualizado) {
      res.status(200).json(usuarioAtualizado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar usuário
const deletarUsuario = async (req, res) => {
  try {
    const usuarioDeletado = await usuarioService.deletarUsuario(req.params.id);
    if (usuarioDeletado) {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  buscarTodosUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};
