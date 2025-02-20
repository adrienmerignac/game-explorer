import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";
import RecommendedGames from "../components/RecommendedGames/RecommendedGames";
import TrendingGames from "../components/TrendingGames/TrendingGames";
import UpcomingReleases from "../components/UpcomingReleases/UpcomingReleases";

import "../styles/heroHeader.css";

// ✅ Résolution correcte des fichiers pour éviter 404 en production
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";

import homePageImagePlaceholder from "../assets/images/home-page-image-mobile-placeholder.avif";

import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, "");

  // ✅ État pour détecter quand l’image LCP est chargée
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  // ✅ Préchargement correct de l’image LCP sans erreur 404
  useEffect(() => {
    if (document.querySelector('link[rel="preload"][as="image"]')) return;

    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.type = "image/avif";
    link.href = mobileQuery.matches
      ? homePageImageMobileAVIF
      : homePageImageAVIF;
    document.head.appendChild(link);
  }, []);

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

        {/* ✅ Image LCP optimisée avec placeholder géré correctement */}
        <div className="hero-header__image">
          {/* ✅ Placeholder affiché immédiatement */}
          <img
            src={homePageImagePlaceholder}
            alt="Loading placeholder"
            className={`lcp-placeholder ${imageLoaded ? "fade-out" : ""}`}
          />

          {/* ✅ Image LCP avec fade-in */}
          <picture
            className={`lcp-wrapper ${imageLoaded ? "image-loaded" : ""}`}
          >
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

            <source srcSet={homePageImageAVIF} type="image/avif" />
            <source srcSet={homePageImageWebP} type="image/webp" />

            <img
              src={homePageImageWebP}
              alt="Featured Game"
              className="lcp-image"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>
        </div>
      </section>

      {/* ✅ Section des jeux à venir */}
      <UpcomingReleases />

      {/* ✅ 2️⃣ HeroBanner plus bas */}
      <HeroBanner />

      {/* ✅ 3️⃣ Sections de jeux */}
      <RecommendedGames />
      <TrendingGames />

      {/* ✅ 4️⃣ Liste des jeux */}
      <section className="games-section">
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
      </section>
    </div>
  );
};

export default Home;
