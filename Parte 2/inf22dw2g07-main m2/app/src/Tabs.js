import React from 'react';

import { useState } from "react";
import "./App.css";
import {TabelaMusicas} from './components/musica';
import TabelaAlbums from './components/album';
import TabelaArtistas from './components/artista';


function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Musicas
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Albums
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Artistas
        </button>
        
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <TabelaMusicas />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <TabelaAlbums />
      
          
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
         
          <TabelaArtistas />   
          
        </div>
       
      </div>
    </div>
  );
}

export default Tabs;
