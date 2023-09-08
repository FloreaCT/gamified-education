import React, { useEffect, useState } from "react";
import { useUser } from "../../utils/UserContext";
import "./styles.css";
import { FaHtml5, FaJava, FaPhp } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  // const [currentUser, setCurrentUser] = useState({});
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

  // useEffect(() => {
  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, [user]);

  const handleContinueClick = (courseName, reset) => {
    if (reset) {
      const reset = "reset";
      navigate("/dashboard/courses/coursePage", {
        state: { courseName: courseName, reset: reset },
      });
    } else {
      navigate("/dashboard/courses/coursePage", {
        state: { courseName: courseName },
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      {user.pathStarted ? (
        <div className="text-2xl font-bold mb-4">
          Since you're on{" "}
          <span className="text-teal-500">{user.pathStarted}</span>, the
          following courses are available to you:
        </div>
      ) : (
        <div className="text-2xl font-bold mb-4 bg">
          <div className="inline-block bg-teal-500 p-2 rounded-lg text-white">
            <h1>👋 Hey Adventurer!</h1>
            <p>Looks like you haven't chosen a path yet. No worries!</p>
            <h2>🤔 Confused about where to start?</h2>
            <p>Let our magical algorithm decide the best path for you!</p>
          </div>
          <div className="flex justify-center">
            <Link to="/dashboard/discover">
              <button className="bg-teal-500 text-white m-2 px-4 py-2 rounded-2xl hover:bg-teal-600">
                🧙‍♂️ Show Me My Path!
              </button>
            </Link>
          </div>
          <h2>OR</h2>
          <p>
            Feel free to choose from the treasure trove of courses below! 📚
          </p>
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
                      ? "0"
                      : course["UserCourseHistories.current_level"] ===
                        undefined
                      ? "0"
                      : `${
                          course["UserCourseHistories.current_level"] - 1 === 0
                            ? 0
                            : (course["UserCourseHistories.current_level"] -
                                1) *
                              10
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
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() =>
                    handleContinueClick(course.course_name, "reset")
                  }
                >
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
