// usePreloadLCP.ts
import { useEffect } from "react";
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageWebP from "../assets/images/home-page-image.webp";
import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../assets/images/home-page-image-mobile.webp";

export const usePreloadLCP = () => {
  useEffect(() => {
    if (document.querySelector('link[rel="preload"][as="image"]')) return;

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const avifLink = document.createElement("link");
    const webpLink = document.createElement("link");

    avifLink.rel = "preload";
    avifLink.as = "image";
    avifLink.href = mobileQuery.matches
      ? homePageImageMobileAVIF
      : homePageImageAVIF;
    avifLink.setAttribute("fetchPriority", "high");
    avifLink.type = "image/avif";
    document.head.appendChild(avifLink);

    webpLink.rel = "preload";
    webpLink.as = "image";
    webpLink.href = mobileQuery.matches
      ? homePageImageMobileWebP
      : homePageImageWebP;
    webpLink.setAttribute("fetchPriority", "high");
    webpLink.type = "image/webp";
    document.head.appendChild(webpLink);
  }, []);
};
