const express = require('express');
const router = express.Router();

// Importar controladores
const agendamentoController = require('../controllers/agendamentoController');
const atividadeController = require('../controllers/atividadeController');
const usuarioController = require('../controllers/usuarioController');

// Middleware para verificar se o usuário está logado
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Endpoint para verificar sessão
router.get('/api/user/session', (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).json({ id_usuario: req.session.userId });
  } else {
    res.status(401).json({ error: 'Usuário não está logado' });
  }
});

// Endpoint para categorias fixas
router.get('/api/categoria', isAuthenticated, (req, res) => {
  res.status(200).json([
    { nome: 'Física' },
    { nome: 'Criativa' },
    { nome: 'Mental' }
  ]);
});

// --- Rotas de API ---
router.get('/api/agendamento/list', isAuthenticated, agendamentoController.listarAgendamentos);
router.get('/api/agendamento/:id', isAuthenticated, agendamentoController.buscarAgendamentoPorId);
router.get('/api/agendamento/dia', isAuthenticated, agendamentoController.buscarAgendamentosPorDia);
router.post('/api/agendamento/create', isAuthenticated, agendamentoController.criarAgendamento);
router.put('/api/agendamento/update/:id', isAuthenticated, agendamentoController.atualizarAgendamento);
router.delete('/api/agendamento/delete/:id', isAuthenticated, agendamentoController.deletarAgendamento);

router.get('/api/atividade/list', isAuthenticated, atividadeController.listarAtividades);
router.get('/api/atividade/:id', isAuthenticated, atividadeController.buscarAtividadePorId);
router.get('/api/atividade/categoria', isAuthenticated, atividadeController.buscarAtividadesPorCategoria);
router.get('/api/atividade/usuario', isAuthenticated, atividadeController.buscarAtividadesPorUsuario);
router.post('/api/atividade/create', isAuthenticated, atividadeController.criarAtividade);
router.put('/api/atividade/update/:id', isAuthenticated, atividadeController.atualizarAtividade);
router.delete('/api/atividade/delete/:id', isAuthenticated, atividadeController.deletarAtividade);

router.get('/api/usuario/list', isAuthenticated, usuarioController.listarUsuarios);
router.get('/api/usuario/:id', isAuthenticated, usuarioController.buscarUsuarioPorId);
router.post('/api/usuario/create', usuarioController.criarUsuario);
router.post('/api/usuario/login', usuarioController.loginUsuario);
router.put('/api/usuario/update/:id', isAuthenticated, usuarioController.atualizarUsuario);
router.delete('/api/usuario/delete/:id', isAuthenticated, usuarioController.deletarUsuario);

// --- Rotas para as Views ---
router.get('/', (req, res) => {
  console.log('Acessando a página: welcome');
  res.render('pages/welcome');
});

router.get('/register', (req, res) => {
  console.log('Acessando a página: register');
  res.render('pages/register');
});

router.get('/login', (req, res) => {
  console.log('Acessando a página: login');
  res.render('pages/login');
});

router.get('/myroutine', isAuthenticated, (req, res) => {
  console.log('Acessando a página: myroutine');
  res.render('pages/myroutine');
});

router.get('/agenda', isAuthenticated, (req, res) => {
  console.log('Acessando a página: agenda');
  res.render('pages/agenda');
});

router.get('/atividades', isAuthenticated, (req, res) => {
  console.log('Acessando a página: atividades');
  res.render('pages/atividades');
});

router.get('/calendario', isAuthenticated, (req, res) => {
  console.log('Acessando a página: calendario');
  res.render('pages/calendario');
});

module.exports = router;