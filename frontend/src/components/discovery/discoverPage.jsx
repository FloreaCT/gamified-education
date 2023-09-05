import React, { useContext, useEffect, useState } from "react";
import "./DiscoverPage.css";
import { useUser } from "../../utils/UserContext";

const DiscoverPage = () => {
  const [path, setPath] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [isDetermining, setIsDetermining] = useState(false);
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState(null);
  const [points, setPoints] = useState({ path1: 0, path2: 0, path3: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [hideItems, setHideItems] = useState(false);
  const [lastMessageIndex, setLastMessageIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [initialQuestions, setInitialQuestions] = useState([
    [
      "The questions on the right are to hard, i'll click this one",
      "I just came to learn, give me some 'Slack'",
      "I've hard AI can do anything, I wan't to see that!",
      "When can I 'Git' started?",
      "Click here to become a Jedi Master!",
    ],
    [
      "What is Big O notation used for?",
      "What is the difference between a stack and a queue?",
      "Can you explain what Git is",
      "What is the Model-View-Controller (MVC) design pattern?",
      "What is the difference between SQL and NoSQL databases?",
    ],
    [
      "Can you explain the concept of 'Inversion of Control'",
      "What is the CAP theorem in the context of distributed systems?",
      "How does a reverse proxy work",
      "Do you know any techniques for ensuring secure data transmission?",
      "What is a microservices architecture?",
    ],
  ]);
  const funnyMessages = [
    "Crunching the numbers...",
    "Consulting the Oracle...",
    "Asking the rubber duck...",
    "Deciphering the Matrix...",
    "Summoning the coding gods...",
    "Reading the tea leaves...",
    "Checking the stars...",
    "Running the simulations...",
    "Feeding the hamsters...",
    "Turning it off and on again...",
  ];

  const { user } = useUser();

  useEffect(() => {
    if (count === 6) setGameEnded(true);
  }, [count]);

  useEffect(() => {
    let timer;
    if (isDetermining) {
      timer = setInterval(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * funnyMessages.length);
        } while (randomIndex === lastMessageIndex); // Keep generating until we get a different index

        setCurrentMessageIndex(randomIndex);
        setLastMessageIndex(randomIndex); // Update the last index
      }, 1500); // Change message every second
    }

    return () => {
      clearInterval(timer); // Cleanup the interval
    };
  }, [isDetermining, lastMessageIndex]);

  useEffect(() => {
    if (selectedPath === "It's a tie!" || !selectedPath) {
      return;
    } else {
      const updateUserPath = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/updatePath", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              path: selectedPath,
            }),
          });

          if (response.ok) {
            const updatedUser = await response.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.error("Failed to update the user:", error);
        }
      };
      updateUserPath();
    }
  }, [selectedPath]);

  const handlePathClick = (path) => {
    setSelectedPath(path);
  };

  const generateNewQuestions = (path) => {
    if (path === "newby") {
      setPoints((prevPoints) => ({
        ...prevPoints,
        path1: prevPoints.path1 + 1,
      }));
    } else if (path === "adventure") {
      setPoints((prevPoints) => ({
        ...prevPoints,
        path2: prevPoints.path2 + 1,
      }));
    } else {
      setPoints((prevPoints) => ({
        ...prevPoints,
        path3: prevPoints.path3 + 1,
      }));
    }
    setCount(count + 1);
    setQuestion({
      1: `${initialQuestions[0][count]}`,
      2: `${initialQuestions[1][count]}`,
      3: `${initialQuestions[2][count]}`,
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setQuestion({
      1: "Newby come's with great sacrifice. Are you sure?",
      2: "Oh, look at you. Adventures are we?",
      3: "You like peace and quite? But will you get that?",
    });
  };

  const determineBestPath = () => {
    setIsDetermining(true);
    setHideItems(true);
    setCurrentMessageIndex(0);

    setTimeout(() => {
      const { path1, path2, path3 } = points;
      if (path1 > path2 && path1 > path3) {
        setSelectedPath("The Path of Newby");
        setIsDetermining(false);
        return;
      }
      if (path2 > path1 && path2 > path3) {
        setSelectedPath("The Path of Adventure");
        setIsDetermining(false);
        return;
      }
      if (path3 > path1 && path3 > path2) {
        setSelectedPath("The path of Jedi Master");
        setIsDetermining(false);
        return;
      }
      if (path1 === path2 || path1 === path3 || path2 === path3) {
        setIsDetermining(false);
        setSelectedPath("It's a tie!");
        return;
      }

      setIsDetermining(false);
    }, 1);

    return;
  };

  const resetGame = () => {
    setPoints({ path1: 0, path2: 0, path3: 0 });
    setQuestion(null);
    setSelectedPath(null);
    setGameEnded(false);
    setHideItems(false);
    setCount(0);
    startGame();
  };

  return (
    <div className="discovery-page inline-block">
      {user.pathStarted ? (
        <div className="bg-[#8B4513] rounded-lg text-white mt-10 m-4 p-4 text-center shadow-lg">
          It seems that you are already on "{user.pathStarted}"" young one.
          Please complete this path before moving to a new Adventure.
        </div>
      ) : (
        <>
          {!gameStarted && !hideItems ? (
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg mt-4">
              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome to Discovery of Your Path!
              </h1>
              <p className="text-white mb-6">
                Instructions: Click "Start" to begin. You'll be presented with
                questions under each path. Choose the one that resonates with
                you the most to discover your best path!
              </p>
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                onClick={startGame}
              >
                Start
              </button>
            </div>
          ) : !isDetermining && !hideItems ? (
            <div className="grid grid-cols-3 gap-4 items-start mt-32">
              <div
                className="flex flex-col items-center "
                onClick={() => handlePathClick(path[0])}
              >
                <div className="bg-[#8B4513] rounded-lg text-white m-4 p-4 text-center shadow-lg">
                  <h2 className="text-center text-2xl">
                    🌲 The Path of Newby 🌲
                  </h2>
                  <p>Learn everything like baby steps!</p>
                  <p>Assuming you don't know anything</p>
                </div>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => handlePathClick(path[1])}
              >
                <div className="bg-[#8B4513] rounded-lg text-white m-4 p-4 text-center shadow-lg">
                  <h2 className="text-cente text-2xl ">
                    🌳 The Path of Adventure 🌳
                  </h2>
                  <p>Embark on a thrilling journey!</p>
                  <p>Because you know what to pack!</p>
                </div>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => handlePathClick(path[2])}
              >
                <div className="bg-[#8B4513] rounded-lg text-white m-4 p-4 text-center shadow-lg">
                  <h2 className="text-center text-2xl">
                    🌿 The Path of Jedi Master 🌿
                  </h2>
                  <p>Unlock the secrets of the universe!</p>
                  <p>Because you know how to use the "Force"!</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {question && count !== 6 && (
            <div className="grid grid-cols-3 gap-4 items-center">
              <div
                className="flex flex-col items-center"
                onClick={() => generateNewQuestions("newby")}
              >
                <h2 className="text-center text-white bg-green-700 p-2 rounded-2xl hover:cursor-pointer">
                  🌲 {question[1]} 🌲
                </h2>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => generateNewQuestions("adventure")}
              >
                <h2 className="text-center text-white bg-green-700 p-2 rounded-2xl hover:cursor-pointer">
                  🌳 {question[2]} 🌳
                </h2>
              </div>
              <div
                className="flex flex-col items-center"
                onClick={() => generateNewQuestions("tranquility")}
              >
                <h2 className="text-center text-white bg-green-700 p-2 rounded-2xl hover:cursor-pointer">
                  🌿 {question[3]} 🌿
                </h2>
              </div>
            </div>
          )}
          {count === 6 && gameEnded && !isDetermining && !hideItems && (
            <div className="inline-block p-2">
              <div className="questions" onClick={() => determineBestPath()}>
                See which path is best for you
              </div>
            </div>
          )}
          {selectedPath && (
            <div className="text-center p-4 rounded-lg bg-teal-500 text-white text-2xl font-bold mt-4 inline-block">
              <div>
                {selectedPath === "It's a tie!" ? (
                  <div className="p-2">
                    <div>It's a tie!</div>
                    <button
                      type="button"
                      className="bg-red-400 p-2 mt-2 rounded-lg"
                      onClick={() => resetGame()}
                    >
                      {" "}
                      Reset{" "}
                    </button>
                  </div>
                ) : (
                  <div>
                    🎉 Congratulations! 🎉 <br />
                    You're path has been chosen{" "}
                    <span className="underline">
                      <br />
                      {selectedPath}
                    </span>{" "}
                    🚀
                  </div>
                )}
              </div>
            </div>
          )}
          {isDetermining ? (
            <div className="text-center p-4 rounded-lg mt-6 bg-yellow-300 text-black text-xl font-bold inline-block">
              <div className="animate-spin">🤔</div>
              {funnyMessages[currentMessageIndex]}
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}
    </div>
  );
};

export default DiscoverPage;
