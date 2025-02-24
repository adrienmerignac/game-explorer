import React, { useEffect, useReducer, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../../services/GameService";
import DOMPurify from "dompurify"; // ✅ Sécurisation du HTML
import { initialState, reducer } from "./GameDetails.const";
import { useGameTracking } from "../../hooks/useGameTracking"; // ✅ Ajout du hook de suivi
import "../../styles/gameDetails.css";

import pcIcon from "../../assets/images/icons/pc.svg";
import xboxIcon from "../../assets/images/icons/xbox.svg";
import nintendoIcon from "../../assets/images/icons/switch.svg";
import playstationIcon from "../../assets/images/icons/playstation.svg";
import macIcon from "../../assets/images/icons/mac.svg";

const platformIcons: Record<string, string> = {
  pc: pcIcon,
  xbox: xboxIcon,
  nintendo: nintendoIcon,
  playstation: playstationIcon,
  mac: macIcon,
};

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const fetchGameDetails = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await getGameDetails(id!);
      dispatch({ type: "SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: `Impossible de charger les détails du jeu. ${err}`,
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchGameDetails();
    }
  }, [fetchGameDetails, id]);

  const { game } = state;

  // 🔥 Suivi du genre du jeu visité
  useGameTracking(game?.genres?.[0]?.slug || null);

  if (state.loading) return <div>Chargement des détails du jeu...</div>;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      {game && (
        <>
          {/* 🎨 Image principale */}
          <div className="page__art">
            <div className="art-wrapper">
              <div className="art art_colored" />
            </div>
          </div>

          <div className="game-details">
            {/* 🧭 Breadcrumb */}
            <nav className="breadcrumb">
              <Link to="/">Accueil</Link> / <span>{game.name}</span>
            </nav>

            {/* 🎮 Infos rapides */}
            <div className="game__head-meta">
              <div className="game__meta-date">
                Date de sortie : {formatDate(game.released)}
              </div>

              {/* ⏳ Temps de jeu moyen */}
              <div className="game__meta-playtime">
                Temps de jeu moyen : {game.playtime || "N/A"} heures
              </div>

              {/* 🕹️ Plateformes */}
              <div className="platforms platforms_big">
                {Array.from(
                  new Map(
                    game.parent_platforms?.map((parent_platforms) => {
                      const slug = parent_platforms.platform.slug;
                      const family = slug.includes("playstation")
                        ? "playstation"
                        : slug.includes("xbox")
                        ? "xbox"
                        : slug.includes("nintendo")
                        ? "nintendo"
                        : slug.includes("pc")
                        ? "pc"
                        : slug.includes("linux")
                        ? "linux"
                        : slug.includes("mac")
                        ? "mac"
                        : slug;
                      return [family, slug];
                    })
                  ).values()
                ).map(
                  (slug) =>
                    slug && (
                      <div key={slug} className="platforms__platform">
                        <img
                          src={platformIcons[slug]}
                          alt={slug}
                          height="40"
                          width="40"
                        />
                      </div>
                    )
                )}
              </div>

              {game.esrb_rating && (
                <div className="game__meta-esrb">
                  Classification : {game.esrb_rating.name}
                </div>
              )}
            </div>

            <h2 className="game__detail-title">{game.name}</h2>

            {/* 📝 Description */}
            <div
              className="game-description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(game.description),
              }}
            />

            {/* ⭐ Notes détaillées */}
            <div className="ratings">
              {game.ratings &&
                Object.entries(game.ratings).map(
                  ([key, value]: [
                    string,
                    { title: string; percent: number }
                  ]) => (
                    <div key={key} className="rating">
                      <span>
                        {value.title.charAt(0).toUpperCase() +
                          value.title.slice(1)}
                      </span>
                      <div className="rating-bar">
                        <div
                          className="rating-fill"
                          style={{ width: `${value.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
            </div>

            {/* 🎥 Screenshots */}
            {game.background_image_additional && (
              <div className="screenshots">
                <img src={game.background_image_additional} alt="Screenshot" />
              </div>
            )}

            {/* 🔗 Liens externes */}
            <div className="external-links">
              {game.website && (
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Site officiel
                </a>
              )}
              {game.metacritic_url && (
                <a
                  href={game.metacritic_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Metacritic
                </a>
              )}
              {game.reddit_url && (
                <a
                  href={game.reddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reddit
                </a>
              )}
              {game.twitch_count > 0 && (
                <a
                  href={`https://www.twitch.tv/directory/game/${game.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitch
                </a>
              )}

              {game.youtube_count > 0 && (
                <a
                  href={`https://www.youtube.com/results?search_query=${game.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              )}
            </div>

            {/* 📊 Metacritic par plateforme */}
            {game.metacritic_platforms &&
              game.metacritic_platforms.length > 0 && (
                <div className="metacritic-scores">
                  {game.metacritic_platforms.map((meta) => (
                    <a
                      key={meta.platform.name} // ✅ Ajout de la clé unique
                      href={meta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="metacritic-score">
                        <span className="platform-name">
                          {meta.platform.name}
                        </span>
                        <span className="score">{meta.metascore}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
          </div>
        </>
      )}
    </>
  );
};

export default GameDetails;
