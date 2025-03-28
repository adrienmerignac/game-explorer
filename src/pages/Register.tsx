import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import "../styles/buttons.css";
import "../styles/pageLayout.css";

const Register = () => {
  const { setUser } = useAuth(); // ✅ Récupération de setUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // ✅ Ajout du displayName
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { user } = await registerUser(email, password, displayName);
      setUser(user); // ✅ Met à jour l'état utilisateur
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Erreur d'inscription. Vérifiez vos informations.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page__wrapper">
      {/* ✅ Ajout du wrapper principal qui pousse le footer en bas */}
      <div className="main-container">
        <div className="register-container">
          <h2>Create an account</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
              autoComplete="email"
            />
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="register-input"
              autoComplete="name"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
              autoComplete="new-password"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Registration in progress..." : "Register"}
            </button>
          </form>

          <p className="register-text">
            Already have an account?{" "}
            <a href="/login" className="register-link">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
