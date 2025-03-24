// Home.tsx
import React, { useState, useEffect, Suspense } from "react";
import { useSearch } from "../context/SearchContext";
import { useGames } from "../hooks/useGames";
import { usePreloadLCP } from "../hooks/usePreloadLCP";

import HeroImage from "../components/HeroImage/HeroImage";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import GameList from "../components/GameList/GameList";

const RecommendedGames = React.lazy(
  () => import("../components/RecommendedGames/RecommendedGames")
);
const TrendingGames = React.lazy(
  () => import("../components/TrendingGames/TrendingGames")
);
const UpcomingReleases = React.lazy(
  () => import("../components/UpcomingReleases/UpcomingReleases")
);
const GameSection = React.lazy(
  () => import("../components/GameSection/GameSection")
);

import "../styles/heroHeader.css";

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, "");

  usePreloadLCP();

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <div className="home-container">
      <section className="hero-header">
        <div className="hero-header__text">
          <h1 className="hero-title">🔥 Discover the Best Games</h1>
          <p className="hero-subtitle">
            Explore the most popular games of the moment
          </p>
        </div>
        <HeroImage />
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <UpcomingReleases />
        <HeroBanner />
        <RecommendedGames />
        <TrendingGames />
        <GameSection
          title="🔥 NEW AND TRENDING"
          subtitle="Based on metacritic score and user reviews"
        >
          {loading && page === 1 ? (
            <div className="loading">Loading games...</div>
          ) : (
            <>
              <GameList games={games} />
              {hasMore && (
                <div className="load-more-container">
                  <button
                    className="load-more-btn"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </GameSection>
      </Suspense>
    </div>
  );
};

export default Home;
