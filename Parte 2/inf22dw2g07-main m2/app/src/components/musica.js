import React, { useState, useEffect } from 'react';
import "../App.css";


const TabelaMusicas = () => {
  const [musicas, setMusicas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState('');
  const [idartista, setidartista] = useState('');
  const [datadelancamento, setdatadelancamento] = useState('');
  const [idalbum, setidalbum] = useState('');
  const [genero, setGenero] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3009/musica`, {withCredentials:true})
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
    fetch(`http://${window.location.hostname}:3009/musica/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          const musicasAtualizados = musicas.filter(
            (musica) => musica.id !== id
          );
          setMusicas(musicasAtualizados);
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

    fetch(`http://${window.location.hostname}:3009/musica/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Atualizar a lista de musicass após a atualização
        const musicasAtualizados = musicas.map((musica) => {
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
        setMusicas(musicasAtualizados);
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

  const handleAdd = () => {
    setShowModal(true);// Mostrar o modal para adicionar um nova musica
  };

  const handleCloseModal = () => {
    setShowModal(false); // Fechar o modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const novaMusica = {
      nome,
      genero,
      idalbum,
      idartista,
      datadelancamento
    };
  
    fetch(`http://${window.location.hostname}:3009/musica`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaMusica),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMusicas([...musicas, data]); // Adiciona o nova musica à lista
        setNome('');
        setGenero('');
        setidalbum('');
        setidartista('');
        setdatadelancamento('');
        setShowModal(false); // Fecha o modal após a adição da musica
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
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
            <th>Genero</th>
            <th>idArtista</th>
            <th>idAlbum</th>
            <th>DataDeLançamento</th>
            <th>Ações 
              <button className="submit-button8" onClick={handleAdd}>
                +
              </button></th>
          </tr>
          
        </thead>
        <tbody>
          {musicas.map((musica) => (
            <tr key={musica.id}>
              <td>#{musica.id}</td>
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
                 <>
                 <button
                    className="submit-button5"
                    onClick={() => handleUpdate(musica.id)}
                  >
                    Guardar
                  </button>

                  <button className="submit-button4" onClick={() => setEditingId(null)}>Cancelar</button>
                  </>

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
            
          )
          )}
        </tbody>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total de musicas: {musicas.length}
        </td>
      </table>
      
      <button className="submit-button" onClick={handleAdd} style={{ display: 'none' }}>
              Adicionar Musica
      </button>

      

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Musica</h2>
            <form className="form-musica" onSubmit={handleSubmit}>
              Nome:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)} required
                />
              </label>
              Genero:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={genero}
                  onChange={(event) => setGenero(event.target.value)}  required
                />
              </label>
              IdArtista:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={idartista}
                  onChange={(event) => setidartista(event.target.value)}  required
                />
              </label>
              IdAlbum:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={idalbum}
                  onChange={(event) => setidalbum(event.target.value)}  required
                />
              </label>
              DataDeLançamento:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={datadelancamento}
                  onChange={(event) => setdatadelancamento(event.target.value)}  required
                />
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




function CriarMusica() {
  const [nome, setNome] = useState('');
  const [idartista, setidartista] = useState('');
  const [datadelancamento, setdatadelancamento] = useState('');
  const [idalbum, setidalbum] = useState('');
  const [genero, setGenero] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      nome,
      genero
    };

    fetch('http://localhost:3009/musica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        // Processar a resposta do servidor
        console.log(data);
      })
      .catch(error => {
        // Lidar com erros
        console.error('Ocorreu um erro:', error);
      });
  };

  return (
    <div>
      <h2>Adicionar Musica</h2>
      <form className="form-musica" onSubmit={handleSubmit}>
              Nome:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)} required
                />
              </label>
              Genero:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={genero}
                  onChange={(event) => setGenero(event.target.value)}  required
                />
              </label>
              IdArtista:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={idartista}
                  onChange={(event) => setidartista(event.target.value)}  required
                />
              </label>
              IdAlbum:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={idalbum}
                  onChange={(event) => setidalbum(event.target.value)}  required
                />
              </label>
              DataDeLançamento:
              <label className="label">
                <input
                  className="input-musica"
                  type="text"
                  value={datadelancamento}
                  onChange={(event) => setdatadelancamento(event.target.value)}  required
                />
              </label>
              
        </form>
    </div>

  
  );
}

function ExcluirMusica() {
  const [musicaId, setMusicaId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3009/musica/${musicaId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Exibe a mensagem de sucesso retornada pelo servidor
      } else {
        throw new Error('Erro na resposta da solicitação.');
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  };

  return (
    <div>
      <h2>Remover Musica</h2>
      <form className="form-musica" onSubmit={handleSubmit}>
        <label className='label'>
          ID do Musica:
          <input
            className="input-musica"
            type="text"
            value={musicaId}
            onChange={(event) => setMusicaId(event.target.value)}
          />
        </label>
        <button className="submit-button" type="submit">Excluir</button>
      </form>
    </div>
  );
}

const atualizarMusica = async (id, nome, genero) => {
  try {
    const response = await fetch(`http://localhost:3009/musica/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, genero })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro na resposta da solicitação.');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    throw error;
  }
};

const AtualizarMusicaForm = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idartista, setidartista] = useState('');
  const [datadelancamento, setdatadelancamento] = useState('');
  const [idalbum, setidalbum] = useState('');
  const [genero, setGenero] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se pelo menos um parâmetro foi fornecido
    if (nome.trim() === '' && genero.trim() === '') {
      console.log('Nenhum parâmetro foi fornecido. A musica não será alterado.');
      return;
    }

    // Chamar a função atualizarMusica com os valores fornecidos
    atualizarMusica(id, nome, genero,idartista,idalbum,datadelancamento)
      .then((data) => {
        console.log('Musica atualizada:', data);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao atualizar o musica:', error);
      });
  };

  return (
    <div>
      <h2>Atualizar Musica</h2>
      <form className="form-musica" onSubmit={handleSubmit}>
        <label className="label">
          ID do Musica:
          <input
            className="input-musica"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </label>
        <label className="label">
          Novo Nome:
          <input
            className="input-musica"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>
        <label className="label">
          Novo Genero:
          <input
            className="input-musica"
            type="text"
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
          />
        </label>
        <label className="label">
          Novo IDArtista:
          <input
            className="input-musica"
            type="text"
            value={idartista}
            onChange={(event) => setidartista(event.target.value)}
          />
        </label>
        <label className="label">
          Novo IdAlbum:
          <input
            className="input-musica"
            type="text"
            value={idalbum}
            onChange={(event) => setidalbum(event.target.value)}
          />
        </label>
        <label className="label">
          Nova DataDeLançamento:
          <input
            className="input-musica"
            type="text"
            value={datadelancamento}
            onChange={(event) => setdatadelancamento(event.target.value)}
          />
        </label>






        <button className="submit-button" type="submit">Atualizar</button>
      </form>
    </div>
  );
};


export {TabelaMusicas, CriarMusica, ExcluirMusica, AtualizarMusicaForm};



