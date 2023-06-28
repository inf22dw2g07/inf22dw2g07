import React, { useState, useEffect } from 'react';
import "./App.css";



const TabelaMusicas = () => {
const [musicas, setMusicas] = useState([]);
const [editingId, setEditingId] = useState(null);
const [nome, setNome] = useState('');
const [idartista, setidartista] = useState('');
const [datadelancamento, setdatadelancamento] = useState('');
const [idalbum, setidalbum] = useState('');
const [genero, setGenero] = useState('');
  useEffect(() => {
    fetch('http://localhost:3009/musica')
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          throw new Error('Erro na resposta da solicitação.');
        }
      })
      .then((dados) => {
        setMusicas(dados);
      })
      .catch((erro) => {
        console.error('Ocorreu um erro:', erro);
      });
  }, []);

  const excluirMusica = (id) => {
    fetch(`http://localhost:3009/musica/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          const musicasAtualizadas = musicas.filter(
            (musica) => musica.id !== id
          );
          setMusicas(musicasAtualizadas);
        } else {
          throw new Error('Erro ao excluir a musica.');
        }
      })
      .catch((erro) => {
        console.error('Ocorreu um erro:', erro);
      });
  };

  const handleUpdate = (id) => {
    const data = {
      nome,
      genero,
      idartista,
      idalbum,
      datadelancamento
    };

    fetch(`http://localhost:3009/musica/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Atualizar a lista de musicas após a atualização
        const musicasAtualizadas = musicas.map((musica) => {
          if (musica.id === id) {
            return {
              ...musica,
              nome: data.nome,
              genero: data.genero,
              idartista: data.idartista,
              idalbum: data.idalbum,
              datadelancamento: data.datadelancamento
            };
          }
          return musica;
        });
        setMusicass(musicasAtualizadas);
        setEditingId(null);
        setNome('');
        setGenero('');
        setidalbum('');
        setidartista('');
        setdatadelancamento('');
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  };

  const handleEdit = (id, nome, genero,idalbum,idartista,datadelancamento) => {
    setEditingId(id);
    setNome(nome);
    setGenero(genero);
    setidalbum(idalbum);
    setidartista(idartista);
    setdatadelancamento(datadelancamento);
  };

  return (
    <div>
      <h1>Musicas</h1>
      <table className="tabela-musicas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Genero</th>
            <th>idAlbum</th>
            <th>idArtista</th>
            <th>DataDeLançamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musicas.map((musica) => (
            <tr key={musica.id}>
              <td>{musica.id}</td>
              <td>
                {editingId === musica.id ? (
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                ) : (
                  musica.nome
                )}
              </td>
              <td>
                {editingId === musica.id ? (
                  <input
                    type="text"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  />
                ) : (
                  musica.genero
                )}
              </td>
              <td>
                {editingId === musica.id ? (
                  <input
                    type="text"
                    value={idartista}
                    onChange={(e) => setidartista(e.target.value)}
                  />
                ) : (
                  musica.idartista
                )}
              </td>
              <td>
                {editingId === musica.id ? (
                  <input
                    type="text"
                    value={idalbum}
                    onChange={(e) => setidalbum(e.target.value)}
                  />
                ) : (
                  musica.idalbum
                )}
              </td>
              <td>
                {editingId === musica.id ? (
                  <input
                    type="text"
                    value={datadelancamento}
                    onChange={(e) => setdatadelancamento(e.target.value)}
                  />
                ) : (
                  musica.datadelancamento
                )}
              </td>
              <td>
                {editingId === musica.id ? (
                  <button
                    className="submit-button4"
                    onClick={() => handleUpdate(musica.id)}
                  >
                    Confirmar
                  </button>
                ) : (
                  <>
                    <button
                      className="submit-button5"
                      onClick={() =>
                        handleEdit(
                          musica.id,
                          musica.nome,
                          musica.genero,
                          musica.idartista,
                          musica.idalbum,
                          musica.datadelancamento
                        )
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="submit-button4"
                      onClick={() => excluirMusica(musica.id)}
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default TabelaMusicas;