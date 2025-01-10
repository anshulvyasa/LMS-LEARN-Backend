const Course = require("../../models/course");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortby = "price-lowtohigh",
    } = req.query;


    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    const sortParams = {};
    switch (sortby) {
      case "price-lowtohigh":
        sortParams.pricing = 1;
        break;
      case "price-hightolow":
        sortParams.pricing = -1;
        break;
      case "title-atoz":
        sortParams.title = 1;
        break;
      case "title-ztoa":
        sortParams.title = -1;
        break;
      default:
        sortParams.pricing = 1;
        break;
    }

    const courseList = await Course.find(filters).sort(sortParams);

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

module.exports = { getAllStudentViewCourses, getStudentViewCoursesDetails };
