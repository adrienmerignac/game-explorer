import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { loadAuth, loadFirestore } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../context/AuthContext";

// Interface pour le retour utilisateur
interface AuthResponse {
  user: User;
}

// 🔥 Fonction générique pour gérer les erreurs Firebase
const handleFirebaseError = (error: unknown, message: string): never => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  ) {
    console.error(
      `❌ ${message} :`,
      (error as any).code,
      (error as any).message
    );
  } else {
    console.error(`❌ ${message} : Erreur inconnue`, error);
  }
  throw new Error(message);
};

// 🔥 Ajoute un utilisateur dans Firestore s'il n'existe pas
const addUserToFirestore = async (user: User) => {
  try {
    const db = await loadFirestore();
    const { doc, getDoc, setDoc } = await import("firebase/firestore");

    if (!user.uid) {
      console.warn("⚠️ L'utilisateur n'a pas d'UID valide.");
      return;
    }

    console.log("🔍 Vérification de l'utilisateur dans Firestore...");

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log("➕ Ajout de l'utilisateur à Firestore...");
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Utilisateur",
        createdAt: new Date(),
        wishlist: [],
      });
      console.log("✅ Utilisateur ajouté à Firestore !");
    } else {
      console.log("ℹ️ L'utilisateur existe déjà dans Firestore.");
    }
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'ajout de l'utilisateur à Firestore :",
      error
    );
  }
};

// 🔥 Inscription avec Email/Password
export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const auth = await loadAuth(); // Call the loadAuth function to get the Auth object
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addUserToFirestore(user);
    return { user };
  } catch (error: unknown) {
    return handleFirebaseError(
      error,
      "Impossible de créer un compte. Vérifiez vos informations."
    );
  }
};

// 🔥 Connexion avec Email/Password
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const auth = await loadAuth(); // Call the loadAuth function to get the Auth object
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user };
  } catch (error: unknown) {
    return handleFirebaseError(error, "Email ou mot de passe incorrect.");
  }
};

// 🔥 Déconnexion
export const logoutUser = async (): Promise<void> => {
  try {
    const auth = await loadAuth(); // Call the loadAuth function to get the Auth object
    await signOut(auth); // Pass the Auth object to the signOut function
  } catch (error) {
    console.error("❌ Erreur lors de la déconnexion :", error);
  }
};

// 🔥 Récupération du profil utilisateur Firestore
export const getUserProfile = async (uid: string): Promise<UserData | null> => {
  try {
    const firestore = await loadFirestore();
    const userRef = doc(firestore, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || "Utilisateur",
        createdAt:
          data.createdAt && "seconds" in data.createdAt
            ? new Date(data.createdAt.seconds * 1000)
            : new Date(), // ✅ Gestion sécurisée du timestamp
        wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
      };
    }
    return null;
  } catch (error) {
    console.error("❌ Erreur Firestore :", error);
    return null;
  }
};

// 🔥 Connexion avec Google
export const loginWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const auth = await loadAuth(); // Call the loadAuth function to get the Auth object
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider); // Pass the Auth object to the signInWithPopup function
    await addUserToFirestore(user);
    return { user };
  } catch (error: unknown) {
    return handleFirebaseError(
      error,
      "Impossible de se connecter avec Google."
    );
  }
};
