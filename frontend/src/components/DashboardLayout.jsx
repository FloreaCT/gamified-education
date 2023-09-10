import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import StudentHome from "./student/StudentHome";
import TopBar from "./student/TopBar";
import { useUser } from "../utils/UserContext";
import DiscoverPage from "./discovery/discoverPage";
import Leaderboard from "./leaderboard/Leaderboard";
import Courses from "./courses/Courses";
import CoursePage from "./coursePage/CoursePage";
import Achievements from "./achivements/Achievements";
import Feed from "./feed/Feed";

const DashboardLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateUser } = useUser(); // Use your custom hook

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      updateUser(foundUser); // Update the user in your context
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or some placeholder
  }
  if (!user) {
    return <Navigate to="/student/signin" replace />;
  } else if (!user.avatar) {
    return <Navigate to="/avatar-creation" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[20rem]">
        <TopBar />
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/coursePage" element={<CoursePage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/user" element={<StudentHome />} />
          <Route path="/Achievements" element={<Achievements />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
