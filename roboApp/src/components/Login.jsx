import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterLogin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); // Set loading state
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Inloggningen lyckades");
        navigate("/");
      } else {
        alert(data.message || "Login failed, please try again."); // More detailed message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <div className="regLoginContainer">
        <div className="regLoginForm">
          <div>
            <label htmlFor="username">Användarnamn: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password">Lösenord: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Logga in"} 
          </button>
          <p id="regLoginLink">
            Har du inget konto?
            <Link to={"/register"}> Skapa ett konto</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
