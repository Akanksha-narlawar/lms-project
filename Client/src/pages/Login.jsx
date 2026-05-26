import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ======================
  // LOGIN FUNCTION
  // ======================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful 🚀");

      // REDIRECT
      navigate("/dashboard");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {/* BUTTON */}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {/* REGISTER LINK */}
      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

// ======================
// STYLES
// ======================
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  button: {
    padding: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Login;