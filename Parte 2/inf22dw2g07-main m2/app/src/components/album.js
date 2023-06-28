import React, { useState, useEffect } from 'react';
import "../App.css";


const TabelaAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [idartista, setidartista] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal 
  
  useEffect(() => {
    obterAlbum();
  }, []);

  const obterAlbum = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/album`, { withCredentials: true });
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      } else {
        throw new Error('Erro na resposta.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const excluirAlbum = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/album/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
      } else {
        throw new Error('Erro ao excluir o album.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const atualizarAlbum = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/album/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome,idartista }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedAlbums = albums.map((album) => {
          if (album.id === id) {
            return {
              ...album,
              nome: data.nome,
              idartista: data.idartista,
            };
          }
          return album;
        });
        setAlbums(updatedAlbums);
        setEditingId(null);
        setNome('');
        setidartista('');
      } else {
        throw new Error('Erro ao atualizar o album.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const editarAlbum = (id, nome, idartista) => {
    setEditingId(id);
    setNome(nome);
    setidartista(idartista);
  };

  
  const handleAdd = () => {
    setShowModal(true); // Show the modal to add a new album
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newAlbum = {
      nome: nome,
      idartista: idartista,
    };

  fetch(`http://${window.location.hostname}:3009/album`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAlbum),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding the album.');
      }
    })
    .then((data) => {
      console.log(data);
      setAlbums([...albums, data]);
      setNome('');
      setidartista('');
      setShowModal(false); // Close the modal after submitting
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
};

  return (
    <div>
      <table className="tabela-musicas">
        <thead>
          <tr>
          </tr>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>IdArtista </th>
            <th>Ações <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>#{album.id}</td>
              <td>
                {editingId === album.id ? (
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                ) : (
                  album.nome
                )}
              </td>
              <td>
                {editingId === album.id ? (
                  <input type="text" value={idartista} onChange={(e) => setidartista(e.target.value)} />
                ) : (
                  album.idartista
                )}
              </td>
              <td>
                {editingId === album.id ? (
                  <>
                    <button className="submit-button5" onClick={() => atualizarAlbum(album.id)}>Guardar</button>
                    <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="submit-button5" onClick={() => editarAlbum(album.id,album.nome, album.idartista)}>Editar</button>
                    <button  className="submit-button4" onClick={() => excluirAlbum(album.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de albums: {albums.length}
        </td>
      </table>
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Album
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Album</h2>
            <form className="form-musica" onSubmit={handleSubmit}>
              Nome:
              <label className="label">
                <input className="input-musica" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </label>
              IdArtista:
              <label className="label">
              <input className="input-musica" type="text" id="idartista" value={idartista} onChange={(e) => setidartista(e.target.value)} required />
              </label>
              <>
              <td>
                <button className="submit-button5" type="submit">
                  Adicionar
                </button>
                <button className="submit-button4" onClick={handleCloseModal}>
                Fechar
                </button>
              </td>
              </>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};


export default TabelaAlbums;
