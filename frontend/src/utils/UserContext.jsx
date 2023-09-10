import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

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
    console.log(newCourseHistory, courseName);
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
