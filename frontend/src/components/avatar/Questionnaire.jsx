import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Avatar from "./Avatar";

const questions = [
  {
    id: 1,
    text: "1. Hey there, future Avatar! Are you a dude, a dudette, or something fabulously in between? 🌈",
    options: ["Mr. Awesome", "Ms. Fabulous", "Enby Star", "I'm a Mystery!"],
  },
  {
    id: 2,
    text: "What's your go-to dance move when no one's watching? 🕺💃",
    options: [
      "The Robot",
      "Moonwalk",
      "Floss Like a Boss",
      "The Invisible Lasso",
    ],
  },
  {
    id: 3,
    text: "3. If you were a superhero, what would be your superpower? 🦸‍♂️🦸‍♀️",
    options: [
      "Flying High",
      "Invisibility Cloak",
      "Time Traveler",
      "Mind Reader",
    ],
  },
  {
    id: 4,
    text: "4. What's your spirit animal when you're conquering the world? 🌍🐾",
    options: ["Majestic Eagle", "Sly Fox", "Brave Lion", "Wise Owl"],
  },
  {
    id: 5,
    text: "5. If you had a theme song, what genre would it be? 🎵🎶",
    options: [
      "Rock 'n' Roll Baby!",
      "Hip-Hop Yo!",
      "Classical Elegance",
      "EDM All Night",
    ],
  },
];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showProgressBar, setProgressBar] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowAvatar(true);
        setShowLoading(false);
      }, 3000); // 3 seconds delay

      return () => {
        setShowAvatar(true);
        clearTimeout(timer);
      };
    }
  }, [showLoading]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    const nextQuestionIndex = currentQuestionIndex + 1;

    // Update answers
    setAnswers(newAnswers);

    if (nextQuestionIndex < questions.length) {
      // Move to the next question
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // All questions answered
      setShowLoading(true);
      setProgressBar(false);
      console.log("All questions answered!", newAnswers);
    }

    // Update progress
    setProgress((nextQuestionIndex / questions.length) * 100);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showProgressBar && <ProgressBar progress={progress} />}
      {showLoading && (
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C1.8 0 0 1.8 0 4s1.8 4 4 4z"
            ></path>
          </svg>
          <p className="mt-2">Creating your super awesome avatar... 🎨🤪</p>
        </div>
      )}
      {showProgressBar ? (
        <div className="text-center mt-8">
          <p className="text-2xl">{currentQuestion.text}</p>
          <div className="mt-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        showAvatar && <Avatar answers={answers} /> // Pass the answers to the Avatar component
      )}
    </div>
  );
};

export default Questionnaire;
