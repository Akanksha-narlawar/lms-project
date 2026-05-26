import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/enrollments/my-courses",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>My Courses</h1>

        {courses.map((enroll) => (
          <div key={enroll._id} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{enroll.courseId.title}</h3>
            <p>{enroll.courseId.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCourses;