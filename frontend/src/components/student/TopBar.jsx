import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext"; // Import the UserContext
import io from "socket.io-client";

const socket = io("http://localhost:3002");

const TopBar = () => {
  const [shouldBlink, setShouldBlink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [achievements, setAchievements] = useState([]);

  const { user, updateUser } = useUser(); // Destructure the user state variable
  const avatar = user ? user.avatar : null;

  useEffect(() => {
    setShouldBlink(true);
    const timer = setTimeout(() => {
      setShouldBlink(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setOldEmail(userFromLocalStorage.email);
  }, [isModalOpen]);

  const toggleModal = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Fetch initial achievements from API
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/feed/achievements"
        );
        const achievements = await response.json();
        setAchievements(achievements);
        console.log(achievements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAchievements();
    // Listen for updates
    socket.on("feedAchievement", (newAchievement) => {
      fetchAchievements();
    });

    return () => {
      socket.off("feedAchievement");
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("outside")) {
      toggleModal();
    }
  };

  const handleSave = async () => {
    try {
      setSuccessMessage("Settings have been saved successfully!");
      setErrorMessage("");

      const event = {
        preventDefault: () => {},
      };

      handleFormSubmit(event);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("An error occurred while saving settings.");
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newEmail: user.email,
          oldEmail: oldEmail,
          fullName: user.fullName,
          username: user.username,
          avatar: user.avatar,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser); // Update the user in context
        localStorage.setItem(user.email, updateUser.email);
      } else {
        console.log("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const calculateLevel = (xp) => {
    return Math.min((xp / 100) * 100, 100);
  };

  return (
    <div className="flex justify-between items-center bg-teal-500 text-white p-4 ">
      {/* Left Side: Experience Bar */}
      <div className="flex flex-col items-center">
        <div className="text-sm">XP Bar 🌟</div>
        <div className="relative w-24 h-3 bg-gray-300 rounded-full">
          <div
            className="absolute left-0 h-3 bg-yellow-500 rounded-full"
            style={{ width: `${calculateLevel(user?.experience)}%` }}
          ></div>
        </div>
        Level {user?.level}
      </div>

      {/* Center: Small Feed Container */}
      <div
        className={`flex flex-col items-center text-sm bg-black rounded-lg p-4 bg-opacity-20 mr-[2.5rem] ${
          shouldBlink ? "animate-pulse" : ""
        }`}
      >
        {achievements?.map((achievement, index) => (
          <div key={index} className="flex items-center">
            🏆 <span className="ml-1">{achievement.username} just got </span>
            <span className="ml-1 italic">{achievement.achievementName}</span>
            &nbsp;achievement.
          </div>
        ))}
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
        <span
          className="text-lg bg-teal-700 px-4 rounded-2xl mt-1 hover:cursor-pointer"
          onClick={toggleModal}
        >
          Profile
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="absolute inset-0 bg-white bg-opacity-80 outside"></div>
          <div
            className="bg-teal-500 p-8 rounded-lg z-10 w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-lg absolute top-2 right-2 text-black"
              onClick={toggleModal}
            >
              X
            </button>
            <form className="flex flex-col text-black">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={user.fullName}
                  onChange={(e) =>
                    updateUser({ ...user, fullName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={user.username}
                  onChange={(e) =>
                    updateUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={user.email}
                  onChange={(e) => {
                    updateUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Avatar</label>
                {user.level > 3 ? (
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    onChange={(e) =>
                      updateUser({ ...user, avatar: e.target.files[0] })
                    }
                  />
                ) : (
                  <span className="text-lg font-bold text-red-700">
                    Reach level 4 to change your avatar.
                  </span>
                )}
              </div>
              <div className="flex flex-col self-center justify-center">
                {/* Display success message if it exists */}
                {successMessage && (
                  <div className="text-green-600 p-2 rounded text-lg bg-white">
                    {successMessage}
                  </div>
                )}
                {/* Display error message if it exists */}
                {errorMessage && (
                  <div className="text-red-600 p-2 rounded text-lg bg-white">
                    {errorMessage}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 w-20 self-center rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
