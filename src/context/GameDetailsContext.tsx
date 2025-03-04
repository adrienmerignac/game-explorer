import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Firestore } from "firebase/firestore";

interface GameDetailsContextType {
  db: Firestore | null;
}

const GameDetailsContext = createContext<GameDetailsContextType | undefined>(
  undefined
);

export const GameDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const loadFirebase = async () => {
      const { loadFirebase } = await import("../firebaseConfig");
      const { db } = await loadFirebase();
      setDb(db);
    };

    loadFirebase();
  }, []);

  return (
    <GameDetailsContext.Provider value={{ db }}>
      {children}
    </GameDetailsContext.Provider>
  );
};

export const useGameDetails = (): GameDetailsContextType => {
  const context = useContext(GameDetailsContext);
  if (!context) {
    throw new Error(
      "useGameDetails doit être utilisé à l'intérieur de GameDetailsProvider"
    );
  }
  return context;
};
