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
import { GameDetailsProvider } from "./context/GameDetailsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./components/About/About";
import Loader from "./components/Loader/Loader";

import "./styles/App.css";
import "./styles/toastOverrides.css";
import ChallengePage from "./pages/ChallengePage";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const GameDetails = lazy(() => import("./components/GameDetails/GameDetails"));

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

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return children ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  // ✅ MutationObserver bien placé ici
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const toasts = document.querySelectorAll(".Toastify__toast");
      const containers = document.querySelectorAll(
        ".Toastify__toast-container"
      );

      toasts.forEach((toast) => {
        toast.classList.add("custom-toast");
      });

      containers.forEach((container) => {
        container.classList.add("custom-toast-container");
      });

      document.querySelectorAll(".Toastify__close-button").forEach((btn) => {
        btn.remove();
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <WishlistProvider>
        <SearchProvider>
          <Router>
            <BodyClassHandler />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genre/:slug" element={<GenrePage />} />
              <Route path="/about" element={<About />} />

              <Route
                path="/challenges"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loader />}>
                      <ChallengePage />
                    </Suspense>
                  </AuthProvider>
                }
              />

              <Route
                path="/games/:id"
                element={
                  <GameDetailsProvider>
                    <Suspense fallback={<Loader />}>
                      <GameDetails />
                    </Suspense>
                  </GameDetailsProvider>
                }
              />

              <Route
                path="/login"
                element={
                  <AuthProvider>
                    <Suspense fallback={<Loader />}>
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
                      <Logout />
                    </Suspense>
                  </AuthProvider>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <AuthProvider>
                    <PrivateRoute>
                      <Suspense fallback={<Loader />}>
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
                        <EditProfile />
                      </Suspense>
                    </PrivateRoute>
                  </AuthProvider>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <Footer />
          </Router>
        </SearchProvider>
      </WishlistProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
    </ThemeProvider>
  );
};

export default App;
