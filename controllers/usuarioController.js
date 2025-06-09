const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioModel.buscarUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    req.session.user = {
      id_usuario: parseInt(usuario.id_usuario), // Garante que é um número
      email: usuario.email,
      nome: usuario.nome
    };
    console.log('Sessão definida no login:', req.session.user); // Log para depuração

    return res.status(200).json({ success: true, message: 'Login bem-sucedido', user: req.session.user });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

const criarUsuario = async (req, res) => {
  const { email, senha, nome } = req.body;
  try {
    const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    const novoUsuario = await usuarioModel.criarUsuario(email, senha, nome);

    req.session.user = {
      id_usuario: parseInt(novoUsuario.id_usuario), // Garante que é um número
      email: novoUsuario.email,
      nome: novoUsuario.nome
    };
    console.log('Sessão definida na criação:', req.session.user); // Log para depuração

    return res.status(201).json({ success: true, message: 'Conta criada com sucesso' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    return res.status(500).json({ success: false, message: 'Erro ao criar usuário: ' + err.message });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const usuario = await usuarioModel.atualizarUsuario(req.params.id, nome, email);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.deletarUsuario(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id_usuario) {
      return res.status(401).json({ error: 'Não autorizado' });
    }
    res.status(200).json({ id_usuario: req.session.user.id_usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  buscarUsuarioPorId,
  criarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario,
  getSession
};