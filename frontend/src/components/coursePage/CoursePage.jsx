import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import { useSpring, animated, update } from "react-spring";

const CoursePage = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [courseMaterial, setCourseMaterial] = useState({});
  const [quizzes, setQuizzes] = useState({});
  const [disableNext, setDisableNext] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [green, setGreen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, updateUser, updateHistory } = useUser();
  const Checkpoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const messageStyles = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? "translate3d(0,0,0)" : "translate3d(0,-40px,0)",
  });

  let courseName = location.state ? location.state.courseName : null;
  let reset = location.state ? location.state.reset : null;

  useEffect(() => {
    if (finished) {
      setShowCongrats(true);

      const updateFinish = async () => {
        const response = await fetch(
          `http://localhost:3001/api/courses/updateFinish`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              courseName: courseName,
            }),
          }
        );

        if (!response.ok) {
          console.log("Something went wrong");
          setShowCongrats(false); // Enable the button again
          return;
        }
      };

      updateFinish();
    }
  }, [finished]);

  useEffect(() => {
    if (courseName === null) {
      navigate("/dashboard/");
    } else {
      localStorage.setItem("courseName", courseName);
    }

    const fetchedCourseMaterial = async () => {
      const response = await fetch(
        `http://localhost:3001/api/courses/${courseName}`
      );
      if (!response.ok) {
        console.log("Could not get materials");
        return;
      }
      const data = await response.json();
      const materials = JSON.parse(data.course_material);
      const quizzes = JSON.parse(data.course_quizzes);
      setCourseMaterial(materials);
      setQuizzes(quizzes);
    };

    const fetchProgress = async () => {
      const response = await fetch(
        `http://localhost:3001/api/courses/${courseName}/${user.id}`
      );

      if (!response.ok) {
        console.log("Could not get the progress");
        return;
      }

      const data = await response.json();
      setCompletionStatus(data.completion_status);
      setCurrentLevel(data.current_level);
    };

    fetchedCourseMaterial();
    fetchProgress();

    if (reset) restartCourse();
  }, []);

  const checkAnswer = () => {
    const requiredAnswers = JSON.stringify(quizzes[currentLevel]?.answer);
    const textArea = JSON.stringify(textareaValue);
    if (
      textArea.includes(requiredAnswers) ||
      textArea === JSON.stringify("continue")
    ) {
      setGreen("bg-teal-500");
      setMessage("Great job! You got it right!");
      setShowMessage(true);
      setDisableNext(false);
    } else {
      setGreen("bg-red-500");
      setDisableNext(true);
      setMessage("Oops! That's not correct. Try again.");
      setShowMessage(true);
    }
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleQuizOptionClick = (selected) => {
    setSelectedAnswer(selected);

    if (quizzes[currentLevel]?.correct_answer === selected) {
      setIsCorrect(true);
      // You can now enable the "Next" button or automatically move to the next level
      setDisableNext(false);
    } else {
      setIsCorrect(false);
      // Optionally, you can disable the "Next" button if the answer is wrong
      setDisableNext(true);
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const updateExperience = async () => {
    if (completionStatus) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/updateExperience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        }
      );

      if (!response.ok) {
        console.log("Something went wrong");
        setDisableNext(false); // Enable the button again
        return;
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
    } catch (error) {
      console.log("An error occurred:", error);
      setDisableNext(false); // Enable the button again
    }
  };

  const handleNext = async () => {
    // Disable the button immediately to prevent multiple clicks
    setDisableNext(true);

    if (currentLevel === Checkpoints.length) {
      setFinished(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/courses/updateStatus`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.id,
              courseName: courseName,
            }),
          }
        );

        if (!response.ok) {
          console.log("Something went wrong");
          setDisableNext(false); // Enable the button again
          return;
        }
        const history = await response.json();
        history.current_level = history.current_level + 1;

        // Set user history in UserContext
        updateHistory(history);
      } catch (error) {
        console.log("An error occurred:", error);
        setDisableNext(false); // Enable the button again
      }
    }

    // Calculate the new level
    const newLevel = currentLevel + 1;

    try {
      const response = await fetch(
        `http://localhost:3001/api/courses/updateHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            currentLevel: newLevel,
            courseName: courseName,
          }),
        }
      );
      if (!response.ok) {
        console.log("Something went wrong");
        setDisableNext(false); // Enable the button again
        return;
      }
      // Update the state only if the server update was successful
      setCurrentLevel(newLevel);
      setTextareaValue("");

      // Update user experience
      const experience = await response.json();

      // Update userContext history
      updateHistory(experience, experience.course_id);

      if (!completionStatus && experience.message !== 0) {
        updateExperience();
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setDisableNext(false); // Enable the button again
    }
  };

  const handlePrev = () => {
    setCurrentLevel((prevLevel) => prevLevel - 1);
    setSelectedAnswer(null);
    setTextareaValue("");
  };

  const restartCourse = async () => {
    const response = await fetch(
      `http://localhost:3001/api/courses/restartCourse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          courseName: courseName,
        }),
      }
    );

    if (!response.ok) {
      console.log("Something went wrong");
      setShowCongrats(false); // Enable the button again
      return;
    }
    setShowCongrats(false);
    setFinished(false);
    setCurrentLevel(1);
  };

  return (
    <div className="course-container">
      <div className="course-map">
        <div className="checkpoint-line"></div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`checkpoint ${index < currentLevel ? "active" : ""}`}
          >
            <span className="tooltip">Checkpoint {index + 1}</span>
            {index + 1}
          </div>
        ))}
      </div>
      <div className="course-material">
        <h2>{courseMaterial[currentLevel]?.title}</h2>
        <p>{courseMaterial[currentLevel]?.content}</p>
      </div>
      <div className="interactive-quiz">
        <h3>{quizzes[currentLevel]?.title}</h3>{" "}
        {/* Added this line to display the question title */}
        {quizzes[currentLevel]?.type === "checkbox" &&
          quizzes[currentLevel]?.answer.split(", ").map((ans, index) => (
            <div
              key={index}
              className={`quiz-option ${
                selectedAnswer === ans ? (isCorrect ? "correct" : "wrong") : ""
              }`}
              onClick={() => handleQuizOptionClick(ans)}
            >
              {ans}
            </div>
          ))}
        {quizzes[currentLevel]?.type === "challenge" && (
          <div className="flex flex-col relative">
            <textarea
              className="border-2 border-teal-400"
              placeholder="Write your answer here..."
              rows="4"
              cols="50"
              value={textareaValue}
              onChange={handleTextareaChange}
            ></textarea>
            <button
              type="button"
              className="rounded-lg m-6 p-2 bg-teal-500 text-white hover:bg-teal-600"
              onClick={checkAnswer}
            >
              Check answer
            </button>
            <animated.div style={messageStyles} className={`message ${green}`}>
              {message}
            </animated.div>
          </div>
        )}
      </div>
      {!finished ? (
        <div className="navigation-buttons">
          <button
            onClick={handlePrev}
            disabled={currentLevel === 1}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 mx-2"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={disableNext}
            className={`px-4 py-2 rounded-lg mx-2 ${
              disableNext
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-teal-500 text-white hover:bg-teal-600"
            }`}
          >
            Next
          </button>
        </div>
      ) : (
        showCongrats && (
          <div className="congrats-overlay flex flex-col fireworks pop-in ">
            <div className="flex flex-col bg-teal-500 p-4 rounded-lg text-white font-medium text-5xl">
              <h1>Congratulations!</h1>
              <span>You've successfully completed the course!</span>
            </div>
            <div className="flex justify-center w-[80vh]">
              <img src="/assets/images/fireworks.gif" alt="Fireworks" />
            </div>
            <button
              className="bg-teal-500 text-white hover:bg-teal-600 p-2 m-2 rounded"
              onClick={restartCourse}
            >
              Restart Course
            </button>
            <Link
              to="/dashboard"
              className="bg-teal-500 text-white hover:bg-teal-600 p-2 m-2 rounded"
            >
              Go to Dashboard
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default CoursePage;
