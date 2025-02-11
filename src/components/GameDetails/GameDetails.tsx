import React, { useEffect, useReducer, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../../services/GameService";
import sanitizeHtml from "sanitize-html";
import { initialState, reducer } from "./GameDetails.const";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchGameDetails = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await getGameDetails(id!);
      dispatch({ type: "SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: `Impossible de charger les détails du jeu. ${err}` });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchGameDetails();
    }
  }, [fetchGameDetails, id]);

  if (state.loading) return <div>Chargement des détails du jeu...</div>;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      {state.game && (
        <>
          <div className="page__art">
            <div className="art-wrapper">
              <div
                className="art art_colored"
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), 
                  linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), 
                  url(${state.game.background_image})`,
                }}
              />
            </div>
          </div>

          <div className="game-details">
            <nav className="breadcrumb">
              <Link to="/">Accueil</Link> / <span>{state.game.name}</span>
            </nav>

            <div className="game__head-meta">
              <div className="game__meta-date">Date de sortie : {state.game.released}</div>
              <div className="platforms platforms_big">
                {state.game.platforms?.map((platform) => (
                  <div
                    key={platform.platform.id}
                    className={`platforms__platform platforms__platform_big platforms__platform_${platform.platform.slug}`}
                  />
                ))}
              </div>
              <div className="game__meta-playtime">
                Temps de jeu moyen : {state.game.playtime || "N/A"} heures
              </div>
            </div>

            <h2>{state.game.name}</h2>
            <div
              className="game-description"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(state.game.description) }}
            />
            <p>Note : {state.game.rating}</p>
            <p>Metacritic : {state.game.metacritic}</p>
          </div>
        </>
      )}
    </>
  );
};

export default GameDetails;
