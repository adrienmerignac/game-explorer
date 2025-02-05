import React, { useState, useEffect } from 'react';
import { fetchGames, Game, GamesResponse } from './GameService';
import './App.css'; // Assurez-vous de créer ce fichier CSS pour l'importer.

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 

  const pageSize = 10;

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      const data: GamesResponse = await fetchGames(page, pageSize);
      setGames(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
      setLoading(false);
    };

    getGames();
  }, [page]);

  if (loading) {
    return <div className="loading">Chargement des jeux...</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Bibliothèque de jeux vidéo</h1>
      <div className="games-container">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} className="game-image" />
            <div className="game-info">
              <h2 className="game-title">{game.name}</h2>
              <p className="game-release">{game.released}</p>
              <p className="game-rating">Note : {game.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1} 
          className="pagination-btn"
        >
          Précédent
        </button>
        <span className="page-info">Page {page} sur {totalPages}</span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page === totalPages} 
          className="pagination-btn"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default App;
