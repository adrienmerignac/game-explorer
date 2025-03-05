import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { UserData } from "../context/AuthContext";

// ✅ Interface pour le retour utilisateur
interface AuthResponse {
  user: User;
}

// ✅ Fonction pour gérer les erreurs Firebase
const handleFirebaseError = (error: unknown, message: string): never => {
  console.error(`❌ ${message} :`, error);
  throw new Error(message);
};

// ✅ Chargement dynamique de Firebase uniquement quand nécessaire
const getFirebaseAuth = async () => {
  try {
    const { loadFirebase } = await import("../firebaseConfig");
    const { auth } = await loadFirebase();
    return auth;
  } catch (error) {
    return handleFirebaseError(
      error,
      "Erreur lors du chargement de Firebase Auth"
    );
  }
};

// ✅ Chargement dynamique de Firestore uniquement si nécessaire
export const getFirestoreInstance = async () => {
  try {
    const { loadFirebase } = await import("../firebaseConfig");
    const { db } = await loadFirebase();
    const firestore = await import("firebase/firestore");
    return { db, ...firestore };
  } catch (error) {
    return handleFirebaseError(error, "Erreur lors du chargement de Firestore");
  }
};

// ✅ Ajoute un utilisateur dans Firestore et `localStorage`
const addUserToFirestore = async (user: User) => {
  try {
    const { db, doc, getDoc, setDoc } = await getFirestoreInstance();
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Utilisateur",
        createdAt: new Date(),
        wishlist: [],
      };
      await setDoc(userRef, userData);

      // ✅ Stocker dans `localStorage`
      localStorage.setItem("userToken", "true");
    }
  } catch (error) {
    return handleFirebaseError(
      error,
      "Erreur lors de l'ajout de l'utilisateur à Firestore"
    );
  }
};

// ✅ Inscription avec Email/Password
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<AuthResponse> => {
  try {
    const auth = await getFirebaseAuth();
    const { createUserWithEmailAndPassword } = await import("firebase/auth");

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // ✅ Met à jour le profil Firebase Auth
    await updateProfile(user, { displayName });

    // ✅ Ajoute l'utilisateur dans Firestore
    await addUserToFirestore(user);

    // ✅ Récupérer l'utilisateur depuis Firestore
    const userProfile = await getUserProfile(user.uid);

    if (userProfile) {
      localStorage.setItem("userAvatar", userProfile.avatar || ""); // ✅ Stocke l'avatar
    }

    localStorage.setItem("userToken", "true"); // ✅ Stocke l'utilisateur
    window.dispatchEvent(new Event("storage")); // ✅ Notifie les composants

    return { user };
  } catch (error) {
    return handleFirebaseError(
      error,
      "Impossible de créer un compte. Vérifiez vos informations."
    );
  }
};

// ✅ Connexion avec Email/Password
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const auth = await getFirebaseAuth();
    const { signInWithEmailAndPassword } = await import("firebase/auth");

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // ✅ Récupérer les infos de l'utilisateur depuis Firestore
    const userProfile = await getUserProfile(user.uid);

    if (userProfile) {
      localStorage.setItem("userAvatar", userProfile.avatar || ""); // ✅ Stocke l'avatar
    }

    localStorage.setItem("userToken", "true"); // ✅ Stocke l'utilisateur
    window.dispatchEvent(new Event("storage")); // ✅ Force la mise à jour en temps réel

    return { user };
  } catch (error) {
    return handleFirebaseError(error, "Email ou mot de passe incorrect.");
  }
};

// ✅ Déconnexion
export const logoutUser = async (): Promise<void> => {
  try {
    const auth = await getFirebaseAuth();
    const { signOut } = await import("firebase/auth");

    await signOut(auth);
    localStorage.removeItem("userToken"); // ✅ Supprime la session utilisateur
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    return handleFirebaseError(error, "Erreur lors de la déconnexion.");
  }
};

// ✅ Récupération du profil utilisateur Firestore
export const getUserProfile = async (uid: string): Promise<UserData | null> => {
  try {
    const { db, doc, getDoc } = await getFirestoreInstance();
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      const userData: UserData = {
        avatar: data.avatar || "",
        badges: data.badges || [],
        createdAt:
          data.createdAt && "seconds" in data.createdAt
            ? new Date(data.createdAt.seconds * 1000)
            : new Date(),
        displayName: data.displayName || "Utilisateur",
        email: data.email,
        level: data.level || 1,
        uid: data.uid,
        wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
        xp: data.xp || 0,
      };

      localStorage.setItem("userAvatar", data.avatar || ""); // ✅ Évite de recharger Firestore inutilement
      localStorage.setItem("userToken", "true");

      return userData;
    }
    return null;
  } catch (error) {
    return handleFirebaseError(
      error,
      "Erreur lors de la récupération du profil utilisateur."
    );
  }
};

// ✅ Connexion avec Google
export const loginWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const auth = await getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    await addUserToFirestore(user);

    localStorage.setItem("userToken", "true");

    return { user };
  } catch (error) {
    return handleFirebaseError(
      error,
      "Impossible de se connecter avec Google."
    );
  }
};

// ✅ Upload Avatar vers Cloudinary et mise à jour Firestore
export const uploadUserAvatarCloudinary = async (
  user: User,
  file: File
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "game-explorer");
    formData.append("folder", "avatars");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dztvn0fon/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Upload failed on Cloudinary.");
    }

    const avatarURL = data.secure_url;
    localStorage.setItem("userAvatar", avatarURL);
    window.dispatchEvent(new Event("storage"));

    await updateProfile(user, { photoURL: avatarURL });

    const { db, doc, updateDoc } = await getFirestoreInstance();
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { avatar: avatarURL });

    return avatarURL;
  } catch (error) {
    console.error("Erreur lors de l'upload de l'avatar :", error);
    throw new Error("Impossible de mettre à jour l'avatar.");
  }
};
