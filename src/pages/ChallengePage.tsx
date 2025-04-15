import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/challengePage.css";
import metroidvaniaImg from "../assets/images/metroidvania.jpg";

const weeklyChallenge = {
  id: "challenge-001",
  title: "🎯 Discover a Metroidvania!",
  description: "Play a Metroidvania game this week.",
  genre: "metroidvania",
  image: metroidvaniaImg,
  startDate: new Date("2025-04-14"),
  endDate: new Date("2025-04-21"),
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const ChallengePage = () => {
  const { userData, setUserData } = useAuth();
  const [status, setStatus] = useState<
    "not-started" | "in-progress" | "completed"
  >("not-started");

  useEffect(() => {
    if (!userData) return;
    const challenge = userData.challenges?.[weeklyChallenge.id];
    if (challenge) {
      setStatus(challenge.status);
    }
  }, [userData]);

  const handleStart = () => {
    if (!userData) return;
    const updated = {
      ...userData,
      challenges: {
        ...userData.challenges,
        [weeklyChallenge.id]: {
          status: "in-progress" as const,
          startedAt: new Date().toISOString(),
        },
      },
    };
    setUserData(updated);
    setStatus("in-progress");
  };

  const handleComplete = () => {
    if (!userData) return;
    const updated = {
      ...userData,
      challenges: {
        ...userData.challenges,
        [weeklyChallenge.id]: {
          ...userData.challenges?.[weeklyChallenge.id],
          status: "completed" as const,
          completedAt: new Date().toISOString(),
        },
      },
    };
    setUserData(updated);
    setStatus("completed");
  };

  return (
    <div className="challenge-page">
      <div className="challenge-card">
        {status === "completed" && (
          <img
            src={weeklyChallenge.image}
            alt="Illustration du défi"
            className="challenge-image"
          />
        )}
        <div className="challenge-content">
          <h1 className="challenge-title">Challenge of the week</h1>
          <h2 className="challenge-subtitle">{weeklyChallenge.title}</h2>
          <p className="challenge-description">{weeklyChallenge.description}</p>
          <p className="challenge-dates">
            Du {formatDate(weeklyChallenge.startDate)} au{" "}
            {formatDate(weeklyChallenge.endDate)}
          </p>

          {status === "not-started" && (
            <button className="challenge-button" onClick={handleStart}>
              Start the challenge
            </button>
          )}
          {status === "in-progress" && (
            <button className="challenge-button" onClick={handleComplete}>
              Validate the challenge
            </button>
          )}
          {status === "completed" && (
            <p className="challenge-completed">Challenge completed ! 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
