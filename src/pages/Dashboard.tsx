import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/AuthService";
import { logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/buttons.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getUserProfile(user.uid);
          setUserData(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil :", error);
        }
      }

      setLoading(false); // Assure-toi que le chargement s'arrête
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="main-container">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : userData ? (
          <div>
            <p>
              <strong>Email :</strong> {userData.email}
            </p>
            <p>
              <strong>Name :</strong> {userData.displayName}
            </p>
            <p>
              <strong>Registration :</strong>{" "}
              {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}
            </p>
            <h2>Wishlist ({userData.wishlist.length} jeux)</h2>

            <button className="btn-primary" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <p className="error-text">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
