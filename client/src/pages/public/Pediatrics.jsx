import React from "react";
import { Link } from "react-router-dom";

const Pediatrics = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-pink-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Pediatrics Department</h1>
        <p className="mt-3 text-lg">
          Compassionate healthcare for children
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Child-Centered Medical Care
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our pediatric specialists provide preventive care,
            vaccinations, and treatment for childhood illnesses
            in a safe and friendly environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            Vaccinations
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Newborn Care
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Growth Monitoring
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Pediatric Emergency Care
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/appointment"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pediatrics;
