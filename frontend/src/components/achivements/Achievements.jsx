import React, { useEffect, useState } from "react";
import AchievementCard from "./AchivementsCard";
import { useUser } from "../../utils/UserContext";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const updateFinish = async () => {
      const url = new URL("http://localhost:3001/api/achievements");
      const params = { email: user.email };
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }

      const achievements = await response.json();

      setAchievements(achievements);
    };

    updateFinish();
  }, []);

  return (
    <div className="container mx-auto p-4  w-[40rem]">
      <h1 className="text-4xl text-white py-4 shadow-lg font-bold mb-4 rounded bg-teal-500">
        Your Achievements
      </h1>
      <div>
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
export default Achievements;
