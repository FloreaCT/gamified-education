import React from "react";

const TopBar = () => {
  const expPercentage = 75; // This could be dynamic based on user's experience points
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const avatar = user ? user.avatar : null;
  const level = user ? user.level : 2;

  return (
    <div className="flex justify-between items-center bg-teal-500 text-white p-4">
      {/* Left Side: Experience Bar */}
      <div className="flex flex-col items-center">
        <div className="text-sm">XP Bar 🌟</div>
        <div className="relative w-24 h-3 bg-gray-300 rounded-full">
          <div
            className="absolute left-0 h-3 bg-yellow-500 rounded-full"
            style={{ width: `${expPercentage}%` }}
          ></div>
        </div>
        Level {level}
      </div>

      {/* Center: Small Feed Container */}
      <div className="flex flex-col items-center text-sm bg-black bg-opacity-20 rounded p-4">
        <div className="flex items-center">
          🏆 <span className="ml-1">Jane just reached level 10!</span>
        </div>
        <div className="flex items-center">
          🌟 <span className="ml-1">Mike completed a daily quest!</span>
        </div>
      </div>

      {/* Right Side: Avatar and Profile Text */}
      <div className="flex flex-col items-center">
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        )}
        <div className="text-sm mt-1">Profile</div>
      </div>
    </div>
  );
};

export default TopBar;
