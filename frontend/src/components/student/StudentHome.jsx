import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

const StudentHome = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userHistory, setUserHistory] = useState(null);
  const [recentCourse, setRecentCourse] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const { user, history } = useContext(UserContext);

  const navigate = useNavigate();

  const handleContinueClick = () => {
    localStorage.setItem("courseName", recentCourse.course_id);
    navigate("/dashboard/courses/coursePage", {
      state: { courseName: recentCourse.course_id },
    });
  };

  useEffect(() => {
    if (user) {
      setAchievements(user.achievements);
    }
    if (user && user.username) {
      setCurrentUser(user.username);
    } else if (user && user.fullName) {
      setCurrentUser(user.fullName);
    }
    if (history) {
      const sortedHistory = history.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setRecentCourse(sortedHistory[0]);
      setUserHistory(history);
    }
  }, [user, history]);

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="text-4xl font-bold mb-4">
          <span>Welcome, {currentUser}😁</span>
        </div>
        {user.pathStarted && (
          <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg my-4">
            <div className="mr-4">
              <img
                src="/assets/icons/pngegg.png"
                alt="helper"
                className="w-16"
              />
            </div>
            <div>
              <p className="text-lg">
                Woo hoo, I see you are on <strong>"{user.pathStarted}"</strong>.
                I'm so excited to help you progress forward! 🚀
              </p>
              <p>
                You will see me around, poping out of nowhere, exactly when you
                need me the most.
              </p>
            </div>
          </div>
        )}
        {/* Continue Course Section */}
        {userHistory ? (
          <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-6 rounded-lg mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white text-3xl font-semibold">
                  Continue Your Journey
                </h2>
                <p className="text-white text-lg mt-2">
                  Pick up right where you left off in{" "}
                  <span className="font-bold">{recentCourse.course_id}</span>.
                </p>
              </div>
              <div className="bg-white p-4 rounded-full">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <button
              className="mt-4 bg-white text-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-300 rounded-full py-2 px-6 font-semibold"
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Hey Newbie! 🌟</div>
            <div className="text-lg mt-2">
              Looks like you're new here! How about starting a course to unlock
              the magic? 🧙‍♂️
            </div>
            <button type="button" className="bg-blue-300 p-2 rounded mt-2">
              <Link to="/dashboard/courses">Explore our courses</Link>
            </button>{" "}
            <button type="button" className="bg-blue-300 p-2 rounded mt-2">
              <Link to="/dashboard/discover">Discover your path!</Link>
            </button>
          </div>
        )}

        {/* User History Section */}
        {userHistory ? (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Your History</div>
            {/* Get from the usercoursehistory where current user id = user_id and get */}
            {userHistory.map((data, index) => {
              const isoTimeString = data.started_time.toString();
              const isoDate = new Date(isoTimeString);

              const formattedDate = isoDate.toLocaleDateString(); // Format: 9/5/2023
              const formattedTime = isoDate.toLocaleTimeString(); // Format: 10:40:40 AM

              return (
                <div key={index} className="bg-white p-2 rounded-lg mt-2">
                  <div className="font-bold">Course: {data.course_id}</div>
                  <div>Level: {data.current_level}</div>

                  <div>
                    Date started: {formattedDate} at {formattedTime}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Your History</div>
            <div className="text-lg mt-2">
              No history yet! Time to make some epic memories! 🚀
            </div>
          </div>
        )}
        {/* Additional Info */}
        {user?.achievements ? (
          <div className="bg-green-100 p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex text-2xl font-semibold text-center items-center justify-center">
                Your Achievements 🏆
              </div>
              <div className="flex text-2xl font-semibold text-black">
                Total: {user?.achievements.length}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {user?.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow"
                >
                  <img
                    src={achievement.icon}
                    alt="Achievement Icon"
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-semibold">{achievement.name}</div>
                    <div className="text-xs text-gray-600">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold mb-2">
              Your Achievements 🏆
            </div>
            <p className="text-gray-600">
              You don't have any achievements yet 😢
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default StudentHome;
