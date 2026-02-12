import React from "react";
import { Link } from "react-router-dom";

const Cardiology = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Cardiology Department</h1>
        <p className="mt-3 text-lg">
          Advanced heart care with experienced specialists
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Description */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Comprehensive Heart Care
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our cardiology department provides diagnosis, treatment,
            and preventive care for heart-related conditions including
            hypertension, coronary artery disease, heart failure,
            and arrhythmias using modern medical technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            ECG & Echocardiography
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Heart Health Checkups
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Cardiac Rehabilitation
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Emergency Cardiac Care
          </div>
        </div>

        {/* Appointment Button */}
        <div className="text-center">
          <Link
            to="/appointment"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Book an Appointment
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Cardiology;
