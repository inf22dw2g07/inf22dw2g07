const express = require('express');
const artistaController = require('../controllers/artistaController');

const router = express.Router();

// Rota para criar um camionista
router.post('/artista', artistaController.criarArtista);

// Rota para obter todos os camionistas
router.get('/artista', artistaController.obterArtistas);

// Rota para obter um camionista específico por ID
router.get('/artista/:id', artistaController.obterArtistaPorId);

// Rota para atualizar um camionista específico por ID
router.put('/artista/:id', artistaController.atualizarArtista);

// Rota para excluir um camionista específico por ID
router.delete('/artista/:id', artistaController.excluirArtista);

module.exports = router;
