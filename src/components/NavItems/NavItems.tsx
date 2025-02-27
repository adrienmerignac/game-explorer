import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGameGenres } from "../../services/GameService";

const MAX_VISIBLE_GENRES = 6; // Nombre max de genres visibles

const NavItems: React.FC = () => {
  const [genres, setGenres] = useState<
    { id: number; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getGameGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des genres :", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <ul className="sidebar__list">
      <li>
        <Link to="/">🏠 Accueil</Link>
      </li>
      <li>
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
      </li>
    </ul>
  );
};

export default NavItems;
