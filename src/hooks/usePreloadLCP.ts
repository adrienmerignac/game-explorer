import { useEffect } from "react";
import homePageImageAVIF from "../assets/images/home-page-image.avif";
import homePageImageMobileAVIF from "../assets/images/home-page-image-mobile.avif";

export const usePreloadLCP = () => {
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
};
