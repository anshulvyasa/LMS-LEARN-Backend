const Course = require("../../models/course");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});

    if (courseList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Course Found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: courseList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getStudentViewCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetail = await Course.findById(id);

    if (!courseDetail) {
      return res.status(404).json({
        success: false,
        message: "No Course Found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: courseDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};



module.exports={getAllStudentViewCourses,getStudentViewCoursesDetails}