import React from "react";

const AchievementCard = ({ achievement }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-center">
      <img
        src={achievement.icon}
        alt={achievement.name}
        className="w-16 h-16 mr-4"
      />
      <div className="text-center">
        <h3 className="text-xl font-bold">{achievement.name}</h3>
        <p className="text-sm text-gray-600">
          {new Date(achievement.time).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mt-1">{achievement.details}</p>
      </div>
    </div>
  );
};

export default AchievementCard;
