import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedQuery: string; // 🔥 Ajout d'un état pour la version debounce de la recherche
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 🔥 Applique un délai avant d'assigner la valeur à debouncedQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 🔥 Attendre 300ms avant de valider la recherche

    return () => clearTimeout(handler); // Nettoyer le timeout si searchQuery change avant la fin
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, debouncedQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
