import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { getUserProfile } = await import("../services/AuthService"); // ✅ Import dynamique
          const profileData = await getUserProfile(user.uid);
          if (profileData) {
            setDisplayName(profileData.displayName);
          }
        } catch (error) {
          console.error("Erreur lors du chargement du profil :", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) {
      alert("Utilisateur non connecté !");
      return;
    }

    try {
      const { loadFirebase } = await import("../firebaseConfig"); // ✅ Import dynamique
      const { updateDoc, doc } = await import("firebase/firestore"); // ✅ Import dynamique Firestore
      const firestore = await loadFirebase();

      const userRef = doc(firestore.db, "users", user.uid);
      await updateDoc(userRef, { displayName });

      alert("Profil mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Échec de la mise à jour du profil.");
    }
  };

  return (
    <div>
      <h2>Modifier le profil</h2>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={handleUpdate}>Sauvegarder</button>
    </div>
  );
};

export default EditProfile;
