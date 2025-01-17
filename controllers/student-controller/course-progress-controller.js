const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/course");
const StudentCourse = require("../../models/student-courses");

//mark current lecture as viewed
const markCurrentLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    //let find Out The Course Progress for corresponding UserId and courseId
    let progress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    });

    //But What If Progress is Present for current Course the Make a CourseProgress
    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });

      await progress.save();
    } else {
      //Handling if we have Course Progress
      const lectureProgress = progress?.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );

      if (lectureProgress) {
        (lectureProgress.viewed = true),
          (lectureProgress.dateViewed = new Date());
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }

      await progress.save();
    }

    //Find Course (what are we doing this is a great question here)
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    const AllLectureViewed =
      course.curriculum.length === progress.lecturesProgress.length &&
      progress.lecturesProgress.every((item) => item.viewed);

    if (AllLectureViewed) {
      progress.completed = true;
      progress.completionDate = new Date();
      await progress.save();
    }

    res.status(200).json({
      success: true,
      message: "Lecture Marked As Viewed",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

//get current course Progress
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    //Getting Courses That Student Purchased
    const studentPurchasedCourse = await StudentCourse.findOne({
      userId: userId,
    });

    //checking If The Courses is Purchased or Not By The User
    const isCoursePurchasedByCurrentUserOrNot =
      studentPurchasedCourse?.courses?.findIndex(
        (item) => item.courseId === courseId
      ) > -1;

    //Handle if Student Doesn't purchased The Course but try to access it by changing the route
    if (!isCoursePurchasedByCurrentUserOrNot) {
      return res.status(200).json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "You Need To Purchase this Code Before Accessing it ",
      });
    }

    //Getting the Progress of the current Course that is already bought by the user
    const getCurrentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    //But they may exist a possibility that we do not have any courseProgress in which case our "getCurrentUserCourseProgress" can also be null
    //also there may not be any progress At All
    //So lets Handle both possibility together
    if (
      !getCurrentUserCourseProgress ||
      !getCurrentUserCourseProgress?.lecturesProgress?.length === 0
    ) {
      //checking if the Course exist or Not
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course Not Found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "No Progress Found,you can start Watching the Course",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    //getting CourseDetail
    const courseDetails = await Course.findById(courseId);

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: getCurrentUserCourseProgress.lecturesProgress,
        completed: getCurrentUserCourseProgress.completed,
        completionDate: getCurrentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

//reset Course progress
const resetCurrentProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    console.log("UserId : ", userId, " CourseId : ", courseId);

    const progress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress Not Found",
      });
    }

    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Course Progress has been reset",
      data: progress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

module.exports = {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCurrentProgress,
};
