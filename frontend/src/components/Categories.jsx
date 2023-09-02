import React from "react";
import {
  FaArchway,
  FaBusinessTime,
  FaCameraRetro,
  FaDatabase,
  FaHandshake,
  FaLaptop,
  FaMegaport,
  FaPills,
  FaSchool,
} from "react-icons/fa";

const Categories = () => {
  return (
    <div className=" p-8 font-bold">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Top Categories</h2>
          <p className="mt-2">
            Our top gamified courses in the most popular categories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div className=" p-4 rounded-lg bg-green-100 hover:text-white hover:bg-green-300 transition duration-300">
            <div className="flex items-center ">
              <FaBusinessTime className="w-16 h-16 text-green-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Business Management</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-red-100 hover:text-white hover:bg-red-300 transition duration-300">
            <div className="flex items-center">
              <FaArchway className="w-16 h-16 text-red-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Arts & Design</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-teal-100 hover:text-white hover:bg-teal-300 transition duration-300">
            <div className="flex items-center">
              <FaSchool className="w-16 h-16 text-teal-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Personal Development</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-orange-100 hover:text-white hover:bg-orange-300 transition duration-300">
            <div className="flex items-center">
              <FaPills className="w-16 h-16 text-orange-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Health & Fitness</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-purple-100 hover:text-white hover:bg-purple-300 transition duration-300">
            <div className="flex items-center">
              <FaDatabase className="w-16 h-16 text-purple-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Data Science</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-pink-100 hover:text-white hover:bg-pink-300 transition duration-300">
            <div className="flex items-center">
              <FaMegaport className="w-16 h-16 text-pink-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Marketing</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-blue-100 hover:text-white hover:bg-blue-300 transition duration-300">
            <div className="flex items-center">
              <FaHandshake className="w-16 h-16 text-blue-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Business & Finance</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-cyan-100 hover:text-white hover:bg-cyan-300 transition duration-300">
            <div className="flex items-center">
              <FaLaptop className="w-16 h-16 text-cyan-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Computer Science</h5>
              </a>
            </div>
          </div>
          <div className=" p-4 rounded-lg bg-yellow-100 hover:text-white hover:bg-yellow-300 transition duration-300">
            <div className="flex items-center">
              <FaCameraRetro className="w-16 h-16 text-yellow-600" />
              <a href="/course-style-1" className="ml-4">
                <h5>Video & Photography</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
