import React from "react";
import { Link } from "react-router-dom";

const Neurology = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-indigo-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Neurology Department</h1>
        <p className="mt-3 text-lg">
          Specialized care for brain and nervous system disorders
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            Advanced Neurological Treatment
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our neurology team provides expert diagnosis and treatment
            for stroke, epilepsy, migraines, Parkinson’s disease, and
            other neurological conditions using modern technology.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            Stroke Management
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Epilepsy Treatment
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Brain Imaging & Diagnostics
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            Neuro Rehabilitation
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <Link
            to="/appointment"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Neurology;
