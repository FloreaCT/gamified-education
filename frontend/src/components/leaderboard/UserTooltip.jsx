import React from "react";

const UserTooltip = ({ user }) => {
  return (
    <div className="p-4 bg-teal-800 text-white rounded-lg shadow-lg inline-block">
      <h3 className="font-black">{user.username}</h3>
      <p className="font-medium">Recent Achievement:</p>
      <ul>
        {console.log(user)}
        {JSON.parse(user.achievements) ? (
          JSON.parse(user.achievements).map((achievement, index) => (
            <span
              key={index}
              className="text-sm bg-blue-500 text-white m-1 p-1 rounded-full flex items-center space-x-1"
            >
              <img
                src={achievement.icon}
                alt={achievement.name}
                className="h-8"
              />
              <span>{achievement.name}</span>
            </span>
          ))
        ) : (
          <div> {user.username} has no achievements yet. </div>
        )}
      </ul>
    </div>
  );
};

export default UserTooltip;
