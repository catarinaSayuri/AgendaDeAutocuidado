const express = require('express');
const router = express.Router();
const path = require('path');
const agendamentoController = require('../controllers/agendamentoController');

// Listar todos os agendamentos
router.get('/list', agendamentoController.listarAgendamentos);

// Criar agendamento
router.post('/create', agendamentoController.criarAgendamento);

// Buscar agendamento por ID
router.get('/:id', agendamentoController.buscarAgendamentoPorId);

// Atualizar agendamento
router.put('/update/:id', agendamentoController.atualizarAgendamento);

// Deletar agendamento
router.delete('/delete/:id', agendamentoController.deletarAgendamento);

// Renderizar a página principal
router.get('/', async (req, res) => {
  try {
    const agendamentos = await agendamentoController.listarAgendamentos();
    const usuarios = await require('../controllers/usuarioController').listarUsuarios();
    const atividades = await require('../controllers/atividadeController').listarAtividades();
    res.render(path.join(__dirname, '../views/pages/page1'), {
      pageTitle: 'Painel de Administração',
      usuarios,
      atividades,
      agendamentos
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar a página');
  }
});

module.exports = router;