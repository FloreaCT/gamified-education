const express = require("express");
const router = express.Router();
const {
  UserCourseHistory,
  Course,
  User,
  Achievement,
} = require("../../models"); // Import Sequelize models
const Sequelize = require("sequelize");
const achievementEventEmitter = require("../listeners/achievementEvents");
const { checkOnlineTimeAchievement } = require("../utils/achievementUtils");

async function getCourseMaterial(req, res) {
  try {
    const course = await Course.findOne({
      where: { course_name: req.params.courseName },
    });

    if (course) {
      res.json({
        course_material: course.course_material,
        course_quizzes: course.quizzes,
      });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getCourseProgress(req, res) {
  checkOnlineTimeAchievement(req.params.user_id);
  try {
    let course = await UserCourseHistory.findOne({
      where: { course_id: req.params.courseName, user_id: req.params.user_id },
    });
    if (!course) {
      // If no existing course history, create a new one
      course = await UserCourseHistory.create({
        user_id: req.params.user_id,
        course_id: req.params.courseName,
        started_time: new Date(),
        current_level: 1,
      });
    }

    if (course) {
      return res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateHistory(req, res) {
  checkOnlineTimeAchievement(req.body.user_id);
  try {
    const history = await UserCourseHistory.findOne({
      where: { course_id: req.body.courseName, user_id: req.body.user_id },
    });

    if (history) {
      // Update the current_level property
      if (history.current_level >= req.body.currentLevel) {
        return res.status(200).json({ message: 0 });
      }
      history.current_level = req.body.currentLevel;

      // Save the updated history
      await history.save();

      res.json(history); // Respond with the updated history
    } else {
      res.status(404).json({ message: "Course history not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllCourses(req, res) {
  checkOnlineTimeAchievement(req.query.userId);
  try {
    const result = await Course.findAll({
      attributes: ["course_id", "course_name", "course_description"],
      include: [
        {
          model: UserCourseHistory,
          attributes: ["current_level"],
          where: { user_id: req.query.userId },
          on: Sequelize.literal(
            "Course.course_name = UserCourseHistories.course_id"
          ),
          required: false,
        },
      ],
      raw: true,
    });

    if (result.length === 0) {
      // Fallback: send just the courses if the above query fails
      try {
        const courses = await Course.findAll();
        res.json(courses);
      } catch (fallbackErr) {
        console.log(fallbackErr);
        res.status(500).json({ message: "Server error" });
      }
    }
    res.json(result);
  } catch (err) {
    console.log(err);
  }
}

async function updateFinish(req, res) {
  try {
    const history = await UserCourseHistory.findOne({
      where: { course_id: req.body.courseName, user_id: req.body.user_id },
    });
    checkOnlineTimeAchievement(req.body.user_id);
    if (history) {
      history.finished_time = new Date();
      completion_status = true;
      // Save the updated history
      await history.save();

      const countCourses = await UserCourseHistory.count({
        where: { user_id: req.body.user_id, completion_status: 1 },
      });

      if (countCourses === 3) {
        const user = await User.findOne({
          where: { id: req.body.user_id },
        });

        let currentAchievements = [];

        if (user?.achievements?.length === 0 || !user.achievements) {
          currentAchievements = [];
        } else {
          currentAchievements = JSON.parse(user.achievements);
        }

        const newAchievement = {
          name: "Course Worm",
          details: "You've completed 3 courses!",
          time: new Date().toISOString(),
          icon: "/assets/icons/courseworm.png",
        };

        await Achievement.create({
          achievementName: newAchievement.name,
          username: user.username,
          timestamp: new Date().toISOString(),
        });

        setTimeout(() => {
          achievementEventEmitter.emit("feedAchievement", {
            ...newAchievement,
            type: "achievement",
          });
        }, 2500);

        currentAchievements.push(newAchievement);

        try {
          await user.update({
            achievements: JSON.stringify(currentAchievements),
          });
        } catch (error) {
          console.log("Error updating user:", error);
        }

        setTimeout(() => {
          achievementEventEmitter.emit("eventTriggered", {
            ...newAchievement,
            type: "achievement",
          });
        }, 3000);
      }

      res.json(history); // Respond with the updated history
    } else {
      res.status(404).json({ message: "Course history not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function restartCourse(req, res) {
  try {
    const history = await UserCourseHistory.findOne({
      where: { course_id: req.body.courseName, user_id: req.body.user_id },
    });

    if (history) {
      history.current_level = 1;
      history.started_time = new Date();
      history.finished_time = null;

      // Save the updated history
      await history.save();
      checkOnlineTimeAchievement(req.body.user_id);
      res.json(history); // Respond with the updated history
    } else {
      res.status(404).json({ message: "Course history not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateStatus(req, res) {
  try {
    const history = await UserCourseHistory.findOne({
      where: { user_id: req.body.user_id, course_id: req.body.courseName },
    });

    if (history) {
      const updatedUser = await history.update({
        completion_status: 1,
      });
      checkOnlineTimeAchievement(req.body.user_id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "History not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {
  getCourseMaterial,
  getCourseProgress,
  updateHistory,
  updateFinish,
  restartCourse,
  getAllCourses,
  updateStatus,
  router,
};
