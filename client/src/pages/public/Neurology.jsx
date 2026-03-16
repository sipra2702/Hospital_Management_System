import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaHeartbeat,
  FaHospital,
  FaAmbulance,
  FaStethoscope,
  FaXRay,
  FaNotesMedical,
  FaShieldAlt,
} from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* ================= FLOATING EMERGENCY BUTTON ================= */}
      <a
        href="tel:+911234567890"
        className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-red-700 transition z-50"
      >
        🚑 Emergency
      </a>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Smart Hospital <br /> Management System
            </h1>

            <p className="text-blue-100 text-lg">
              Advanced digital healthcare platform for appointments,
              patient records, reports, billing, and doctor management.
            </p>

            <div className="flex gap-4 flex-wrap">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-green-500 px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
              alt="Hospital"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-blue-700">
          Our Smart Services
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <Service icon={<FaUserMd />} title="Expert Doctors" />
          <Service icon={<FaHeartbeat />} title="Cardiology Care" />
          <Service icon={<FaHospital />} title="Modern ICU" />
          <Service icon={<FaAmbulance />} title="24/7 Emergency" />
          <Service icon={<FaStethoscope />} title="General Checkup" />
          <Service icon={<FaXRay />} title="X-Ray & Scan" />
          <Service icon={<FaNotesMedical />} title="Digital Reports" />
          <Service icon={<FaShieldAlt />} title="Secure Data" />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:flex gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
              alt="About"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 space-y-6">
            <h2 className="text-4xl font-bold text-blue-700">
              About Our Hospital
            </h2>
            <p className="text-gray-600">
              We integrate AI-based healthcare solutions, secure patient
              data management, telemedicine support, and automated
              appointment systems to deliver efficient healthcare.
            </p>
            <p className="text-gray-600">
              Our mission is to provide affordable, accessible, and
              advanced medical services to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 text-center gap-8">
          <Stat number="200+" label="Doctors" />
          <Stat number="30K+" label="Patients" />
          <Stat number="75+" label="Departments" />
          <Stat number="24/7" label="Emergency Support" />
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-24 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-8 text-blue-700">
          What Patients Say
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 italic">
          "The hospital management system is smooth and very professional.
          Booking appointments and accessing reports is extremely easy."
        </p>
        <h4 className="mt-6 font-semibold">— Rahul Sharma</h4>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">
          Experience Next-Level Healthcare
        </h2>
        {!user && (
          <Link
            to="/register"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            Join Now
          </Link>
        )}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Smart Healthcare HMS
        </h3>
        <p>© 2026 Hospital Management System. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

const Service = ({ icon, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl text-center"
  >
    <div className="text-blue-600 text-4xl mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
  </motion.div>
);

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-4xl font-bold">{number}</h3>
    <p className="mt-2">{label}</p>
  </div>
);

export default Home;
