import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Contexte Auth

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import WishlistPage from "./pages/WishlistPage";
import GameDetails from "./components/GameDetails/GameDetails";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login"; // Page de connexion
import Register from "./pages/Register"; // Page d'inscription
import Logout from "./pages/Logout"; // Page de déconnexion
import Dashboard from "./pages/Dashboard"; // Page protégée
import EditProfile from "./pages/EditProfile"; // Page protégée

import "./styles/App.css";

// ✅ Gestion dynamique des classes <body> selon la page active
const BodyClassHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.replace("/", "") || "home"; // Ex: "/login" -> "login"
    document.body.className = page;
  }, [location]);

  return null; // Ce composant ne rend rien, il gère juste la classe du <body>
};

// ✅ Composant pour protéger les routes privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initialized } = useAuth();

  if (!initialized) return <p>Loading...</p>; // 🔄 Attendre l'initialisation de Firebase
  return user ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WishlistProvider>
          <SearchProvider>
            <Router>
              <BodyClassHandler />{" "}
              {/* ✅ Ajout du gestionnaire de classe pour le <body> */}
              <Header />
              <Routes>
                {/* Pages publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route path="/wishlist" element={<WishlistPage />} />

                {/* Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />

                {/* Routes protégées */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />

                {/* Page 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ScrollToTop />
              <Footer />
            </Router>
            <SpeedInsights />
          </SearchProvider>
        </WishlistProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
