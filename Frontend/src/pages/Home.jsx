import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 flex justify-end w-full pr-8">
        <h1 className="mr-auto pl-10 font-extrabold text-4xl text-emerald-600">
          Events
        </h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <h1 className="text-center font-semibold mt-15 text-3xl">
        WELCOME TO EVENT MANAGEMENT
      </h1>
      <img
        className="mt-8 rounded-2xl w-[90%] text-center"
        src="https://cdn.evbstatic.com/s3-build/fe/build/images/bb8b2f325ba34836306ead1ce1e3abfd-valentine_nightlife_desktop.webp"
        alt=""
      />
    </div>
  );
};

export default Home;
