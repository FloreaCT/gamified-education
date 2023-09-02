import React from "react";

const Courses = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Popular courses</h2>
      <p className="mb-8">
        These are some of our top-rated courses in various categories.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="bg-white p-4 rounded shadow">
          <div className="relative">
            <img
              src="/assets/images/computing_foundation.jpg"
              alt="Course"
              className="w-full rounded-t"
            />
            <div className="absolute top-2 right-2 flex items-center space-x-1 text-white bg-orange-300 rounded-lg px-2">
              <i className="fa fa-clock-o"></i>
              <span>3 Years</span>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center text-center justify-center">
            <div className="bg-teal-500 rounded w-[50%] ">
              <span className="text-sm text-white text-center items-center justify-center">
                Intermediar
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2">
              Computer Science <br />
              &nbsp;
            </h3>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1 text-yellow-400">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span className="ml-2 text-gray-600">4.9</span>
            </div>
            <div className="text-lg font-bold mt-2">£9250 / year</div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <i className="fa fa-user text-gray-500"></i>
                <span>250 enrolled</span>
              </div>
              <div className="border-l border-gray-300 h-4"></div>
              <div className="flex items-center space-x-1">
                <i className="fa fa-comment text-gray-500"></i>
                <span>20 modules</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="relative">
            <img
              src="/assets/images/computing.jpg"
              alt="Course"
              className="w-full rounded-t"
            />
            <div className="absolute top-2 right-2 flex items-center space-x-1 text-white bg-orange-300 rounded-lg px-2">
              <i className="fa fa-clock-o"></i>
              <span>4 Years</span>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center text-center justify-center">
            <div className="bg-teal-500 rounded w-[50%] ">
              <span className="text-sm text-white text-center items-center justify-center">
                Beginer
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2">
              Computing with Foundation year
            </h3>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1 text-yellow-400">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span className="ml-2 text-gray-600">4.9</span>
            </div>
            <div className="text-lg font-bold mt-2">£9250 / year</div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <i className="fa fa-user text-gray-500"></i>
                <span>250 enrolled</span>
              </div>
              <div className="border-l border-gray-300 h-4"></div>
              <div className="flex items-center space-x-1">
                <i className="fa fa-comment text-gray-500"></i>
                <span>23 modules</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="relative">
            <img
              src="/assets/images/computer_games.jpg"
              alt="Course"
              className="w-full rounded-t"
            />
            <div className="absolute top-2 right-2 flex items-center space-x-1 text-white bg-orange-300 rounded-lg px-2">
              <i className="fa fa-clock-o"></i>
              <span>3 Years</span>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center text-center justify-center">
            <div className="bg-teal-500 rounded w-[50%] ">
              <span className="text-sm text-white text-center items-center justify-center">
                Intermediar
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2">
              Computer Games (Art) <br /> &nbsp;
            </h3>

            <div className="flex items-center mt-2">
              <div className="flex space-x-1 text-yellow-400">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span className="ml-2 text-gray-600">4.7</span>
            </div>
            <div className="text-lg font-bold mt-2">£9250 / year</div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <i className="fa fa-user text-gray-500"></i>
                <span>168 enrolled</span>
              </div>
              <div className="border-l border-gray-300 h-4"></div>
              <div className="flex items-center space-x-1">
                <i className="fa fa-comment text-gray-500"></i>
                <span>17 modules</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="relative">
            <img
              src="/assets/images/architect.jpg"
              alt="Course"
              className="w-full rounded-t"
            />
            <div className="absolute top-2 right-2 flex items-center space-x-1 text-white bg-orange-300 rounded-lg px-2">
              <i className="fa fa-clock-o"></i>
              <span>3 Years</span>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center text-center justify-center">
            <div className="bg-teal-500 rounded w-[50%] ">
              <span className="text-sm text-white text-center items-center justify-center">
                Medium
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2">
              Architectural Design and Technology
            </h3>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1 text-yellow-400">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span className="ml-2 text-gray-600">4.9</span>
            </div>
            <div className="text-lg font-bold mt-2">£9250 / year</div>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center space-x-1">
                <i className="fa fa-user text-gray-500"></i>
                <span>250 enrolled</span>
              </div>
              <div className="border-l border-gray-300 h-4"></div>
              <div className="flex items-center space-x-1">
                <i className="fa fa-comment text-gray-500"></i>
                <span>20 modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
