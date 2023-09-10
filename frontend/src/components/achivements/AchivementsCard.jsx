import React, { useState } from "react";
import { useUser } from "../../utils/UserContext";
import { animated, useSpring } from "react-spring";

const AchievementCard = ({ achievement }) => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const messageStyles = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage
      ? "translate3d(0,0,0)"
      : "translate3d(-40px,0,-40px)",
  });

  const handleShare = () => {
    const updateFinish = async () => {
      const response = await fetch(`http://localhost:3001/api/feed/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          type: "achievement",
          content: achievement.details,
        }),
      });

      if (!response.ok && response.status === 409) {
        setErrorMessage("You already shared this achievement");

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);

        return;
      }

      console.log("Achievement shared");
    };

    updateFinish();
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-center">
        <img
          src={achievement.icon}
          alt={achievement.name}
          className="w-16 h-16 mr-4"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold">{achievement.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(achievement.time).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">{achievement.details}</p>
        </div>
        <div className="flex ml-auto">
          <button
            onClick={handleShare}
            className="bg-teal-500 text-white rounded px-4 py-2"
          >
            Share
          </button>
        </div>
      </div>
      {errorMessage && (
        <animated.div
          style={messageStyles}
          className="bg-red-500 text-white inline-block px-2 py-1 rounded-lg"
        >
          {errorMessage}
        </animated.div>
      )}
    </div>
  );
};

export default AchievementCard;
