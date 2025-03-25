import { useEffect, useReducer, useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGameDetails } from "../../context/GameDetailsContext";
import {
  getGameDetails,
  getGameScreenshots,
  getSimilarGames,
} from "../../services/GameService";
import { initialState, reducer } from "./GameDetails.const";
import { useGameTracking } from "../../hooks/useGameTracking";
import { useWishlist } from "../../context/WishlistContext";
import Loader from "../Loader/Loader";
import GameHeader from "./GameHeader";
import WishlistButton from "./WishlistButton";
import GameReviews from "../GameReviews/GameReviews";
import GameInfo from "./GameInfo";
import ScreenshotsGallery from "./ScreenshotsGallery";
import GameDescription from "./GameDescription";
import PlatformList from "./PlatformList";
import SimilarGames from "./SimilarGames";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { db } = useGameDetails();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [similarGames, setSimilarGames] = useState<
    { id: number; name: string; background_image: string | null }[]
  >([]);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((g) => g.id === Number(id));
  const wishlistRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  const fetchGameDetails = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      if (!id) {
        return;
      }

      const data = await getGameDetails(id);
      dispatch({ type: "SUCCESS", payload: data });
      setScreenshots(await getGameScreenshots(id));
      if (data.genres.length) {
        setSimilarGames(
          (
            await getSimilarGames(
              data.genres.map((g) => g.slug),
              id
            )
          ).results || []
        );
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: `Impossible de charger les détails du jeu. ${err}`,
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchGameDetails();
  }, [fetchGameDetails, id]);
  useGameTracking(state.game?.genres?.[0]?.slug || null);

  useEffect(() => {
    if (!state.game || !wishlistRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("🎯 Wishlist visible:", entry.isIntersecting);
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // optionnel : un peu de marge
      }
    );

    observer.observe(wishlistRef.current);

    return () => {
      if (wishlistRef.current) {
        observer.unobserve(wishlistRef.current);
      }
    };
  }, [state.game]);

  if (state.loading) return <Loader />;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      <GameHeader title={state.game?.name || "Game Details"} />
      {state.game && (
        <div className="game-details-container">
          {/* 👇 Observer pour détecter quand le bouton sort de l'écran */}
          {/* 👇 Bouton Wishlist principal (dans le flow, ne bouge pas) */}
          <div ref={wishlistRef}>
            <WishlistButton
              isInWishlist={isInWishlist}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              game={state.game}
            />
          </div>

          {/* 👇 Bouton sticky (dupliqué) */}
          {isSticky && (
            <div className="wishlist-sticky-wrapper">
              <WishlistButton
                isInWishlist={isInWishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                game={state.game}
              />
            </div>
          )}

          {/* 👉 Le reste du contenu */}
          <GameInfo game={state.game} />
          <ScreenshotsGallery screenshots={screenshots} />
          <GameDescription description={state.game.description} />
          <PlatformList platforms={state.game.parent_platforms} />
          <SimilarGames similarGames={similarGames} />
          {db && <GameReviews gameId={state.game.id.toString()} />}
        </div>
      )}
    </>
  );
};

export default GameDetails;
