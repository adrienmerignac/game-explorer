import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext"; // 🔥 Vérifie que le chemin est correct
import { WishlistProvider } from "./context/WishlistContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import GameDetails from "./components/GameDetails/GameDetails";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NotFound from "./pages/NotFound"; // ✅ Importe la page NotFound

import "./styles/App.css";

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <SearchProvider>
        {" "}
        {/* 🔥 Le provider englobe toute l'application */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:id" element={<GameDetails />} />

            {/* ✅ Capture toutes les routes inconnues */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <SpeedInsights />
      </SearchProvider>
    </WishlistProvider>
  );
};

export default App;
