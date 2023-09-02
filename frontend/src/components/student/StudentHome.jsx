import React, { Fragment } from "react";
import TopBar from "./TopBar";

const StudentHome = () => {
  return (
    <Fragment>
      <TopBar />
      <div className="styles.mainContainer">
        <div className="titleContainer">
          <div>Welcome!</div>
        </div>
        <div>This is the student page.</div>
        <button type="button" className="bg-green-400">
          Logout
        </button>
      </div>
    </Fragment>
  );
};

export default StudentHome;
