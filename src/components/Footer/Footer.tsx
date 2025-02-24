import "../../styles/footer.css"; // Assurez-vous d'ajouter ce fichier CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo et Nom du Projet */}
        <div className="footer-logo">
          <h2>Game Explorer</h2>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Liens de navigation */}
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/popular">Popular Games</a>
            </li>
            <li>
              <a href="/upcoming">Upcoming</a>
            </li>
            <li>
              <a href="/wishlist">Wishlist</a>
            </li>
          </ul>
        </nav>

        {/* Réseaux sociaux */}
        <div className="footer-socials">
          <p>Follow us :</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">Discord</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
