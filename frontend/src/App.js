import "./App.css";
import StudentSignin from "./components/StudentSignin";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import FooterLinks from "./components/FooterLinks";
import { animated, useSpring } from "react-spring";
import Courses from "./components/Courses";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Questionnaire from "./components/avatar/Questionnaire";
import { UserProvider, useUser } from "./utils/UserContext";
import { EventContext } from "./utils/EventContext";
import io from "socket.io-client";

function App() {
  const { latestEvent, setLatestEvent } = useContext(EventContext);
  const messageStyles = useSpring({
    opacity: latestEvent ? 1 : 0,
    transform: latestEvent ? "translate3d(0,0,0)" : "translate3d(0,-40px,0)",
  });

  useEffect(() => {
    const socket = io("http://localhost:3002");
    socket.on("eventTriggered", (eventData) => {
      // Handle the event here
      if (eventData.type === "achievement") {
        setLatestEvent({ ...eventData });
      } else if (eventData.type === "badge") {
        setLatestEvent({ type: "badge", detail: eventData.detail });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [setLatestEvent]);

  return (
    <div className="App">
      <UserProvider latestEvent={latestEvent}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <Nav />
                  <Hero />
                  <Features />
                  <Categories />
                  <Courses />
                  <Footer />
                </Fragment>
              }
            />
            <Route path="/student/signin" element={<StudentSignin />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="avatar-creation" element={<Questionnaire />} />
          </Routes>
        </Router>
      </UserProvider>
      {latestEvent && latestEvent.type === "achievement" && (
        <div
          className="achievement-modal fixed inset-0 flex items-center justify-center z-9999999"
          onClick={() => setLatestEvent(null)}
        >
          <animated.div
            style={messageStyles}
            className="flex bg-green-500 text-white rounded-lg shadow-lg p-6 w-64"
            onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking on it
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold">
                New achivement: "{latestEvent.name}"
              </h2>
              <img
                src={latestEvent.icon}
                alt="Achievement icon"
                className="flex justify-center"
              />
              <h2 className="text-2xl font-bold">{latestEvent.details}</h2>
              <button
                onClick={() => setLatestEvent(null)}
                className="flex bg-purple-500 rounded-lg p-1 mt-4 text-white text-lg"
              >
                Close
              </button>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
}

export default App;
