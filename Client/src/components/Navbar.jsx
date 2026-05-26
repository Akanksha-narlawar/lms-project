import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <h2 style={styles.logo} onClick={() => navigate("/dashboard")}>
        LMS
      </h2>

      {/* Navigation Links */}
      <div style={styles.links}>
        {token ? (
          <>
            <button style={styles.button} onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            <button style={styles.button} onClick={() => navigate("/courses")}>
              Courses
            </button>

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button style={styles.button} onClick={() => navigate("/")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1e1e2f",
    color: "#fff",
  },
  logo: {
    cursor: "pointer",
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  logout: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
  },
};

export default Navbar;