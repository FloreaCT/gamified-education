import React from "react";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  return (
    <div className="styles.mainContainer">
      <div className="titleContainer">
        <div>Welcome!</div>
      </div>
      <div>This is the student page.</div>
      <button type="button" className="bg-green-400">
        Logout
      </button>
    </div>
  );
};

export default StudentHome;
