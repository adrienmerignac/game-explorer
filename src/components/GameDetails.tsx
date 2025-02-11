import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/GameService/GameService";
import { Game } from "../services/GameService/GameService.types";
import sanitizeHtml from "sanitize-html";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getGameDetails(id!);
        setGame(data);
      } catch (err) {
        setError(`Impossible de charger les détails du jeu. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameDetails();
    }
  }, [id]);

  if (loading) return <div>Chargement des détails du jeu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {game && (
        <>
          {/* Image en arrière-plan */}
          <div className="page__art">
            <div className="art-wrapper">
              <div
                className="art art_colored"
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), 
                  linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), 
                  url(${game.background_image})`,
                }}
              />
            </div>
          </div>

          {/* Conteneur principal */}
          <div className="game-details">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <Link to="/">Accueil</Link> / <span>{game.name}</span>
            </nav>

            {/* Meta informations */}
            <div className="game__head-meta">
              <div className="game__meta-date">
                Date de sortie : {game.released}
              </div>
              <div className="platforms platforms_big">
                {game.platforms?.map((platform) => (
                  <div
                    key={platform.platform.id}
                    className={`platforms__platform platforms__platform_big platforms__platform_${platform.platform.slug}`}
                  />
                ))}
              </div>
              <div className="game__meta-playtime">
                Temps de jeu moyen : {game.playtime || "N/A"} heures
              </div>
            </div>

            {/* Contenu du jeu */}
            <h2>{game.name}</h2>
            <div
              className="game-description"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(game.description),
              }}
            />
            <p>Note : {game.rating}</p>
            <p>Metacritic : {game.metacritic}</p>
          </div>
        </>
      )}
    </>
  );
};

export default GameDetails;
