const Artista = require('../models/artista');

// Função para criar um artista
async function criarArtista(req, res) {
  try {
    const { nome,pais } = req.body;
    const artista = await Artista.create({ nome,pais });
    res.status(201).json(artista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar artista.' });
  }
}

// Função para obter todos os artistas
async function obterArtistas(req, res) {
  try {
    const artistas = await Artista.findAll();
    res.json(artistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter artistas.' });
  }
}

// Função para obter um artista específico por ID
async function obterArtistaPorId(req, res) {
  const idartista = req.params.id;
  try {
    const artista = await Artista.findByPk(idartista);
    if (!artista) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    res.json(artista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter artista.' });
  }
}

// Função para atualizar um artista específico por ID
async function atualizarArtista(req, res) {
  const artistaId = req.params.id;
  const { nome,pais } = req.body;
  try {
    const artista = await Artista.findByPk(artistaId);
    if (!artista) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    artista.nome = nome
    artista.pais = pais;
   ;
    await artista.save();
    res.json(artista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o artista.' });
  }
}

// Função para excluir um artista específico por ID
async function excluirArtista(req, res) {
  const artistaId = req.params.id;
  try {
    const artista = await Artista.findByPk(artistaId);
    if (!artista) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    await artista.destroy();
    res.json({ message: 'Artista excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir artista.' });
  }
}

module.exports = {
  criarArtista,
  obterArtistas,
  obterArtistaPorId,
  atualizarArtista,
  excluirArtista
};
