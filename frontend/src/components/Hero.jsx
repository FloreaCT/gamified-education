import React from "react";

function Hero() {
  return (
    <div
      className="w-full h-[73vh] mt-2 text-white flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/images/hero.jpg')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex py-20 items-center justify-center flex-col bg-black bg-opacity-20 rounded-3xl">
        <div className="text-center lg:w-5/12 w-full">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            The place where the educations meets gamification
          </h1>
          <p className="text-2xl mb-8">
            Let your education achieve the next level with our gamification
            platform
          </p>
          <div className="flex justify-center mx-auto">
            <button className="bg-white text-gray-800 font-bold rounded-full  py-4 px-8 mr-2">
              Meet our Teachers
              <img
                src="/assets/images/teachers.png"
                alt="teachers"
                className="ml-2"
              />
            </button>
            <button className="ml-4an bg-white text-gray-800 font-bold rounded-full  py-4 px-8 ml-2">
              View our Courses
              <img
                src="/assets/images/courses.png"
                alt="courses"
                className="ml-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
