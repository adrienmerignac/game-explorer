// usePreloadLCP.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 🏠 Images de la Home
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";
import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";

// 🎮 Images de la Page Genre
import genreImageAVIF from "../assets/images/genre-cover.avif";
import genreImageWebP from "../assets/images/genre-cover.webp";

export const usePreloadLCP = () => {
  const location = useLocation();

  useEffect(() => {
    // Vérifier si AVIF est déjà dans le DOM (évite un double chargement)
    const existingPreloadAVIF = document.querySelector(
      'link[rel="preload"][as="image"][type="image/avif"]'
    );
    const existingPreloadWebP = document.querySelector(
      'link[rel="preload"][as="image"][type="image/webp"]'
    );

    if (existingPreloadAVIF || existingPreloadWebP) return; // ⛔ Empêche les doublons

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    let avifImage, webpImage;

    if (location.pathname === "/") {
      avifImage = mobileQuery.matches
        ? homePageImageMobileAVIF
        : homePageImageAVIF;
      webpImage = mobileQuery.matches
        ? homePageImageMobileWebP
        : homePageImageWebP;
    } else if (location.pathname.startsWith("/genre/")) {
      avifImage = genreImageAVIF;
      webpImage = genreImageWebP;
    } else {
      return;
    }

    // Ajoute AVIF en priorité
    const preloadLinkAVIF = document.createElement("link");
    preloadLinkAVIF.rel = "preload";
    preloadLinkAVIF.as = "image";
    preloadLinkAVIF.href = avifImage;
    preloadLinkAVIF.setAttribute("fetchpriority", "high");
    preloadLinkAVIF.type = "image/avif";
    document.head.appendChild(preloadLinkAVIF);

    preloadLinkAVIF.onerror = () => {
      const preloadLinkWebP = document.createElement("link");
      preloadLinkWebP.rel = "preload";
      preloadLinkWebP.as = "image";
      preloadLinkWebP.href = webpImage;
      preloadLinkWebP.setAttribute("fetchpriority", "high");
      preloadLinkWebP.type = "image/webp";
      document.head.appendChild(preloadLinkWebP);
    };
  }, [location.pathname]);
};
