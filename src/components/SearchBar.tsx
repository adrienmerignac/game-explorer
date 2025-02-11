import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un jeu..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
