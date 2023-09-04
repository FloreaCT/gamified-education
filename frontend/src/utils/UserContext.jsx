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
      // Get the user's course history
      const url = `http://localhost:3001/api/usercoursehistory/${foundUser.id}`;
      fetch(url)
        .then((res) => {
          if (res.status === 500) {
            return null;
          } else {
            res.json();
          }
        })
        .then((data) => {
          setHistory(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const updateUser = (updatedFields) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
  };

  return (
    <UserContext.Provider value={{ user, history, updateUser }}>
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
