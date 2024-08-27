import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      localStorage.setItem("User_ID", `${email}${password}`);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">TMDB Movies</div>
      <div className="login-div">
        <div className="login-label" data-testid="loginHeader">
          Login
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="login-input-container">
            <div className="login-input-lable">Email:</div>
            <input
              data-testid="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="login-input-container">
            <div className="login-input-lable">Password:</div>
            <input
              type="password"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button
            className="login-button"
            type="submit"
            data-testid="login-button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
