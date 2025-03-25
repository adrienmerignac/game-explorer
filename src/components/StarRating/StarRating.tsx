import { useState } from "react";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill={filled ? "#ffc107" : "none"}
    stroke="#ffc107"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M10 15l-5.878 3.09L5.64 12.18.763 7.91l6.181-.898L10 1l3.056 6.012 6.181.898-4.877 4.269 1.518 5.91z"
    />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hover !== null ? hover >= star : rating >= star;
        return (
          <div
            key={star}
            className="star"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            <StarIcon filled={isFilled} />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
