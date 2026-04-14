// Neurology.jsx
import { Link } from "react-router-dom";
import { FaBrain, FaHeartbeat } from "react-icons/fa";

const Neurology = () => {
  return (
    <div className="bg-[#FAF6F2] min-h-screen font-sans pt-16"> {/* ← added pt-16 */}

      {/* ================= HERO ================= */}
      <div className="relative bg-linear-to-r from-[#683B2B] to-[#4a2518] text-white py-12 text-center overflow-hidden">
        {/* rest stays exactly the same... */}

        {/* Glow effect */}
        <div className="absolute w-96 h-96 bg-[#D49E8D]/20 rounded-full blur-3xl top-[-100px] right-[-100px]" />
        <div className="absolute w-72 h-72 bg-[#B08401]/20 rounded-full blur-3xl bottom-[-80px] left-[-80px]" />

        <h1 className="text-4xl md:text-5xl font-extrabold relative z-10">
          Neurology Department
        </h1>
        <p className="mt-4 text-[#DED1BD] text-lg relative z-10">
          Advanced brain & nervous system care
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#B08401]">
            Expert Neurological Care
          </h2>
          <p className="text-[#683B2B] mt-4 max-w-2xl mx-auto">
            We provide specialized treatment for brain, spine, and nervous system
            disorders using advanced technology and experienced specialists.
          </p>
        </div>

        {/* ================= SERVICES ================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* Card 1 */}
          <div className="group bg-white p-8 rounded-2xl shadow-md border border-[#DED1BD] hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl text-[#683B2B] mb-4 group-hover:text-[#B08401] transition">
              <FaBrain />
            </div>
            <h3 className="text-xl font-semibold text-[#683B2B] mb-2">
              Stroke Management
            </h3>
            <p className="text-gray-600">
              Immediate diagnosis and treatment of strokes with advanced
              neurological monitoring and recovery programs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-8 rounded-2xl shadow-md border border-[#DED1BD] hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl text-[#683B2B] mb-4 group-hover:text-[#B08401] transition">
              <FaHeartbeat />
            </div>
            <h3 className="text-xl font-semibold text-[#683B2B] mb-2">
              Epilepsy Treatment
            </h3>
            <p className="text-gray-600">
              Comprehensive epilepsy care including diagnosis, medication,
              and long-term neurological management.
            </p>
          </div>

        </div>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <Link
            to="/my-appointments"
            className="inline-block bg-[#B08401] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#8c6a00] hover:scale-105 transition duration-300"
          >
            Book Appointment →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Neurology;