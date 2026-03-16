import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Smart Hospital <br /> Management System
            </h1>

            <p className="text-blue-100 text-lg">
              Manage appointments, doctors, patients, and medical records
              with our modern hospital management platform.
            </p>

            {!user ? (
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-blue-700"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-500 px-7 py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Go To Dashboard
              </Link>
            )}
          </div>

          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309"
              alt="Hospital"
              className="rounded-2xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Service
            title="Doctor Appointments"
            desc="Book appointments with specialist doctors quickly."
          />

          <Service
            title="Patient Records"
            desc="Securely store and manage patient health records."
          />

          <Service
            title="Emergency Care"
            desc="24/7 emergency healthcare services available."
          />

          <Service
            title="Medical Reports"
            desc="Access reports and prescriptions digitally."
          />

          <Service
            title="Hospital Departments"
            desc="Multiple specialized medical departments."
          />

          <Service
            title="Online Consultation"
            desc="Consult doctors remotely through digital platform."
          />

        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:flex gap-12 items-center">

          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1576765608866-5b51046452be"
              alt="Hospital"
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 space-y-6">
            <h2 className="text-4xl font-bold text-blue-700">
              About Our Hospital
            </h2>

            <p className="text-gray-600">
              Our hospital management system helps hospitals automate
              administrative tasks, improve patient care, and manage
              medical data efficiently.
            </p>

            <p className="text-gray-600">
              With advanced technology and experienced doctors,
              we ensure the best healthcare services for everyone.
            </p>
          </div>

        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-20 bg-gray-100">

        <h2 className="text-4xl font-bold text-center mb-12">
          Hospital Departments
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">

          <Department name="Cardiology" />
          <Department name="Neurology" />
          <Department name="Orthopedics" />
          <Department name="Pediatrics" />
          <Department name="Radiology" />
          <Department name="Dermatology" />
          <Department name="Oncology" />
          <Department name="General Medicine" />

        </div>

      </section>

      {/* DOCTORS */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Our Doctors
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <Doctor
            name="Dr. Rahul Sharma"
            dept="Cardiologist"
          />

          <Doctor
            name="Dr. Anjali Verma"
            dept="Neurologist"
          />

          <Doctor
            name="Dr. Amit Singh"
            dept="Orthopedic"
          />

        </div>

      </section>

      {/* STATS */}
      <section className="bg-blue-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 text-center gap-8">

          <Stat number="150+" label="Doctors" />
          <Stat number="25K+" label="Patients" />
          <Stat number="50+" label="Departments" />
          <Stat number="24/7" label="Emergency Support" />

        </div>

      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-gray-100 text-center">

        <h2 className="text-4xl font-bold mb-8">
          What Our Patients Say
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 italic">
          "This hospital management system is very easy to use.
          Booking appointments and getting reports is very fast."
        </p>

        <h4 className="mt-6 font-semibold">
          — Patient Review
        </h4>

      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white text-center py-20">

        <h2 className="text-4xl font-bold mb-6">
          Experience Modern Healthcare
        </h2>

        {!user && (
          <Link
            to="/register"
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Join Now
          </Link>
        )}

      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-white text-center">

        <h3 className="text-2xl font-bold mb-4">
          Subscribe for Health Tips
        </h3>

        <div className="flex justify-center gap-4 mt-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-2 rounded-lg"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Subscribe
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              Smart Healthcare
            </h3>
            <p>
              Modern hospital management system for efficient
              healthcare services.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Doctors</li>
              <li>Departments</li>
              <li>Appointments</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-3">Contact</h3>
            <p>Email: hospital@gmail.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

        </div>

        <p className="text-center mt-8 text-gray-500">
          © 2026 Hospital Management System
        </p>

      </footer>

    </div>
  );
};

const Service = ({ title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg">
    <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const Department = ({ name }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center font-semibold">
    {name}
  </div>
);

const Doctor = ({ name, dept }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <img
      src="https://via.placeholder.com/150"
      className="mx-auto rounded-full mb-4"
      alt="doctor"
    />
    <h4 className="font-semibold">{name}</h4>
    <p className="text-gray-500">{dept}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-3xl font-bold">{number}</h3>
    <p>{label}</p>
  </div>
);

export default Home;
