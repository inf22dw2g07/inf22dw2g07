import React, { useState, useEffect } from 'react';
import "../App.css";

const TabelaArtistas = () => {
  const [artistas, setArtistas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [pais, setpais] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control the modal 
  
  useEffect(() => {
    obterArtistas();
  }, []);

  const obterArtistas = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/artista`, { withCredentials: true });
      if (response.ok) {
        const data = await response.json();
        setArtistas(data);
      } else {
        throw new Error('Erro na resposta.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const excluirArtista = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/artista/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedArtistas = artistas.filter((artista) => artista.id !== id);
        setArtistas(updatedArtistas);
      } else {
        throw new Error('Erro ao excluir o artista.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const atualizarArtista = async (id) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3009/artista/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome,pais }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedArtistas = artistas.map((artista) => {
          if (artista.id === id) {
            return {
              ...artista,
              nome: data.nome,
              pais: data.pais,
            };
          }
          return artista;
        });
        setArtistas(updatedArtistas);
        setEditingId(null);
        setNome('');
        setpais('');
      } else {
        throw new Error('Erro ao atualizar o artista.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  const editarArtista = (id, nome, pais) => {
    setEditingId(id);
    setNome(nome);
    setpais(pais);
  };

  
  const handleAdd = () => {
    setShowModal(true); // Show the modal to add a new artista
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newArtista = {
      nome: nome,
      pais: pais,
    };

  fetch(`http://${window.location.hostname}:3009/artista`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newArtista),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding the artista.');
      }
    })
    .then((data) => {
      console.log(data);
      setArtistas([...artistas, data]);
      setNome('');
      setpais('');
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
            <th>País </th>
            <th>Ações <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
        </thead>
        <tbody>
          {artistas.map((artista) => (
            <tr key={artista.id}>
              <td>#{artista.id}</td>
              <td>
                {editingId === artista.id ? (
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                ) : (
                  artista.nome
                )}
              </td>
              <td>
                {editingId === artista.id ? (
                  <input type="text" value={pais} onChange={(e) => setpais(e.target.value)} />
                ) : (
                  artista.pais
                )}
              </td>
              <td>
                {editingId === artista.id ? (
                  <>
                    <button className="submit-button5" onClick={() => atualizarArtista(artista.id)}>Guardar</button>
                    <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="submit-button5" onClick={() => editarArtista(artista.id, artista.nome, artista.pais)}>Editar</button>
                    <button  className="submit-button4" onClick={() => excluirArtista(artista.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de artistas: {artistas.length}
        </td>
      </table>
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Artista
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Artista</h2>
            <form className="form-musica" onSubmit={handleSubmit}>
              Nome:
              <label className="label">
                <input className="input-musica" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </label>
              Pais:
              <label className="label">
              <input className="input-musica" type="text" id="pais" value={pais} onChange={(e) => setpais(e.target.value)} required />
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


export default TabelaArtistas;
