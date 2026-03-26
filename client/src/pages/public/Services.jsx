import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-800 to-teal-600 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Our Medical Services
        </h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Our hospital is committed to delivering excellence in healthcare.
          With advanced medical infrastructure, highly qualified specialists,
          and compassionate patient care, we ensure comprehensive treatment
          across multiple specialties.
        </p>
      </section>

      {/* ABOUT SERVICES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Comprehensive Medical Care
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
            We provide a wide range of preventive, diagnostic, therapeutic,
            and rehabilitative services under one roof. Our multidisciplinary
            approach ensures patients receive coordinated and personalized
            treatment plans tailored to their medical needs.
          </p>
        </div>
      </section>

      {/* DEPARTMENTS GRID */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Specialized Departments
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = Icons[service.icon];

              return (
                <div
                  key={service._id}
                  className="group bg-white p-8 rounded-xl shadow-md border border-gray-200 transition duration-300 hover:bg-blue-700 hover:text-white hover:shadow-2xl"
                >
                  {IconComponent && (
                    <div className="text-4xl text-blue-600 mb-4 group-hover:text-white transition">
                      <IconComponent />
                    </div>
                  )}

                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>

                  <p className="mb-6 text-gray-600 group-hover:text-gray-100 transition">
                    {service.description}
                  </p>

                  <Link
                    to={`/departments/${service.slug}`}
                    className="font-semibold underline-offset-4 group-hover:underline"
                  >
                    View Department →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVANCED FACILITIES SECTION */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Advanced Facilities & Infrastructure
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "24/7 Emergency Services",
                desc: "Rapid response emergency care supported by trained medical professionals."
              },
              {
                title: "State-of-the-Art ICU",
                desc: "Fully equipped intensive care units with modern monitoring systems."
              },
              {
                title: "Advanced Diagnostic Lab",
                desc: "Comprehensive pathology and radiology services with precision reporting."
              },
              {
                title: "Modern Operation Theatres",
                desc: "High-tech surgical units ensuring safe and efficient procedures."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-lg shadow border hover:bg-teal-600 hover:text-white transition duration-300"
              >
                <h4 className="font-semibold text-lg mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600 group-hover:text-gray-100 transition text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Excellence in Healthcare
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Specialist Doctors" },
              { number: "10,000+", label: "Patients Treated Annually" },
              { number: "20+", label: "Departments" },
              { number: "15+", label: "Years of Service" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow hover:bg-blue-600 hover:text-white transition duration-300">
                <h3 className="text-4xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-800 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Schedule Your Consultation Today
        </h2>
        <p className="mb-6">
          Our medical experts are ready to provide you with the highest standard of care.
        </p>

        <Link
          to="/my-appointments"
          className="bg-white text-blue-800 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Book Appointment
        </Link>
      </section>

    </div>
  );
};

export default Services;