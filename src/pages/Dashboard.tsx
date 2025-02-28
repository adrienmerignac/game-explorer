import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/buttons.css";
import "../styles/pageLayout.css";

const Dashboard = () => {
  const { user, userData, setUserData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user && !userData) {
        try {
          const data = await getUserProfile(user.uid);
          if (data) setUserData(data);
        } catch (error) {
          console.error("❌ Erreur lors de la récupération du profil :", error);
        }
      }
    };

    fetchData();
  }, [user, userData, setUserData]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="page__wrapper">
      {/* ✅ Ajout du wrapper principal qui pousse le footer en bas */}
      <div className="main-container">
        <div className="dashboard-container">
          <h1>Dashboard</h1>

          {loading ? (
            <p className="loading-text">Chargement...</p>
          ) : userData ? (
            <div className="user-info">
              <p>
                <strong>Email :</strong> {userData.email}
              </p>
              <p>
                <strong>Name :</strong> {userData.displayName}
              </p>
              <p>
                <strong>Registration :</strong>{" "}
                {userData.createdAt.toLocaleDateString()}
              </p>
              <h2>Wishlist ({userData.wishlist.length} jeux)</h2>

              <button className="btn-primary" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <p className="error-text">Utilisateur introuvable.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
