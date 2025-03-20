import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGameGenres } from "../../services/GameService";
import "./SubHeader.css";

const MAX_VISIBLE_GENRES = 6;

interface SubHeaderProps {
  isHidden: boolean; // ✅ Prop pour cacher le SubHeader
}

const SubHeader: React.FC<SubHeaderProps> = ({ isHidden }) => {
  const [genres, setGenres] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await getGameGenres();
      setGenres(fetchedGenres);
      setIsLoading(false);
    };
    fetchGenres();
  }, []);

  return (
    <nav className={`sub-header ${isHidden ? "hidden" : ""}`}>
      <div className="sub-header__wrapper">
        {isLoading ? (
          <div className="sub-header__loader">Loading...</div>
        ) : (
          <>
            {genres.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.slug}`}
                className="sub-header__link"
              >
                {genre.name}
              </Link>
            ))}
            {genres.length > MAX_VISIBLE_GENRES && (
              <div className="sub-header__dropdown-container">
                <button className="sub-header__button">
                  More categories ⬇️
                </button>
                <div className="sub-header__dropdown">
                  {genres.slice(MAX_VISIBLE_GENRES).map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.slug}`}
                      className="sub-header__dropdown-link"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default SubHeader;
