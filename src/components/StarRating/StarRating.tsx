import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`star ${
            hover !== null
              ? hover >= star
                ? "active"
                : ""
              : rating >= star
              ? "active"
              : ""
          }`}
          onClick={() => onRate(star)} // ✅ Met à jour la note au clic
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
    </div>
  );
};

export default StarRating;
