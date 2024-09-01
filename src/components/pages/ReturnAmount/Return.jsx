"use client";
import React from "react";
import Link from "next/link";

const Return = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Anon Detect Dashboard</h1>
          <p className="text-lg mb-6">Stay informed and secure. Manage your privacy with ease.</p>
          <Link href="/anon-detect">
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
              Explore Anon Detect
            </button>
          </Link>
        </div>
        <img
          src="https://anondetect.netlify.app/hero/hero.svg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat Cards */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <img
              src="https://anondetect.netlify.app/hero/hero-3.png"
              alt="Total Scans"
              className="mx-auto mb-6 h-16"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Scans</h2>
            <p className="text-3xl font-bold text-green-600">5,000</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <img
              src="https://anondetect.netlify.app/hero/hero-2.png"
              alt="Threats Detected"
              className="mx-auto mb-6 h-16"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Threats Detected</h2>
            <p className="text-3xl font-bold text-red-600">200</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <img
              src="https://anondetect.netlify.app/hero/hero-2.png"
              alt="Pending Reviews"
              className="mx-auto mb-6 h-16"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Pending Reviews</h2>
            <p className="text-3xl font-bold text-yellow-600">30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Return;
