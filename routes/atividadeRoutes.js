const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividadeController');

// Listar todas as atividades
router.get('/list', atividadeController.listarAtividades);

// Criar atividade
router.post('/create', atividadeController.criarAtividade);

// Buscar atividade por ID
router.get('/:id', atividadeController.buscarAtividadePorId);

// Atualizar atividade
router.put('/update/:id', atividadeController.atualizarAtividade);

// Deletar atividade
router.delete('/delete/:id', atividadeController.deletarAtividade);

module.exports = router;