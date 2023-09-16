import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children, latestEvent }) => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (latestEvent && latestEvent.type === "achievement") {
      // Check if the user has an "achievements" array, if not create one
      let existingAchievements = user?.achievements || [];

      // Check if the achievement already exists
      if (typeof existingAchievements === "string") {
        existingAchievements = JSON.parse(existingAchievements);
      }

      const alreadyExists =
        existingAchievements.length !== 0 &&
        typeof existingAchievements !== "string"
          ? existingAchievements.some(
              (achievement) => achievement.name === latestEvent.name
            )
          : existingAchievements.length !== 0
          ? JSON.parse(existingAchievements).some(
              (achievement) => achievement.name === latestEvent.name
            )
          : false;

      if (!alreadyExists) {
        // Add the new achievement to the existing achievements
        const updatedAchievements = [...existingAchievements, latestEvent];
        console.log("updatedAchievements", updatedAchievements);
        console.log("typeof ", typeof updatedAchievements);

        // Update the user object
        updateUser({ achievements: updatedAchievements });

        // Update local storage
        const updatedUser = { ...user, achievements: updatedAchievements };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }
  }, [latestEvent]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      let foundUser = JSON.parse(loggedInUser);

      // Parse the achievements if they exist and are a string
      if (
        foundUser.achievements &&
        typeof foundUser.achievements === "string"
      ) {
        try {
          foundUser.achievements = JSON.parse(foundUser.achievements);
        } catch (error) {
          console.error("Error parsing achievements:", error);
        }
      }

      setUser(foundUser);

      const url = new URL("http://localhost:3001/api/UserCourseHistories");
      url.searchParams.append("userId", JSON.parse(loggedInUser).id);

      fetch(url)
        .then((res) => {
          if (res.status === 500) {
            return null;
          } else {
            return res.json(); // Parse the JSON response
          }
        })
        .then((data) => {
          if (data) {
            setHistory(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const updateHistory = (newCourseHistory, courseName) => {
    if (!history || history.length === 0) {
      // If history is empty, simply set it to an array containing the new course history
      setHistory([newCourseHistory]);
      return;
    }

    const existingCourse = history.find(
      (course) => course.course_id === courseName
    );

    if (existingCourse) {
      // Update the existing course history
      const updatedHistory = history.map((course) => {
        if (course.course_id === courseName) {
          return newCourseHistory;
        }
        return course;
      });

      setHistory(updatedHistory);
    } else {
      // Add the new course history to the existing history
      setHistory([...history, newCourseHistory]);
    }
  };

  const updateUser = (updatedFields) => {
    console.log(updatedFields);
    localStorage.setItem("user", JSON.stringify({ ...user, ...updatedFields }));
    setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
  };

  return (
    <UserContext.Provider value={{ user, history, updateHistory, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
