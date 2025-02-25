import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getUserProfile } from "../services/AuthService";

// ✅ Interface pour structurer les données utilisateur Firestore
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  wishlist: string[];
}

// ✅ Interface du contexte utilisateur
export interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // ✅ Ajout de l'état pour suivre Firebase

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profileData = await getUserProfile(firebaseUser.uid);

        if (profileData) {
          setUserData({
            uid: firebaseUser.uid,
            email: profileData.email,
            displayName: profileData.displayName || "Utilisateur",
            createdAt:
              profileData.createdAt && "seconds" in profileData.createdAt
                ? new Date((profileData.createdAt.seconds as number) * 1000)
                : new Date(),
            wishlist: Array.isArray(profileData.wishlist)
              ? profileData.wishlist
              : [],
          });
        }
      } else {
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
      setInitialized(true); // ✅ Indique que Firebase a bien chargé l'utilisateur
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
