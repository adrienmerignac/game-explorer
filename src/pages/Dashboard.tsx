import { useAuth } from "../context/AuthContext"; // ✅ Vérifier l'importation
import { uploadUserAvatarCloudinary } from "../services/AuthService";
import { logoutUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/buttons.css";
import "../styles/pageLayout.css";
import { BADGES } from "../features/gamification/badgeSystem";

const Dashboard = () => {
  const { user, userData, setUserData, loading } = useAuth();
  const navigate = useNavigate();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !user || !userData) return; // ✅ Vérification de userData

    const file = e.target.files[0];
    try {
      const avatarURL = await uploadUserAvatarCloudinary(user, file);
      localStorage.setItem("userAvatar", avatarURL);
      window.dispatchEvent(new Event("storage"));

      // ✅ Correction : On met à jour setUserData avec un nouvel objet
      setUserData({ ...userData, avatar: avatarURL });
    } catch (error) {
      console.error("Erreur lors de l'upload de l'avatar :", error);
    }
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
              <p>Niveau : {userData.level}</p>
              <p>XP : {userData.xp}</p>

              <h3>Badges</h3>
              <div className="badges">
                {userData.badges.length > 0 ? (
                  userData.badges.map((badge) => (
                    <div key={badge} className="badge">
                      <p>{BADGES[badge as keyof typeof BADGES].name}</p>
                      <small>
                        {BADGES[badge as keyof typeof BADGES].description}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No badge</p>
                )}
              </div>
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
              <h2>Wishlist ({userData.wishlist.length} games)</h2>

              <div className="avatar-container">
                <img
                  src={userData.avatar}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar-upload" className="upload-label">
                  Change avatar
                </label>
              </div>

              <button className="btn-primary" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <p>User not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
