const express = require("express");
const router = express.Router();
const { UserCourseHistory, User } = require("../../models"); // Import Sequelize models
const { Op } = require("sequelize");
const achievementEventEmitter = require("../listeners/achievementEvents");
const { checkOnlineTimeAchievement } = require("../utils/achievementUtils");
const { updateUserAchievements } = require("../utils/AchievementUpdate");

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUser(req, res) {
  try {
    const users = await User.findOne({
      where: {
        email: req.query.email,
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserHistory(req, res) {
  try {
    const history = await UserCourseHistory.findAll({
      where: {
        user_id: req.query.userId,
      },
    });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function userRegister(req, res) {
  try {
    const user = await User.create({
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateUser(req, res) {
  try {
    const { newEmail, oldEmail, fullName, username, avatar } = req.body;

    const user = await User.findOne({
      where: { email: oldEmail },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await user.update({
      fullName: fullName,
      username: username,
      email: newEmail,
      avatar: avatar,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    checkOnlineTimeAchievement(user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function setAvatar(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      const updatedUser = await user.update({
        avatar: req.body.avatar,
      });
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updatePath(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      const updatedUser = await user.update({
        pathStarted: req.body.path,
      });
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateExperience(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      let newExperience = user.experience + 10;
      let newLevel = user.level;
      const currentDate = new Date();

      // Check if a week has passed since the last weekly update
      if (
        currentDate - new Date(user.lastWeeklyUpdate) >=
        7 * 24 * 60 * 60 * 1000
      ) {
        // Reset the user's weekly XP
        user.weeklyXP = 0;
        user.lastWeeklyUpdate = currentDate;
      }

      // Check if a month has passed since the last monthly update
      if (
        currentDate - new Date(user.lastMonthlyUpdate) >=
        30 * 24 * 60 * 60 * 1000
      ) {
        // Reset the user's monthly XP
        user.monthlyXP = 0;
        user.lastMonthlyUpdate = currentDate;
      }

      // Add the new XP to the user's weekly and monthly totals
      user.weeklyXP += 10;
      user.monthlyXP += 10;

      const updatedUser = await user.update({
        experience: newExperience,
        level: Math.floor(newExperience / 100),
        weeklyXP: user.weeklyXP,
        monthlyXP: user.monthlyXP,
        lastWeeklyUpdate: user.lastWeeklyUpdate,
        lastMonthlyUpdate: user.lastMonthlyUpdate,
      });

      if (updatedUser.experience === 100) {
        const newAchievement = {
          name: "100 XP",
          details: "You've earned 100 XP!",
          time: new Date().toISOString(),
          icon: "/assets/icons/medal2.png",
        };

        updateUserAchievements(JSON.parse(user.id), newAchievement);

        setTimeout(() => {
          achievementEventEmitter.emit("eventTriggered", {
            ...newAchievement,
            type: "achievement",
          });
        }, 3000);
      }

      res.json({
        ...updatedUser.get(),
        experience: updatedUser.experience % 100, // Send only the remainder to the frontend
        level: Math.floor(updatedUser.experience / 100),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getLeaderboard(req, res) {
  try {
    const timeframe = req.query.timeframe; // 'weekly' or 'monthly'
    let whereCondition = {};

    if (timeframe === "weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      whereCondition.lastWeeklyUpdate = {
        [Op.gte]: oneWeekAgo,
      };
    } else if (timeframe === "monthly") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      whereCondition.lastMonthlyUpdate = {
        [Op.gte]: oneMonthAgo,
      };
    }

    const users = await User.findAll({
      where: whereCondition,
      order: [["experience", "DESC"]],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAchievements(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.query.email },
    });

    if (user) {
      const achievements = user.achievements || [];

      res.json(achievements);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function browserClose(req, res) {
  try {
    const user = await User.findOne({
      where: { id: req.body.userId },
    });

    if (user) {
      const loginTime = await user.update({ loginTime: null });
      res.json(loginTime);
    } else {
      res.status(404).json({ message: "Failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllUsers,
  userRegister,
  loginUser,
  setAvatar,
  getUser,
  updateUser,
  getUserHistory,
  getLeaderboard,
  updatePath,
  updateExperience,
  getAchievements,
  browserClose,
  router,
};
