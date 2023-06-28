const express = require('express');
const musicaController = require('../controllers/musicaController');

const router = express.Router();

// Rota para criar um armazem
router.post('/musica', musicaController.criarMusica);

// Rota para obter todos os armazens
router.get('/musica', musicaController.obterMusicas);

// Rota para obter um armazem específico por ID
router.get('/musica/:id', musicaController.obterMusicaPorId);

// Rota para atualizar um armazem específico por ID
router.put('/musica/:id', musicaController.atualizarMusica);

// Rota para excluir um armazem específico por ID
router.delete('/musica/:id', musicaController.excluirMusica);

module.exports = router;
