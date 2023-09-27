const { User } = require("../../models/");
const { createAchievement } = require("../controllers/feedController");
const achievementEventEmitter = require("../listeners/achievementEvents");
const { updateUserAchievements } = require("../utils/AchievementUpdate");

const checkOnlineTimeAchievement = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  let timeOnline = 0;

  if (!user.loginTime) {
    const loginTime = new Date();
    const now = new Date();
    timeOnline = now - loginTime; // in milliseconds
    const updateTime = await user.update({ loginTime: loginTime });
  } else {
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    timeOnline = now - loginTime; // in milliseconds
  }

  // Check for achievement
  if (timeOnline >= 900000) {
    // 15 minutes in milliseconds
    const currentAchievements = user.achievements
      ? JSON.parse(user.achievements)
      : [];

    // Check if the user already has this achievement
    const hasAchievement = currentAchievements.some(
      (achievement) => achievement.name === "15 Minutes Online"
    );

    if (!hasAchievement) {
      const newAchievement = {
        name: "15 Minutes Online",
        details: "You've been online for 15 minutes!",
        time: new Date().toISOString(),
        icon: "/assets/icons/medal2.png",
      };

      updateUserAchievements(userId, newAchievement);
    }
  }
};

module.exports = {
  checkOnlineTimeAchievement,
};
