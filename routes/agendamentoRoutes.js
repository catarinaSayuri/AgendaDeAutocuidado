const express = require('express');
const router = express.Router();
const path = require('path');

const agendamentoController = require('../controllers/agendamentoController');

// Listar todos agendamentos

// Criar agendamento
router.post('/create', agendamentoController.criarAgendamento);

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/pages/page1'), {
    pageTitle: 'Painel de Administração'
  });
});

// Buscar agendamento por id

// Atualizar agendamento
router.put('/update/:id', agendamentoController.atualizarAgendamento);

// Deletar agendamento
router.delete('/delete/:id', agendamentoController.deletarAgendamento);

module.exports = router;
