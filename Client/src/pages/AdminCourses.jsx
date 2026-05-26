import React, { useState } from "react";

const AdminCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics" },
    { id: 2, title: "Node Basics" },
  ]);

  const [title, setTitle] = useState("");

  const addCourse = () => {
    if (!title) return;

    const newCourse = {
      id: Date.now(),
      title: title,
    };

    setCourses([...courses, newCourse]);
    setTitle("");
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Admin Panel - Courses</h1>

      {/* Add Course */}
      <div style={styles.inputBox}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter course title"
          style={styles.input}
        />
        <button onClick={addCourse} style={styles.addBtn}>
          Add
        </button>
      </div>

      {/* Course List */}
      <div style={styles.list}>
        {courses.map((course) => (
          <div key={course.id} style={styles.card}>
            <span>{course.title}</span>
            <button
              onClick={() => deleteCourse(course.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    flex: 1,
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ddd",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px 10px",
  },
};

export default AdminCourses;