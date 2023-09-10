import "./App.css";
import StudentSignin from "./components/StudentSignin";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import FooterLinks from "./components/FooterLinks";
import Courses from "./components/Courses";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Questionnaire from "./components/avatar/Questionnaire";
import { UserProvider } from "./utils/UserContext";
import { EventContext } from "./utils/EventContext";
import io from "socket.io-client";

function App() {
  const { latestEvent, setLatestEvent } = useContext(EventContext);

  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("eventTriggered", (eventData) => {
      // Handle the event here
      if (eventData.type === "achievement") {
        console.log("New achievement earned:", eventData.detail);
        setLatestEvent({ type: "achievement", detail: eventData.detail });
      } else if (eventData.type === "badge") {
        console.log("New badge earned:", eventData.detail);
        setLatestEvent({ type: "badge", detail: eventData.detail });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [setLatestEvent]);

  return (
    <div className="App">
      <UserProvider>
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
        <div className="achievement-modal fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 w-64 animate__animated animate__fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">New Achievement!</h2>
              <button
                onClick={() => setLatestEvent(null)}
                className="text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <p className="mt-2">{latestEvent.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
