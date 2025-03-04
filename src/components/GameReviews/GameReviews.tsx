import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
} from "firebase/firestore";
import StarRating from "../StarRating/StarRating";
import "./GameReviews.css";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  timestamp: number;
}

const GameReviews: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const loadFirebase = async () => {
      const { loadFirebase } = await import("../../firebaseConfig");
      const { db } = await loadFirebase();
      setDb(db);

      const reviewsRef = collection(db, "games", gameId, "reviews");
      const q = query(reviewsRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setReviews(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review))
        );
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | undefined;
    loadFirebase().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [gameId]);

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please rate and write a review !");
      return;
    }

    if (!db) {
      alert("Firebase is not loaded yet. Please wait...");
      return;
    }

    setLoading(true);
    try {
      const reviewRef = collection(db, "games", gameId, "reviews");
      await addDoc(reviewRef, {
        user: "Anonymous User",
        rating,
        comment,
        timestamp: Date.now(),
      });
      setRating(0); // Réinitialisation après envoi
      setComment("");
    } catch (error) {
      console.error("Error sending notice :", error);
    }
    setLoading(false);
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Player reviews</h2>

      {/* Affichage des avis */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p className="review-user">{review.user}</p>
              {/* Affichage des étoiles (non modifiable) */}
              <StarRating rating={review.rating} onRate={() => {}} />
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet.</p>
        )}
      </div>

      {/* Ajout d'un avis */}
      <div className="review-form">
        <h3 className="form-title">Give your opinion</h3>
        {/* StarRating avec un état modifiable */}
        <StarRating rating={rating} onRate={setRating} />
        <textarea
          className="review-textarea"
          rows={3}
          placeholder="Share your opinion..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default GameReviews;
