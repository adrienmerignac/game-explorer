import { useState } from "react";
import { loginUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/buttons.css";
import "../styles/pageLayout.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Erreur de connexion : " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page__wrapper">
      {/* ✅ Ajout du wrapper principal qui pousse le footer en bas */}
      <div className="main-container">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              autoComplete="current-password"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Connection in progress..." : "Log in"}
            </button>
          </form>
          <p className="login-text">
            No account yet?{" "}
            <a href="/register" className="login-link">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
