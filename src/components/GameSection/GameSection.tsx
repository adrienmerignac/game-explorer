import React from "react";

interface GameSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const GameSection: React.FC<GameSectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="games-section">
      <div className="home__discover">
        <h2 className="title">{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

export default GameSection;
