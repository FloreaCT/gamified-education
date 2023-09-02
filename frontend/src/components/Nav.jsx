import React from "react";
import { useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import TopBand from "./TopBand";

const TopNav = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const location = useLocation(); // Get the current location

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  const toggleMenu = () => {
    setIsMenuHidden((prevIsMenuHidden) => !prevIsMenuHidden);
  };

  return (
    <Fragment>
      <TopBand />
      <header>
        <nav
          className="
          flex flex-row
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg
          text-gray-700
          bg-white
          overflow-x-auto
        "
        >
          <div className="flex-shrink-0">
            <a href="/">
              <img
                src="/assets/images/logo.png"
                className="w-32 md:w-48 h-24 md:h-36 pt-2"
                alt="logo"
              />
            </a>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={toggleMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div
            className={`${
              isMenuHidden ? "hidden" : ""
            } w-full md:flex md:items-center md:w-auto`}
            id="menu"
            onClick={toggleMenu}
          >
            <ul
              className="
             pt-4
             text-2xl text-gray-700
             md:flex
             md:justify-between 
             md:pt-0"
            >
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/courses")
                      ? "text-purple-600"
                      : "text-teal-500"
                  }`}
                  href="/courses"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/student-experience")
                      ? "text-purple-600"
                      : "text-teal-500"
                  }`}
                  href="/student-experience"
                >
                  Student experience
                </a>
              </li>
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/why-gamified-edu")
                      ? "text-purple-600"
                      : "text-teal-500"
                  }`}
                  href="/why-gamified-edu"
                >
                  Why Gamified Edu?
                </a>
              </li>
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/alumni")
                      ? "text-purple-600"
                      : "text-teal-500"
                  }`}
                  href="/alumni"
                >
                  Alumni
                </a>
              </li>
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/services")
                      ? "text-purple-600"
                      : "text-teal-500"
                  }`}
                  href="/services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className={`md:p-4 py-2 block hover:text-teal-300 ${
                    isActiveLink("/About") ? "text-purple-600" : "text-teal-500"
                  }`}
                  href="/About"
                >
                  About
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="bg-teal-500 font-medium text-white rounded-lg mx-2 py-3 px-6"
            >
              Apply Today!{" "}
            </button>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default TopNav;
