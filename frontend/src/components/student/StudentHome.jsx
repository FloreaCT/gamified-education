import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

const StudentHome = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [userHistory, setUserHistory] = useState(null);

  const { user, history } = useContext(UserContext);

  useEffect(() => {
    if (user && user.username) {
      setCurrentUser(user.username);
    } else if (user && user.fullName) {
      setCurrentUser(user.fullName);
    }
    if (history) {
      setUserHistory(history);
    }
  }, [user, history]);

  return (
    <Fragment>
      <div className="container mx-auto p-4">
        <div className="text-4xl font-bold mb-4">
          <span>Welcome, {currentUser}😁</span>
        </div>

        {/* Continue Course Section */}
        {userHistory ? (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Continue Your Journey</div>
            <div className="text-lg mt-2">
              You can continue where you left over.
            </div>
          </div>
        ) : (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Hey Newbie! 🌟</div>
            <div className="text-lg mt-2">
              Looks like you're new here! How about starting a course to unlock
              the magic? 🧙‍♂️
            </div>
            <button type="button" className="bg-blue-300 p-2 rounded mt-2">
              <Link to="/dashboard/discover">Explore your courses</Link>
            </button>
          </div>
        )}

        {/* User History Section */}
        {userHistory ? (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <div className="text-2xl font-semibold">Your History</div>
            {/* Get from the usercoursehistory where current user id = user_id and get */}
            {/* {dbdata.map((data) => (
            <div className="bg-white p-2 rounded-lg mt-2">
              <div className="font-bold">Course: {data.course_name}</div>
              <div>Level: {data.current_level}</div>
              <div>Time started: {data.started_time}</div>
              <div>Time finished: {data.finished_time}</div>
              <div>Completion Status: {data.completion_status}</div>
              <div>Experience Earned: {data.current_experience}</div>
            </div>
          ))} */}
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
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-2xl font-semibold">Your Achievements 🏆</div>
            {/* Render the achievements */}
            <ul>
              {user.achievements.map((achievement, index) => (
                <li key={index}>{achievement.title}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-2xl font-semibold mb-2">
              Your Achievements 🏆
            </div>
            <p>You don't have any achievements yet 😢</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default StudentHome;