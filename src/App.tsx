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
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import WishlistPage from "./pages/WishlistPage";
import GameDetails from "./components/GameDetails/GameDetails";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound";

import Loader from "./components/Loader/Loader"; // ✅ Import du Loader

import "./styles/App.css";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

/**
 * ✅ Gestion dynamique des classes <body> selon la page active
 */
const BodyClassHandler = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.className = "";

    const isHome = location.pathname === "/";
    if (!isHome) {
      document.body.classList.add("not-home");
    }

    const getUserTokenFromLocalStorage = localStorage.getItem("userToken");
    if (getUserTokenFromLocalStorage) {
      document.body.classList.add("user-logged-in");
    }
  }, [location]);

  return null;
};

/**
 * ✅ Composant pour protéger les routes privées
 */
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
              <Route path="/genre/:slug" element={<GenrePage />} />

              {/* Authentification */}
              <Route
                path="/login"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loader />}>
                      {" "}
                      <Login />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loader />}>
                      {" "}
                      <Register />
                    </Suspense>
                  </AuthProvider>
                }
              />
              <Route
                path="/logout"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loader />}>
                      {" "}
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
                      <Suspense fallback={<Loader />}>
                        {" "}
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
                      <Suspense fallback={<Loader />}>
                        {" "}
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
