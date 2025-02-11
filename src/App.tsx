import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GameDetails from "./components/GameDetails/GameDetails";
import "./styles/App.css";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Remis ici pour le Header

  return (
    <BrowserRouter>
      <div className="app">
        {/* ✅ Correction : passage des props à Header */}
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <Routes>
          {/* Passer searchQuery à Home */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
