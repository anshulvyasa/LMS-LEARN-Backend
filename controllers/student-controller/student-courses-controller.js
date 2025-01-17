const StudentCourses = require("../../models/student-courses");

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    console.log("Hello");
    console.log(studentBoughtCourses);

    res.status(200).json({
      status: true,
      courses: studentBoughtCourses.courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const getStudentBoughtCourseStatus = async (req, res) => {
  const { courseId, studentId } = req.params;
  

  const userCourseDetail = await StudentCourses.findOne({
    userId: studentId,
  });
   
  let courseBoughtStatus=false;

  if(userCourseDetail){
    courseBoughtStatus =
    userCourseDetail.courses.findIndex((item) => item.courseId === courseId) >
    -1;
  }

   res.status(200).json({
    success:true,
    status:courseBoughtStatus
   })
};

module.exports = { getCoursesByStudentId, getStudentBoughtCourseStatus };
