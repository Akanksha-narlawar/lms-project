import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <p>Welcome to your LMS Dashboard 🚀</p>

      <div style={styles.card}>
        <h3>Quick Actions</h3>

        <button style={styles.button} onClick={() => navigate("/courses")}>
          View Courses
        </button>

        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "250px",
  },
  button: {
    display: "block",
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;