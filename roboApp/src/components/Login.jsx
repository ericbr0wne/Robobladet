import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterLogin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/"); // Redirect to the article main page
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <div className="regLoginContainer">
        <form className="regLoginForm">
          <div>
            <label htmlFor="username">Användarnamn: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Lösenord: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Logga in</button>
          <p id="regLoginLink">
            Har du inget konto?
            <Link to={"/register"}> Skapa ett konto</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;