import React from "react";
import { Link } from "react-router-dom/dist";

const HomePage = () => {
  return (
    <div className="">
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hostels.webp"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to  HostelHub
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover amazing Hostels, food and services that await you. Book your favorite hostel now
          </p>
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
        <div className="absolute bottom-5 right-5 text-xl font-bold text-yellow-300">
          {" "}
          For Hostel Owner Click below link
          <p className="flex justify-center">
            <button className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 -960 960 960"
                width="48px"
                fill="#f2d811"
              >
                <path d="m480-332 146-146-42-42-74 74v-182h-60v182l-74-74-42 42 146 146Zm0 252q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
              </svg>
            </button>
          </p>
        </div>
      </div> 
      <a href="/login-admin" className="text-start bg-blue-600 text-2xl font-bold text-white border p-5 rounded-s-xl rounded-e-xl">I am Admin</a>
      <div className=" text-end">
       
        <Link
          to="/login-hostel"
          className="bg-yellow-400 text-end text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Are you hostel owner? want to Register/Login for your hostel ? <span className="text-blue-500 underline">Click
          here</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
