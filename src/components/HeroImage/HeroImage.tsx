// HeroImage.tsx
import React from "react";
import homePageImageAVIF from "../../assets/images/home-page-image.avif";
import homePageImageWebP from "../../assets/images/home-page-image.webp";
import homePageImageMobileAVIF from "../../assets/images/home-page-image-mobile.avif";
import homePageImageMobileWebP from "../../assets/images/home-page-image-mobile.webp";
import "../../styles/heroHeader.css";

const HeroImage: React.FC = () => {
  return (
    <div className="hero-header__image">
      <picture className="lcp-wrapper">
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
          fetchPriority="high"
          decoding="auto" // ou tu peux même le supprimer complètement
          width="800"
          height="600"
        />
      </picture>
    </div>
  );
};

export default HeroImage;
