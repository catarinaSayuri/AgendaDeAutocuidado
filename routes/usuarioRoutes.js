const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Listar todos os usuários
router.get('/list', usuarioController.listarUsuarios);

// Criar usuário
router.post('/create', usuarioController.criarUsuario);

// Buscar usuário por ID
router.get('/:id', usuarioController.buscarUsuarioPorId);

// Atualizar usuário
router.put('/update/:id', usuarioController.atualizarUsuario);

// Deletar usuário
router.delete('/delete/:id', usuarioController.deletarUsuario);

module.exports = router;