import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Vérifier l'importation
import { uploadUserAvatarCloudinary } from "../services/AuthService";
import { logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/buttons.css";
import "../styles/pageLayout.css";

const Dashboard = () => {
  const { user, userData, setUserData, loading } = useAuth();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user || !userData) return; // ✅ Vérification de userData

    const file = e.target.files[0];
    setUploading(true);
    try {
      const avatarURL = await uploadUserAvatarCloudinary(user, file);
      localStorage.setItem("userAvatar", avatarURL);
      window.dispatchEvent(new Event("storage"));

      // ✅ Correction : On met à jour setUserData avec un nouvel objet
      setUserData({ ...userData, avatar: avatarURL });
    } catch (error) {
      console.error("Erreur lors de l'upload de l'avatar :", error);
    }
    setUploading(false);
  };

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
            <p>Chargement...</p>
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

              <div className="avatar-container">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                ) : (
                  <p>No avatar uploaded.</p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
                {uploading && <p>Uploading...</p>}
              </div>

              <button className="btn-primary" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <p>Utilisateur introuvable.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
