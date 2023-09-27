const { User, Achievement } = require("../../models/");
const achievementEventEmitter = require("../listeners/achievementEvents");

const updateUserAchievements = async (userId, newAchievement) => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    let currentAchievements = JSON.parse(user.achievements) || [];

    // Check if the user already has this achievement
    const hasAchievement = currentAchievements.some(
      (achievement) => achievement.name === newAchievement.name
    );

    if (!hasAchievement) {
      currentAchievements.push(newAchievement);

      await user.update({ achievements: JSON.stringify(currentAchievements) });

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

      setTimeout(() => {
        achievementEventEmitter.emit("eventTriggered", {
          ...newAchievement,
          type: "achievement",
        });
      }, 3000);
    }
  } catch (error) {
    console.log("Error updating user:", error);
  }
};

module.exports = {
  updateUserAchievements,
};
