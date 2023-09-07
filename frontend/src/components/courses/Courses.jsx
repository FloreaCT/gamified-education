import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext";
import "./styles.css";
import { FaHtml5, FaJava, FaPhp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [courses, setCourses] = useState([]);
  const { user } = useUser();
  const [icons, setIcons] = useState({
    0: FaPhp,
    1: FaHtml5,
    2: FaJava,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/courses", {
          params: {
            userId: user.id,
          },
        });
        const data = response.data;

        if (data) {
          setCourses(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCourses();
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const handleContinueClick = (courseName) => {
    navigate("/dashboard/courses/coursePage", {
      state: { courseName: courseName },
    });
  };

  return (
    <div className="container mx-auto p-6">
      {currentUser.pathStarted && (
        <div className="text-2xl font-bold mb-4">
          Since you're on{" "}
          <span className="text-teal-500">{currentUser.pathStarted}</span>, the
          following courses are available to you:
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="course-card rounded-lg shadow-lg p-4 bg-white"
          >
            <h3 className="flex justify-center">
              {React.createElement(icons[index], {
                size: 120,
                color: "teal",
              })}
            </h3>
            <h4>{course.title}</h4>
            <div className="rating my-2">
              <span>⭐⭐⭐⭐⭐</span>{" "}
              <span className="text-gray-500">(4.8)</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {course.course_description}
            </p>
            <div className="progress-bar mb-5">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${
                    course["UserCourseHistories.current_level"] === null
                      ? "0%"
                      : course["UserCourseHistories.current_level"] ===
                        undefined
                      ? "0%"
                      : `${
                          course["UserCourseHistories.current_level"] - 1 === 0
                            ? 0
                            : course["UserCourseHistories.current_level"] * 10
                        }%`
                  }`,
                }}
              ></div>
            </div>
            {course["UserCourseHistories.current_level"] < 11 ? (
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                onClick={() => handleContinueClick(course.course_name)}
              >
                Start Course
              </button>
            ) : (
              <div>
                <p>You finished this course!</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Restart Course
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
