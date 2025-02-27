import React from "react";
import { useSearch } from "../../context/SearchContext";
import SearchSuggestions from "../Search/SearchSuggestions";

interface SearchBarProps {
  searchRef: React.RefObject<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchRef }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="header__item header__item_search" ref={searchRef}>
      <div className="header__item header__item_center header__search">
        <form
          className="header__search__form"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="header__search__input__area">
            <input
              type="text"
              className="header__search__input"
              role="searchbox"
              placeholder="Search for a game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchSuggestions searchRef={searchRef} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
