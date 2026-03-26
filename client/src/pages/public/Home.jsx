import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-white text-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Smart Hospital <br /> Management System
            </h1>

            <p className="text-gray-600 text-lg">
              Manage appointments, doctors, patients, and medical records
              with our modern hospital management platform.
            </p>
 
            {!user ? (
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-7 py-3 rounded-lg font-semibold hover:bg-green-600"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="border border-gray-400 px-7 py-3 rounded-lg hover:bg-gray-200"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="bg-green-500 px-7 py-3 rounded-lg font-semibold hover:bg-green-600 text-white"
              >
                Go To Dashboard
              </Link>
            )}
          </div>

          <div className="md:w-1/2">
            <img
              src="https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg"
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
          <Service title="Doctor Appointments" desc="Book appointments with specialist doctors quickly." />
          <Service title="Patient Records" desc="Securely store and manage patient health records." />
          <Service title="Emergency Care" desc="24/7 emergency healthcare services available." />
          <Service title="Medical Reports" desc="Access reports and prescriptions digitally." />
          <Service title="Hospital Departments" desc="Multiple specialized medical departments." />
          <Service title="Online Consultation" desc="Consult doctors remotely through digital platform." />
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:flex gap-12 items-center">

          <div className="md:w-1/2">
            <img
              src="https://www.shutterstock.com/image-vector/professional-medical-team-white-coats-gathers-2727704655"
              alt="Hospital"
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
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
          <Doctor name="Dr. Rahul Sharma" dept="Cardiologist" />
          <Doctor name="Dr. Anjali Verma" dept="Neurologist" />
          <Doctor name="Dr. Amit Singh" dept="Orthopedic" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-100 text-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 text-center gap-8">
          <Stat number="150+" label="Doctors" />
          <Stat number="25K+" label="Patients" />
          <Stat number="50+" label="Departments" />
          <Stat number="24/7" label="Emergency Support" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">
          Experience Modern Healthcare
        </h2>

        {!user && (
          <Link
            to="/register"
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Join Now
          </Link>
        )}
      </section>

    </div>
  );
};

/* COMPONENTS */

const Service = ({ title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg">
    <h3 className="text-xl font-semibold mb-2 text-green-600">{title}</h3>
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
