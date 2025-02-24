import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import WishlistPage from "./pages/WishlistPage";
import GameDetails from "./components/GameDetails/GameDetails";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NotFound from "./pages/NotFound";

import "./styles/App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <SearchProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <Footer />
          </Router>
          <SpeedInsights />
        </SearchProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
};

export default App;
