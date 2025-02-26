import { User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

const getFirestoreInstance = async () => {
  try {
    const { getFirestore, doc, getDoc, setDoc } = await import(
      "firebase/firestore"
    );
    const { loadFirebase } = await import("../firebaseConfig");
    const { db } = await loadFirebase();
    return { getFirestore, db, doc, getDoc, setDoc };
  } catch (error) {
    return handleFirebaseError(error, "Erreur lors du chargement de Firestore");
  }
};

// ✅ Ajoute un utilisateur dans Firestore s'il n'existe pas
const addUserToFirestore = async (user: User) => {
  try {
    const { db, doc, getDoc, setDoc } = await getFirestoreInstance();
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Utilisateur",
        createdAt: new Date(),
        wishlist: [],
      });
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
  password: string
): Promise<AuthResponse> => {
  try {
    const auth = await getFirebaseAuth();
    const { createUserWithEmailAndPassword } = await import("firebase/auth");

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addUserToFirestore(user);
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
    localStorage.removeItem("user_session"); // ✅ Supprime la session utilisateur
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
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName || "Utilisateur",
        createdAt:
          data.createdAt && "seconds" in data.createdAt
            ? new Date(data.createdAt.seconds * 1000)
            : new Date(),
        wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
      };
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
    return { user };
  } catch (error) {
    return handleFirebaseError(
      error,
      "Impossible de se connecter avec Google."
    );
  }
};
