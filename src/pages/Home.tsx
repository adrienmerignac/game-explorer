import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";
import RecommendedGames from "../components/RecommendedGames/RecommendedGames";
import TrendingGames from "../components/TrendingGames/TrendingGames";
import "../styles/heroHeader.css";

// ✅ Importation des images AVIF, WebP et fallback
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";

import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, "");

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <div className="home-container">
      {/* ✅ 1️⃣ En-tête ultra-léger optimisé */}
      <section className="hero-header">
        <div className="hero-header__text">
          <h1 className="hero-title">🔥 Discover the Best Games</h1>
          <p className="hero-subtitle">
            Explore the most popular games of the moment
          </p>
        </div>

        {/* ✅ Image rapide en LCP avec optimisation */}
        <div className="hero-header__image">
          <picture>
            {/* 🔥 Version mobile optimisée */}
            <source
              srcSet={homePageImageMobileAVIF}
              type="image/avif"
              media="(max-width: 768px)"
            />
            <source
              srcSet={homePageImageMobileWebP}
              type="image/webp"
              media="(max-width: 768px)"
            />

            {/* ✅ Version desktop optimisée */}
            <source srcSet={homePageImageAVIF} type="image/avif" />
            <source srcSet={homePageImageWebP} type="image/webp" />

            {/* 🔥 Fallback si aucune image n'est compatible */}
            <img
              src={homePageImageWebP}
              alt="Featured Game"
              className="lcp-image"
              loading="eager"
              decoding="async"
              width="100%"
              height="100%"
              fetchPriority="high"
            />
          </picture>
        </div>
      </section>

      {/* ✅ 2️⃣ Le HeroBanner est déplacé plus bas */}
      <HeroBanner />

      {/* ✅ 3️⃣ Sections de jeux */}
      <RecommendedGames />
      <TrendingGames />

      {/* ✅ 4️⃣ Liste des jeux */}
      <div className="games-section">
        <div className="home__discover">
          <h2 className="title">🔥 New and Trending</h2>
          <p className="subtitle">Based on player counts and release date</p>
        </div>

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
      </div>
    </div>
  );
};

export default Home;
