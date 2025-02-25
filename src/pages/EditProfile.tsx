import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/AuthService";
import { updateDoc, doc } from "firebase/firestore";
import { loadFirestore } from "../firebaseConfig";

const EditProfile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserProfile(user.uid);
        if (data) setDisplayName(data.displayName);
      }
    };
    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      const firestore = await loadFirestore();

      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, { displayName });
      alert("Profil mis à jour !");
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
