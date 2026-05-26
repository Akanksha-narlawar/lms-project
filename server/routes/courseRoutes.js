const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// ======================
// GET ALL COURSES
// ======================
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// CREATE COURSE
// ======================
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = new Course({
      title,
      description,
    });

    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// DELETE COURSE
// ======================
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;