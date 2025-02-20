import React, { useState, useEffect } from "react";
import "../../styles/optimizedImage.css";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  preload?: boolean;
  loading?: "eager" | "lazy"; // ✅ Ajout de la prop `loading`
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  preload = false,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (preload) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
    }
  }, [preload, src]);

  return (
    <img
      src={src}
      alt={alt}
      className={`optimized-image ${className} ${
        loaded ? "loaded" : "loading"
      }`}
      loading={preload ? "eager" : "lazy"} // ✅ Force le chargement immédiat pour la première image
      onLoad={() => setLoaded(true)}
    />
  );
};

export default OptimizedImage;
