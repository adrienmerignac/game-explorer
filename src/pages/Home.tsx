import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";
import RecommendedGames from "../components/RecommendedGames/RecommendedGames";
import TrendingGames from "../components/TrendingGames/TrendingGames";
import "../styles/heroHeader.css";
import "lazysizes";

// ✅ Importation des images AVIF, WebP et placeholders ultra-légers
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";
import homePageImagePlaceholder from "../assets/images/home-page-placeholder.avif"; // 📌 Placeholder ultra-léger

import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";
import homePageImageMobilePlaceholder from "../assets/images/home-page-image-mobile-placeholder.avif"; // 📌 Placeholder mobile ultra-léger

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch();
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, "");

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  // ✅ Préchargement conditionnel de l’image LCP pour mobile et desktop
  useEffect(() => {
    if (document.querySelector('link[rel="preload"][as="image"]')) return; // ✅ Empêche les doublons

    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.type = "image/avif";
    link.href = mobileQuery.matches
      ? homePageImageMobileAVIF
      : homePageImageAVIF; // ✅ Charge l’image adaptée à l’écran
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

        {/* ✅ Image LCP optimisée avec placeholder */}
        <div className="hero-header__image">
          <picture>
            {/* 🔥 Version Mobile */}
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
            <source
              srcSet={homePageImageMobilePlaceholder}
              type="image/avif"
              media="(max-width: 768px)"
            />

            {/* 🔥 Version Desktop */}
            <source srcSet={homePageImageAVIF} type="image/avif" />
            <source srcSet={homePageImageWebP} type="image/webp" />
            <source srcSet={homePageImagePlaceholder} type="image/avif" />

            {/* 📌 Affichage immédiat du placeholder pour éviter le flash blanc */}
            <img
              src={homePageImagePlaceholder} // ✅ Placeholder instantané
              alt="Featured Game"
              className="lcp-image lazyload"
              loading="eager"
              decoding="async"
              width="1200" // ✅ Largeur correcte pour CLS
              height="500"
              fetchPriority="high" // ✅ Correction TS
            />
          </picture>

          {/* ✅ Fallback pour navigateurs sans JS */}
          <noscript>
            <img
              src={homePageImagePlaceholder}
              alt="Featured Game"
              className="lcp-image"
              width="1200"
              height="500"
            />
          </noscript>
        </div>
      </section>

      {/* ✅ 2️⃣ HeroBanner plus bas */}
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
