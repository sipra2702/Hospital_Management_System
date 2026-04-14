import { Link } from "react-router-dom";
import {
  FaBone,
  FaRunning,
  FaHandHoldingMedical,
  FaXRay,
  FaUserMd,
  FaClinicMedical,
} from "react-icons/fa";
import { GiKneeCap, GiSpinalCoil } from "react-icons/gi";

const Orthopedic = () => {
  const services = [
    {
      icon: <FaBone />,
      title: "Fracture & Trauma Care",
      description:
        "Emergency and elective management of bone fractures and musculoskeletal trauma with modern fixation techniques.",
    },
    {
      icon: <GiKneeCap />,
      title: "Joint Replacement",
      description:
        "Advanced hip, knee, and shoulder replacement surgeries using minimally invasive approaches for faster recovery.",
    },
    {
      icon: <GiSpinalCoil />,
      title: "Spine Surgery",
      description:
        "Comprehensive spinal care including disc herniation, scoliosis correction, and lumbar decompression procedures.",
    },
    {
      icon: <FaRunning />,
      title: "Sports Medicine",
      description:
        "Diagnosis and treatment of sports-related injuries including ligament tears, tendonitis, and cartilage damage.",
    },
    {
      icon: <FaHandHoldingMedical />,
      title: "Physiotherapy & Rehab",
      description:
        "Personalized rehabilitation programs to restore mobility, strength, and function after injury or surgery.",
    },
    {
      icon: <FaXRay />,
      title: "Diagnostic Imaging",
      description:
        "On-site X-ray, MRI, and CT imaging for accurate musculoskeletal diagnosis and treatment planning.",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Surgeries Performed" },
    { value: "98%", label: "Patient Satisfaction" },
    { value: "20+", label: "Years of Excellence" },
    { value: "15+", label: "Specialist Doctors" },
  ];

  return (
    <div className="bg-[#FAF6F2] min-h-screen font-sans pt-16">

      {/* ================= HERO ================= */}
      <div className="relative bg-gradient-to-r from-[#683B2B] to-[#4a2518] text-white py-16 text-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#D49E8D]/20 rounded-full blur-3xl top-[-100px] right-[-100px]" />
        <div className="absolute w-72 h-72 bg-[#B08401]/20 rounded-full blur-3xl bottom-[-80px] left-[-80px]" />
        <div className="absolute w-64 h-64 bg-[#ffffff]/5 rounded-full blur-2xl top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 text-sm text-[#DED1BD] tracking-widest uppercase">
              Musculoskeletal Health
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Orthopedic Department
          </h1>
          <p className="mt-4 text-[#DED1BD] text-lg max-w-xl mx-auto">
            Expert care for bones, joints, muscles & spine
          </p>
        </div>
      </div>

      {/* ================= STATS BAR ================= */}
      <div className="bg-[#683B2B] text-white">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-extrabold text-[#F5C842]">
                {stat.value}
              </div>
              <div className="text-sm text-[#DED1BD] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#B08401]">
            Comprehensive Orthopedic Care
          </h2>
          <p className="text-[#683B2B] mt-4 max-w-2xl mx-auto">
            From fracture management to joint replacement and spinal surgery, our
            orthopedic specialists deliver precision care tailored to restore
            your movement and quality of life.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-2xl shadow-md border border-[#DED1BD] hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-4xl text-[#683B2B] mb-4 group-hover:text-[#B08401] transition duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#683B2B] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <div className="bg-gradient-to-br from-[#683B2B] to-[#4a2518] rounded-3xl p-10 mb-20 text-white relative overflow-hidden">
          <div className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl -top-16 -right-16" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Why Choose Our Orthopedic Team?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <FaUserMd className="text-3xl mx-auto mb-3 text-[#F5C842]" />,
                  title: "Expert Surgeons",
                  desc: "Board-certified orthopedic surgeons with subspecialty training in joints, spine, and sports medicine.",
                },
                {
                  icon: <FaClinicMedical className="text-3xl mx-auto mb-3 text-[#F5C842]" />,
                  title: "Advanced Facilities",
                  desc: "State-of-the-art operation theaters, robotic-assisted surgery, and dedicated orthopedic wards.",
                },
                {
                  icon: <FaHandHoldingMedical className="text-3xl mx-auto mb-3 text-[#F5C842]" />,
                  title: "Holistic Recovery",
                  desc: "Integrated rehab and physiotherapy programs ensuring complete recovery and return to daily life.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  {item.icon}
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-[#DED1BD] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center bg-[#FAF6F2] border border-[#DED1BD] rounded-3xl py-14 px-6 shadow-inner">
          <h3 className="text-2xl font-bold text-[#683B2B] mb-3">
            Ready to Reclaim Your Mobility?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Book a consultation with our orthopedic specialists today and take
            the first step toward a pain-free life.
          </p>
          <Link
            to="/my-appointments"
            className="inline-block bg-[#B08401] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#8c6a00] hover:scale-105 transition duration-300"
          >
            Book Appointment →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Orthopedic;