import React, { useRef, useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import Sidebar from "../SideBar/SideBar";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import HeaderActions from "../HeaderActions/HeaderActions";
import SubHeader from "../SubHeader/SubHeader";

const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // ✅ Vérifie bien que le scroll fonctionne
      setIsScrolled(window.scrollY > 75);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="page__header">
        <div className="header__wrapper">
          <div className="header__left">
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
          </div>

          {!isMobile && (
            <div className="header__center">
              <SearchBar searchRef={searchRef} />
            </div>
          )}

          <div className="header__right">
            <HeaderActions />
          </div>
        </div>

        {isMobile && (
          <div className="header__mobile-search">
            <SearchBar searchRef={searchRef} />
          </div>
        )}
      </header>

      {/* ✅ Vérification que isHidden est bien passé */}
      {!isMobile && <SubHeader isHidden={isScrolled} />}
    </>
  );
};

export default Header;
