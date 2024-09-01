"use client";
import React from "react";
import Link from "next/link";

const Return = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center">
      {/* Content Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to Anon Detect Production Dashboard
        </h1>
        <p className="text-lg md:text-2xl font-light">
          Its Just the Beginning
        </p>
        <p className="text-sm md:text-xl italic">
          Something new is cooking... ha ha ha!
        </p>
        <Link href="/project-add">
          <button className="mt-8 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
            Make a Blog Post
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Return;
