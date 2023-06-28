const Musica = require('../models/musica');

// Cria um nova musica
const criarMusica = async (req, res) => {
  try {
    const { nome,genero,idartista,datadelancamento,idalbum } = req.body;
    const novaMusica = await Musica.create({ nome,genero,idartista,datadelancamento,idalbum });
    res.status(201).json(novaMusica);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar a musica.' });
  }
};

// Obtém todas as musicas
const obterMusicas = async (req, res) => {
  try {
    const musicas = await Musica.findAll();
    res.status(200).json(musicas);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter as musicas.' });
  }
};

// Obtém uma musica específica por ID
const obterMusicaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const musica = await Musica.findByPk(id);
    if (!musica) {
      res.status(404).json({ error: 'Musica não encontrado.' });
    } else {
      res.status(200).json(musica);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao obter a musica.' });
  }
};


// Atualiza uma musica específica por ID
const atualizarMusica = async (req, res) => {
  const { id } = req.params;
  try {
    const {  nome,genero,idartista,datadelancamento,idalbum } = req.body;
    const musica = await Musica.findByPk(id);
    if (!musica) {
      res.status(404).json({ error: 'Musica não encontrado.' });
    } else {
      musica.nome = nome;
      musica.genero = genero;
      musica.idartista=idartista;
      musica.datadelancamento=datadelancamento;
      musica.idalbum=idalbum
      await musica.save();
      res.status(200).json(musica);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a musica.' });
  }
};

// Exclui uma musica específica por ID
const excluirMusica = async (req, res) => {
  const { id } = req.params;
  try {
    const musica = await Musica.findByPk(id);
    if (!musica) {
      res.status(404).json({ error: 'Musica não encontrada.' });
    } else {
      await musica.destroy();
      res.status(200).json({ message: 'Musica excluída com sucesso.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir a musica.' });
  }
};

module.exports = {
  criarMusica,
  obterMusicas,
  obterMusicaPorId,
  atualizarMusica,
  excluirMusica,
};
