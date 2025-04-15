import { useState, useEffect } from "react";

export const useIsMobile = (maxWidth = 480) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= maxWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
};
