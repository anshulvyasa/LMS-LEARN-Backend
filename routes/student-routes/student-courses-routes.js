const express = require("express");
const {
  getCoursesByStudentId,
  getStudentBoughtCourseStatus,
} = require("../../controllers/student-controller/student-courses-controller");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentId); //here i got error by putting space just after studentId
router.get("/course/:courseId/:studentId", getStudentBoughtCourseStatus);

module.exports = router;
