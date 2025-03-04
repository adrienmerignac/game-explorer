import { useEffect, useReducer, useCallback, useState } from "react";
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

  if (state.loading) return <Loader />;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      <GameHeader title={state.game?.name || "Game Details"} />
      {state.game && (
        <div className="game-details-container">
          <WishlistButton
            isInWishlist={isInWishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            game={state.game}
          />
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
