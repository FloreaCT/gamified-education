import React from "react";
import { FaChalkboardTeacher, FaGamepad, FaLaptopCode } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";

const Features = () => {
  return (
    <div className="bg-teal-500 p-8 mt-1">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-20">
        <div className="flex items-center space-x-4 mb-4 md:mb-0 border-r border-white border-opacity-30 px-4">
          <div className="bg-white bg-opacity-20 rounded-full p-4 transition-transform transform-gpu hover:scale-110">
            <FaLaptopCode className="h-16 w-16 text-white" />
          </div>
          <div className="text-white text-xl">
            <div>1000+</div>
            <div>Courses</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0 border-r border-white border-opacity-30 px-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0 ">
            <div className="bg-white bg-opacity-20 rounded-full p-4 transition-transform transform-gpu hover:scale-110">
              <FaChalkboardTeacher className="h-16 w-16 text-white" />
            </div>
          </div>
          <div className="text-white text-xl">
            <div>Top</div>
            <div>Instructors</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0 border-r border-white border-opacity-30 px-4">
          <div className="bg-white bg-opacity-20 rounded-full p-4 transition-transform transform-gpu hover:scale-110">
            <PiCertificate className="h-16 w-16 text-white" />
          </div>
          <div className="text-white text-xl">
            <div>Showcase</div>
            <div>Your awards</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0 px-4 transition-transform transform-gpu hover:scale-110">
          <div className="bg-white bg-opacity-20 rounded-full p-4">
            <FaGamepad className="h-16 w-16 text-white" />
          </div>
          <div className="text-white text-xl">
            <div>Gamified</div>
            <div>Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
