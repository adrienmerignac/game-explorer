import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Initialisation de Firebase uniquement si nécessaire
const app = initializeApp(firebaseConfig);

/** 🔥 Lazy loading des services Firebase **/

// Authentification
export const loadAuth = async () => {
  const { getAuth } = await import("firebase/auth");
  return getAuth(app);
};

// Firestore (Base de données)
export const loadFirestore = async () => {
  const {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentSingleTabManager,
  } = await import("firebase/firestore");

  try {
    // ✅ Vérifier si Firestore est déjà initialisé
    return getFirestore(app);
  } catch (error) {
    console.warn(
      "⚠️ Firestore n'était pas encore initialisé. Initialisation en cours..."
    );
    return initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({}),
      }),
    });
  }
};

export { app };
