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
import { Fragment } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Questionnaire from "./components/avatar/Questionnaire";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
