import { logoutUser } from "../services/AuthService";

const Logout = () => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;
