import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Courses = () => {
  // ======================
  // USER DATA
  // ======================
  const user = JSON.parse(localStorage.getItem("user"));

  // ======================
  // STATES
  // ======================
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ======================
  // FETCH COURSES
  // ======================
  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ======================
  // ADD COURSE (ADMIN)
  // ======================
  const addCourse = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/courses",
        {
          title,
          description,
        }
      );

      setTitle("");
      setDescription("");

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // DELETE COURSE (ADMIN)
  // ======================
  const deleteCourse = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/courses/${id}`
      );

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // ENROLL COURSE (STUDENT)
  // ======================
  const enrollCourse = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/enrollments/enroll/${courseId}`,
        {},
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      alert("Enrolled successfully 🚀");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Enrollment failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Courses</h1>

        {/* ======================
            ADMIN ONLY: ADD COURSE
        ====================== */}
        {user?.role === "admin" && (
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Course Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              style={styles.input}
            />

            <button
              onClick={addCourse}
              style={styles.addBtn}
            >
              Add Course
            </button>
          </div>
        )}

        {/* ======================
            COURSE LIST
        ====================== */}
        <div style={styles.grid}>
          {courses.map((course) => (
            <div
              key={course._id}
              style={styles.card}
            >
              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <div style={styles.buttonGroup}>
                {/* ENROLL BUTTON */}
                <button
                  style={styles.enrollBtn}
                  onClick={() =>
                    enrollCourse(course._id)
                  }
                >
                  Enroll
                </button>

                {/* ADMIN ONLY DELETE */}
                {user?.role === "admin" && (
                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      deleteCourse(course._id)
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ======================
// STYLES
// ======================
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  addBtn: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  enrollBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Courses;