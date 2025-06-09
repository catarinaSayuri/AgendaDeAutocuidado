const express = require('express');
const router = express.Router();

// Importar controladores
const agendamentoController = require('../controllers/agendamentoController');
const atividadeController = require('../controllers/atividadeController');
const usuarioController = require('../controllers/usuarioController');

const isAuthenticated = (req, res, next) => {
  console.log('Sessão no middleware:', req.session.user); // Log para depuração
  if (!req.session.user || !req.session.user.id_usuario || isNaN(parseInt(req.session.user.id_usuario))) {
    return res.status(401).json({ error: 'Não autorizado: ID de usuário inválido' });
  }
  next();
};

// --- Rotas de API ---

// Endpoint para verificar sessão
router.get('/api/user/session', (req, res) => {
    if (req.session.user && req.session.user.id_usuario) {
        res.status(200).json({ id_usuario: parseInt(req.session.user.id_usuario) });
    } else {
        res.status(401).json({ error: 'Usuário não está logado' });
    }
});

// Rotas de Atividade - ORDEM CRÍTICA: Rotas específicas ANTES das genéricas com :id
router.get('/api/atividade/usuario', isAuthenticated, atividadeController.buscarAtividadesPorUsuario); // Lista todas as atividades do usuário logado
router.get('/api/atividade/categoria', isAuthenticated, atividadeController.buscarAtividadesPorCategoria); // Lista atividades por categoria
router.get('/api/atividade/categorias', isAuthenticated, atividadeController.buscarCategoriasUnicasAtividades); // Busca categorias dinâmicas do usuário
router.post('/api/atividade', isAuthenticated, atividadeController.criarAtividade); // Criar atividade
router.post('/api/atividade/favorite', isAuthenticated, atividadeController.atualizarFavorito); // Atualizar favorito
router.get('/api/atividade/:id', isAuthenticated, atividadeController.buscarAtividadePorId); // Busca uma atividade específica por ID
router.put('/api/atividade/:id', isAuthenticated, atividadeController.atualizarAtividade); // Atualiza atividade por ID
router.delete('/api/atividade/:id', isAuthenticated, atividadeController.deletarAtividade); // Deleta atividade por ID

// Rotas de Agendamento
router.get('/api/agendamentos', isAuthenticated, agendamentoController.listarAgendamentos);
router.get('/api/agendamentos/dia', isAuthenticated, agendamentoController.buscarAgendamentosPorDia);
router.post('/api/agendamento', isAuthenticated, agendamentoController.criarAgendamento);
router.get('/api/agendamento/:id', isAuthenticated, agendamentoController.buscarAgendamentoPorId);
router.put('/api/agendamento/:id', isAuthenticated, agendamentoController.atualizarAgendamento);
router.delete('/api/agendamento/:id', isAuthenticated, agendamentoController.deletarAgendamento);

// Rotas de Usuário
router.post('/api/usuario/login', usuarioController.loginUsuario);
router.post('/api/usuario/create', usuarioController.criarUsuario);
router.get('/api/usuario/:id', isAuthenticated, usuarioController.buscarUsuarioPorId);
router.put('/api/usuario/:id', isAuthenticated, usuarioController.atualizarUsuario);
router.delete('/api/usuario/:id', isAuthenticated, usuarioController.deletarUsuario);

// --- Rotas para as Views (HTML) ---
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