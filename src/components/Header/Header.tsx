import React, { useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import Sidebar from "../SideBar/SideBar";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import HeaderActions from "../HeaderActions/HeaderActions";
import SubHeader from "../SubHeader/SubHeader";

const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  return (
    <>
      <header className="page__header">
        <div className="header__wrapper">
          <div className="header__row">
            <input
              type="checkbox"
              id="sidebar-toggle"
              className="sidebar-toggle-checkbox"
            />
            <label htmlFor="sidebar-toggle" className="sidebar-toggle">
              ☰
            </label>
            <Sidebar />
            <Logo />
            {!isMobile && <SearchBar searchRef={searchRef} />}
            <HeaderActions />
          </div>

          {isMobile && <SearchBar searchRef={searchRef} />}
        </div>
      </header>

      {/* ✅ Utilisation du composant GenreNav */}
      {!isMobile && <SubHeader />}
    </>
  );
};

export default Header;
