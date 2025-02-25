import { useState } from "react";
import { loginUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/buttons.css";

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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Connection in progress..." : "Log in"}
          </button>
        </form>
        <p className="login-text">
          No account yet ?{" "}
          <a href="/register" className="login-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
