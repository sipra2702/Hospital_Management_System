import React from "react";
import { Link } from "react-router-dom";

const Orthopedics = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-green-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Orthopedics Department</h1>
        <p className="mt-3 text-lg">
          Advanced bone and joint care
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Complete Orthopedic Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We specialize in fracture management, joint replacement,
            sports injuries, and spine disorders with expert orthopedic surgeons.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            Joint Replacement
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Sports Injury Treatment
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Spine Surgery
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Fracture & Trauma Care
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/appointment"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orthopedics;
