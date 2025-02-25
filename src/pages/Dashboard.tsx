import { useState, useEffect } from "react";
import { useAuth, UserData } from "../context/AuthContext";
import { getUserProfile, logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/buttons.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getUserProfile(user.uid);
          if (data) setUserData(data);
        } catch (error) {
          console.error("❌ Erreur lors de la récupération du profil :", error);
        }
      }
      setLoading(false);
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
          <div className="user-info">
            <p>
              <strong>Email :</strong> {userData.email}
            </p>
            <p>
              <strong>Name :</strong> {userData.displayName}
            </p>
            <p>
              <strong>Registration :</strong>
              {userData.createdAt.toLocaleDateString()}
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
