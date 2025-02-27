import React, { useEffect, lazy, Suspense } from "react";
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
import { AuthProvider } from "./context/AuthContext"; // ✅ Remis en place

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import WishlistPage from "./pages/WishlistPage";
import GameDetails from "./components/GameDetails/GameDetails";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound";

import "./styles/App.css";

// ✅ Chargement dynamique des pages liées à l'authentification
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

// ✅ Gestion dynamique des classes <body> selon la page active
const BodyClassHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const newClass = location.pathname.replace("/", "") || "home";
    if (document.body.className !== newClass) {
      document.body.className = newClass;
    }

    const getUserTokenFromLocalStorage = localStorage.getItem("userToken");
    if (getUserTokenFromLocalStorage) {
      document.body.classList.add("user-logged-in");
    } else {
      document.body.classList.remove("user-logged-in");
    }
  }, [location]);

  return null;
};

// ✅ Composant pour protéger les routes privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return children ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <SearchProvider>
          <Router>
            <BodyClassHandler />
            <Header />
            <Routes>
              {/* Pages publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="/wishlist" element={<WishlistPage />} />

              {/* Authentification avec Firebase (remis sous AuthProvider) */}
              <Route
                path="/login"
                element={
                  <AuthProvider>
                    <Suspense fallback={<p>Chargement...</p>}>
                      <Login />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthProvider>
                    <Suspense fallback={<p>Chargement...</p>}>
                      <Register />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route
                path="/logout"
                element={
                  <AuthProvider>
                    <Suspense fallback={<p>Déconnexion...</p>}>
                      <Logout />
                    </Suspense>
                  </AuthProvider>
                }
              />

              {/* Routes protégées */}
              <Route
                path="/dashboard"
                element={
                  <AuthProvider>
                    <PrivateRoute>
                      <Suspense
                        fallback={<p>Chargement du tableau de bord...</p>}
                      >
                        <Dashboard />
                      </Suspense>
                    </PrivateRoute>
                  </AuthProvider>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <AuthProvider>
                    <PrivateRoute>
                      <Suspense fallback={<p>Chargement du profil...</p>}>
                        <EditProfile />
                      </Suspense>
                    </PrivateRoute>
                  </AuthProvider>
                }
              />

              {/* Page 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <Footer />
          </Router>
        </SearchProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
};

export default App;
