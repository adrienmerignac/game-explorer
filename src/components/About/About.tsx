import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>À propos de Game Explorer 🎮</h1>

      <p>
        <strong>Game Explorer</strong> est une application web qui permet de
        découvrir des jeux vidéo, d’explorer les tendances et de créer ta propre
        wishlist.
      </p>

      <p>
        Le projet est développé avec <strong>React</strong> +{" "}
        <strong>Vite</strong>, en utilisant l’API publique de{" "}
        <a
          href="https://api.rawg.io/docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          RAWG
        </a>
        .
      </p>

      <p>
        Il est conçu en <strong>mobile-first</strong> avec un design responsive
        et accessible.
      </p>

      <p>
        Ce projet est open-source et fait avec ❤️. Tu peux retrouver le code ici
        :
        <br />
        <a
          href="https://github.com/adrienmerignac/game-explorer"
          target="_blank"
          rel="noopener noreferrer"
        >
          👉 Voir le repo GitHub
        </a>
      </p>
    </div>
  );
};

export default About;
