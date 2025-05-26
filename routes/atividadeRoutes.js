const express = require('express');
const router = express.Router();

const atividadeController = require('../controllers/atividadeController');

// Listar todas atividades

// Criar atividade
router.post('/create', atividadeController.criarAtividade);

// Buscar atividade por id
router.get('/:id', atividadeController.buscarAtividadePorId);

// Atualizar atividade
router.put('/update/:id', atividadeController.atualizarAtividade);

// Deletar atividade
router.delete('/delete/:id', atividadeController.deletarAtividade);

module.exports = router;
