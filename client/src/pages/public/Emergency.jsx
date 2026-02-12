import React from "react";
import { Link } from "react-router-dom";

const Emergency = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-red-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Emergency Department</h1>
        <p className="mt-3 text-lg">
          24/7 Immediate medical assistance
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Fast & Reliable Emergency Care
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our emergency department operates 24/7 to handle critical
            cases including accidents, heart attacks, trauma, and urgent conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            Trauma Care
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Ambulance Services
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Critical Care Unit
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            24/7 Emergency Support
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/appointment"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
