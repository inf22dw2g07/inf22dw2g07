const express = require('express');
const albumController = require('../controllers/albumController');

const router = express.Router();

// Rota para criar um camião
router.post('/album', albumController.criarAlbum);

// Rota para obter todos os camiões
router.get('/album', albumController.obterAlbums);

// Rota para obter um camião específico por ID
router.get('/album/:id', albumController.obterAlbumPorId);

// Rota para atualizar um camião específico por ID
router.put('/album/:id', albumController.atualizarAlbum);

// Rota para excluir um camião específico por ID
router.delete('/album/:id', albumController.excluirAlbum);

module.exports = router;
