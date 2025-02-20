import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useGames } from "../hooks/useGames";
import { usePreloadLCP } from "../hooks/usePreloadLCP";

import HeroImage from "../components/HeroImage/HeroImage";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";
import RecommendedGames from "../components/RecommendedGames/RecommendedGames";
import TrendingGames from "../components/TrendingGames/TrendingGames";
import UpcomingReleases from "../components/UpcomingReleases/UpcomingReleases";
import GameSection from "../components/GameSection/GameSection";

import "../styles/heroHeader.css";

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, "");

  usePreloadLCP(); // ✅ Précharge l’image LCP

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <div className="home-container">
      {/* ✅ Section Hero avec Image Optimisée */}
      <section className="hero-header">
        <div className="hero-header__text">
          <h1 className="hero-title">🔥 Discover the Best Games</h1>
          <p className="hero-subtitle">
            Explore the most popular games of the moment
          </p>
        </div>
        <HeroImage />
      </section>

      {/* ✅ Section des jeux à venir */}
      <UpcomingReleases />

      {/* ✅ Hero Banner */}
      <HeroBanner />

      {/* ✅ Sections de jeux */}
      <RecommendedGames />
      <TrendingGames />

      {/* ✅ Liste des jeux */}
      <GameSection
        title="🔥 New and Trending"
        subtitle="Based on player counts and release date"
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
    </div>
  );
};

export default Home;
