// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { logoutUser, getUserProfile } from "../services/AuthService";

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
          const profileData = await getUserProfile(firebaseUser.uid);
          setUserData(profileData);
          localStorage.setItem("userToken", JSON.stringify(firebaseUser));
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
