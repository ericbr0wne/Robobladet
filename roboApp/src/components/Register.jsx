import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterLogin.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.status === 201) {
        localStorage.setItem("userRegistered", "true");
        navigate("/login"); // Corrected navigation
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div>
      <h1>Registera ett nytt konto</h1>
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
          <button type="button" onClick={handleRegister}>
            Registera 
          </button>
          <p id="regLoginLink">
            Har du redan ett konto?
            <Link to={"/login"}> Logga in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;