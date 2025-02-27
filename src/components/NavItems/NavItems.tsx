import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGameGenres } from "../../services/GameService"; // 🔥 Import du service

const MAX_VISIBLE_GENRES = 6; // Nombre max de genres affichés avant "See more"

const NavItems: React.FC = () => {
  const [genres, setGenres] = useState<
    { id: number; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await getGameGenres();
      setGenres(fetchedGenres);
    };
    fetchGenres();
  }, []);

  return (
    <ul className="sidebar__list">
      <li>
        <Link to="/">🏠 Accueil</Link>
      </li>
      {/* ✅ Section des genres */}
      {genres.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
        <Link
          key={genre.id}
          to={`/genre/${genre.slug}`}
          className="sub-header__link"
        >
          {genre.name}
        </Link>
      ))}
    </ul>
  );
};

export default NavItems;
