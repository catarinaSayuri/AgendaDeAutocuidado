const usuarioModel = require('../models/usuarioModel');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.buscarTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioModel.buscarUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }
  try {
    const usuarioCriado = await usuarioModel.criarUsuario(nome, email, senha);
    req.session.userId = usuarioCriado.id_usuario;
    res.status(201).json({ 
      success: true, 
      message: 'Usuário cadastrado com sucesso!', 
      id_usuario: usuarioCriado.id_usuario 
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.message.includes('duplicate key value violates unique constraint "usuario_email_key"')) {
      res.status(409).json({ success: false, message: 'Este email já está cadastrado.' });
    } else {
      res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await usuarioModel.loginUsuario(email, senha);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    req.session.userId = usuario.id_usuario;
    res.status(200).json({ success: true, id_usuario: usuario.id_usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario
};