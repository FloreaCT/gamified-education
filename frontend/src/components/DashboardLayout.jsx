import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import StudentHome from "./StudentHome";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    setIsLoading(false); // Set loading to false after checking for user
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or some placeholder
  }

  if (!user) {
    return <Navigate to="/student/signin" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[20rem]">
        <Routes>
          <Route path="/" element={<StudentHome />} />
          <Route path="/started" element={<StudentHome />} />
          <Route path="/calendar" element={<StudentHome />} />
          <Route path="/user" element={<StudentHome />} />
          <Route path="/order" element={<StudentHome />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;