import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const TopBand = () => {
  return (
    <div className="flex bg-slate-700 text-white p-2">
      <div className="flex-grow text-left">
        <div className="header-notify">
          First 10 students get 50% discount.{" "}
          <a className="hover:text-teal-300 underline text-red-400" href="#">
            Hurry up!
          </a>
        </div>
      </div>
      <div className="flex items-center flex-end">
        <ul className="flex items-center">
          <li className="hover:text-teal-300 border-r border-gray-500">
            <a href="#" className="px-4">
              Staff Login
            </a>
          </li>
          <li className="hover:text-teal-300 border-r border-gray-500">
            <a href="/student/signin" className="px-4">
              Student Portal
            </a>
          </li>
          <li className="hover:text-teal-300 border-r border-gray-500">
            <a href="#" className="px-4">
              Call: +44 777 777 7777
            </a>
          </li>
          <li className="hover:text-teal-300 border-r border-gray-500">
            <a href="#" className="px-4">
              Email: info@gamified-education.com
            </a>
          </li>
          <li className="flex space-x-4 px-4">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBand;
