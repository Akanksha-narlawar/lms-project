const express = require("express");
const router = express.Router();

const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const auth = require("../middleware/auth");

// ======================
// ENROLL IN COURSE
// ======================
router.post("/enroll/:courseId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.courseId;

    // check already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
    });

    await enrollment.save();

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// GET MY COURSES
// ======================
router.get("/my-courses", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id })
      .populate("courseId");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;