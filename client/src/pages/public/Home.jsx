import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">

        {/* LEFT */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Smart Healthcare <br />
            <span className="text-blue-600">For Your Family</span>
          </h1>

          <p className="text-lg text-gray-600">
            Book appointments, manage medical records, and access reports
            anytime with our secure and intelligent hospital management system.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-7 py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white border border-blue-600 text-blue-600 px-7 py-3 rounded-xl shadow hover:bg-blue-50 hover:scale-105 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-600 text-white px-7 py-3 rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition"
              >
                Go to Dashboard
              </Link>
            )}

          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg"
            alt="Doctor"
            className="w-full max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

      </section>


      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose Our System
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition">
            <div className="text-blue-600 text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">
              Easy Appointment Booking
            </h3>
            <p className="text-gray-600">
              Schedule doctor visits quickly without waiting in long queues.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition">
            <div className="text-blue-600 text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">
              Secure Medical Reports
            </h3>
            <p className="text-gray-600">
              Access your health records safely anytime, anywhere.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition">
            <div className="text-blue-600 text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold mb-2">
              Doctor Management
            </h3>
            <p className="text-gray-600">
              Efficiently manage doctors, patients, and hospital data.
            </p>
          </div>

        </div>

      </section>


      {/* CALL TO ACTION */}
      <section className="bg-blue-600 text-white text-center py-16">

        <h2 className="text-3xl font-bold mb-4">
          Your Health, Our Responsibility
        </h2>

        <p className="mb-6 text-blue-100">
          Join today and experience modern healthcare management.
        </p>

        {!user && (
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 hover:scale-105 transition"
          >
            Get Started Now
          </Link>
        )}

      </section>


      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-gray-400">
          © 2026 Hospital Management System • All Rights Reserved
        </p>
      </footer>


    </div>
  );
};

export default Home;
