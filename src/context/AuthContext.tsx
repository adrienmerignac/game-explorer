import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "firebase/auth";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  wishlist: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  loading: boolean;
  initializeAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth(); // Lancement automatique dès le montage
  }, []);

  const initializeAuth = async () => {
    try {
      const { loadFirebase } = await import("../firebaseConfig");
      const { auth } = await loadFirebase();
      const { onAuthStateChanged } = await import("firebase/auth");

      onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          const { getUserProfile } = await import("../services/AuthService");
          const profileData = await getUserProfile(firebaseUser.uid);
          setUserData(profileData);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("🔥 Erreur lors de l'initialisation Firebase :", error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, userData, setUserData, loading, initializeAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
