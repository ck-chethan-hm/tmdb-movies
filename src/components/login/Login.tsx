import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
