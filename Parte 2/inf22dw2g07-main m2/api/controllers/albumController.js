const Album = require('../models/album');

// Função para criar um album
async function criarAlbum(req, res) {
  try {
    const { nome,idartista } = req.body;
    const album = await Album.create({ nome,idartista });
    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar album.' });
  }
}

// Função para obter todos os albums
async function obterAlbums(req, res) {
  try {
    const albums = await Album.findAll();
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter albums.' });
  }
}

// Função para obter um album específico por ID
async function obterAlbumPorId(req, res) {
  const idalbum = req.params.id;
  try {
    const album = await Album.findByPk(idalbum);
    if (!album) {
      return res.status(404).json({ message: 'Album não encontrado.' });
    }
    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter album.' });
  }
}

// Função para atualizar um album específico por ID
async function atualizarAlbum(req, res) {
  const albumId = req.params.id;
  const { nome,idartista } = req.body;
  try {
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album não encontrado.' });
    }
    album.nome = nome
    album.idartista = idartista;
   ;
    await album.save();
    res.json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o album.' });
  }
}

// Função para excluir um album específico por ID
async function excluirAlbum(req, res) {
  const albumId = req.params.id;
  try {
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Album não encontrado.' });
    }
    await album.destroy();
    res.json({ message: 'Album excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir album.' });
  }
}

module.exports = {
  criarAlbum,
  obterAlbums,
  obterAlbumPorId,
  atualizarAlbum,
  excluirAlbum
};
