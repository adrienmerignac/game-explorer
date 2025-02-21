// usePreloadLCP.ts
import { useEffect } from "react";
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";
import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";

export const usePreloadLCP = () => {
  useEffect(() => {
    const existingPreload = document.querySelector(
      'link[rel="preload"][as="image"]'
    );
    if (existingPreload) return;

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const avifImage = mobileQuery.matches
      ? homePageImageMobileAVIF
      : homePageImageAVIF;
    const webpImage = mobileQuery.matches
      ? homePageImageMobileWebP
      : homePageImageWebP;

    const preloadLinkAVIF = document.createElement("link");
    preloadLinkAVIF.rel = "preload";
    preloadLinkAVIF.as = "image";
    preloadLinkAVIF.href = avifImage;
    preloadLinkAVIF.setAttribute("fetchpriority", "high");
    preloadLinkAVIF.type = "image/avif";
    document.head.appendChild(preloadLinkAVIF);

    const preloadLinkWebP = document.createElement("link");
    preloadLinkWebP.rel = "preload";
    preloadLinkWebP.as = "image";
    preloadLinkWebP.href = webpImage;
    preloadLinkWebP.setAttribute("fetchpriority", "high");
    preloadLinkWebP.type = "image/webp";
    document.head.appendChild(preloadLinkWebP);

    // ✅ Crée une balise img pour forcer le navigateur à charger l’image immédiatement
    const img = new Image();
    img.src = avifImage;
    img.decode().catch(() => {}); // Évite les erreurs de décodage
  }, []);
};
