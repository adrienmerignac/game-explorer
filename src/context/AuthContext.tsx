// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";

export interface UserData {
  avatar?: string;
  badges: string[];
  createdAt: Date;
  displayName: string;
  email: string;
  level: number;
  uid: string;
  wishlist: string[];
  xp: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  loading: boolean;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const { loadFirebase } = await import("../firebaseConfig");
      const { auth } = await loadFirebase();
      const { onAuthStateChanged } = await import("firebase/auth");

      onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          // 🔥 Lazy-load AuthService au moment exact où on en a besoin
          const { getUserProfile } = await import("../services/AuthService");
          const profileData = await getUserProfile(firebaseUser.uid);
          setUserData(profileData);
          localStorage.setItem("userToken", "true");
        } else {
          localStorage.removeItem("userToken");
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("🔥 Erreur lors de l'initialisation Firebase :", error);
      setLoading(false);
    }
  };

  const logout = async () => {
    const { logoutUser } = await import("../services/AuthService");
    await logoutUser();
    setUser(null);
    setUserData(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        loading,
        initializeAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
