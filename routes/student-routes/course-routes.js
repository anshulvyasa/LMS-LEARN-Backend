const express = require("express");
const router = express.Router();
const {
  getAllStudentViewCourses,
  getStudentViewCoursesDetails,
} = require("../../controllers/student-controller/course-controller");

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCoursesDetails);

module.exports=router