import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col footer-logo">
          <h2 className="footer-title">🎮 Game Explorer</h2>
          <p className="footer-copy">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="footer-col footer-nav">
          <ul>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/challenges">Challenges</a>
            </li>
            <li>
              <a href="/about">À propos</a>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-social">
          <p className="footer-social-label">Suivez-nous</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              🐦 Twitter
            </a>
            <a href="#" aria-label="Discord">
              💬 Discord
            </a>
            <a href="#" aria-label="Youtube">
              📺 YouTube
            </a>
          </div>
        </div>
      </div>

      <p className="footer-note">Fait avec ❤️ en React & RAWG API</p>
    </footer>
  );
};

export default Footer;
