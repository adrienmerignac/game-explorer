import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginButton: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem("userAvatar")
  );
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(
    !!localStorage.getItem("userToken")
  );

  // ✅ Fonction pour mettre à jour l'état en temps réel
  const updateUserState = () => {
    setAvatar(localStorage.getItem("userAvatar"));
    setUserLoggedIn(!!localStorage.getItem("userToken"));
  };

  useEffect(() => {
    updateUserState(); // ✅ Charge les valeurs au premier rendu

    // ✅ Ajoute un écouteur sur `storage`
    const handleStorageChange = () => updateUserState();

    window.addEventListener("storage", handleStorageChange, { passive: true });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="header__item header__user">
      {userLoggedIn ? (
        <Link
          to="/dashboard"
          className="login-icon login-logged-in"
          aria-label="Dashboard"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="user-avatar-header"
            />
          ) : (
            <svg
              className="login-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
              <path
                d="M17 10l-5 5-2.5-2.5-1.5 1.5L12 17l6.5-6.5z"
                className="checkmark"
              />
            </svg>
          )}
        </Link>
      ) : (
        <Link
          to="/login"
          className="login-icon login-logged-out"
          aria-label="Login"
        >
          <svg
            className="login-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
