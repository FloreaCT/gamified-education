import React, { useEffect, useState } from "react";
import AchievementCard from "./AchivementsCard";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch achievements from the API or local storage
    // For demonstration, let's assume we have them in a variable
    const fetchedAchievements = [
      {
        name: "Rookie of the Year",
        time: "2023-08-01T12:00:00Z",
        icon: "/assets/icons/guru.png",
        details: "Completed your first course within a week of joining.",
      },
      {
        name: "First Blood",
        time: "2023-08-05T14:30:00Z",
        icon: "/assets/icons/debugging.png",
        details: "Scored 100% on your first quiz.",
      },
      {
        name: "Quiz Master",
        time: "2023-08-10T09:15:00Z",
        icon: "/assets/icons/innovator.png",
        details: "Successfully completed 10 quizzes.",
      },
      {
        name: "Speed Runner",
        time: "2023-08-15T17:45:00Z",
        icon: "/assets/icons/pngegg.png",
        details: "Finished a course in less than half the estimated time.",
      },
      {
        name: "Social Butterfly",
        time: "2023-08-20T11:20:00Z",
        icon: "/assets/icons/medal2.png",
        details: "Made 50 friends on the platform.",
      },
      {
        name: "Bookworm",
        time: "2023-08-25T16:30:00Z",
        icon: "/assets/icons/explorer.png",
        details: "Read 100 articles or documents.",
      },
      {
        name: "Early Riser",
        time: "2023-09-10T12:00:00.000Z",
        icon: "/assets/icons/early-riser.png",
        details: "Completed a course before 9 AM.",
      },
      {
        name: "Night Owl",
        time: "2023-09-15T22:00:00.000Z",
        icon: "/assets/icons/night-owl.png",
        details: "Completed a course after 9 PM.",
      },
      {
        name: "Weekend Warrior",
        time: "2023-09-17T15:00:00.000Z",
        icon: "/assets/icons/weekend-warrior.png",
        details: "Completed a course during the weekend.",
      },
      {
        name: "Consistency King",
        time: "2023-09-20T18:00:00.000Z",
        icon: "/assets/icons/consistency-king.png",
        details: "Logged in for 7 consecutive days.",
      },
      {
        name: "Helping Hand",
        time: "2023-09-25T14:00:00.000Z",
        icon: "/assets/icons/helping-hand.png",
        details: "Answered 5 questions in the community forum.",
      },
      {
        name: "Brainiac",
        time: "2023-09-30T16:00:00.000Z",
        icon: "/assets/icons/brainiac.png",
        details: "Scored 100% in a quiz.",
      },
      {
        name: "Speedster",
        time: "2023-10-05T19:00:00.000Z",
        icon: "/assets/icons/speedster.png",
        details: "Completed a course in less than 24 hours.",
      },
      {
        name: "Social Butterfly",
        time: "2023-10-10T13:00:00.000Z",
        icon: "/assets/icons/social-butterfly.png",
        details: "Connected with 10 friends on the platform.",
      },
      {
        name: "Go-Getter",
        time: "2023-10-15T11:00:00.000Z",
        icon: "/assets/icons/go-getter.png",
        details: "Completed 5 courses in a single month.",
      },
    ];

    setAchievements(fetchedAchievements);
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
