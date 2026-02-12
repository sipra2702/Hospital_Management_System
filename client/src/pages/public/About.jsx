import React from 'react';
import { 
  FaHeartbeat, 
  FaUserMd, 
  FaHospital, 
  FaAward, 
  FaUsers, 
  FaAmbulance,
  FaClock,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const About = () => {
  // Hospital statistics
  const stats = [
    { icon: <FaUserMd />, value: '200+', label: 'Expert Doctors' },
    { icon: <FaHospital />, value: '50+', label: 'Departments' },
    { icon: <FaUsers />, value: '500+', label: 'Medical Staff' },
    { icon: <FaAmbulance />, value: '24/7', label: 'Emergency Service' },
    { icon: <FaAward />, value: '25+', label: 'Years Experience' },
    { icon: <FaHeartbeat />, value: '5000+', label: 'Happy Patients' }
  ];

  // Core values
  const values = [
    {
      title: 'Patient-Centered Care',
      description: 'We put our patients at the heart of everything we do, ensuring their comfort and well-being.'
    },
    {
      title: 'Medical Excellence',
      description: 'Our team of specialists provides world-class medical treatment using advanced technology.'
    },
    {
      title: 'Compassion & Empathy',
      description: 'We treat every patient with kindness, respect, and understanding during their healing journey.'
    },
    {
      title: 'Innovation & Research',
      description: 'Continuously advancing medical science through research and innovative treatments.'
    }
  ];

  // Leadership team
  const team = [
    {
      name: 'Dr. Debasis Rout (Senior Doctor)',
      position: 'Chief Medical Officer',
      experience: '10+ years',
      specialty: 'Cardiology'
    },
    {
      name: 'Dr. Sipra Mohapatra (Asst. Doctor) ',
      position: 'Head of Surgery',
      experience: '5+ years',
      specialty: 'Neurosurgery'
    },
    {
      name: 'Dr. Minakshi Sahoo (HOD) ',
      position: 'Medical Director',
      experience: '03+ years',
      specialty: 'Pediatrics'
    },
    {
      name: 'Dr. Sonalisha Sahoo (HOD)',
      position: 'Emergency Department Head',
      experience: '02+ years',
      specialty: 'Emergency Medicine'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Our Hospital
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Delivering exceptional healthcare with compassion, innovation, and excellence since 1998
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                To provide comprehensive, high-quality healthcare services to all patients with dignity, 
                compassion, and respect. We are committed to improving the health and well-being of our 
                community through excellence in clinical care, education, and research.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading healthcare institution recognized for clinical excellence, 
                  innovative research, and exceptional patient experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern Hospital Facility"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Achievements in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border border-blue-100">
                <div className="text-blue-600 text-2xl mb-4">
                  <FaHeartbeat />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{member.name}</h3>
                  <p className="text-blue-600 text-center font-medium mb-2">{member.position}</p>
                  <div className="text-center text-gray-600">
                    <p className="mb-1"><span className="font-medium">Experience:</span> {member.experience}</p>
                    <p><span className="font-medium">Specialty:</span> {member.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Technology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Advanced Facilities & Technology</h2>
              <ul className="space-y-4">
                {[
                  'State-of-the-art Operation Theaters',
                  'Advanced Diagnostic Imaging Center',
                  '24/7 Cardiac Care Unit',
                  'Neonatal Intensive Care Unit (NICU)',
                  'Modern Rehabilitation Center',
                  'Digital Patient Records System',
                  'Telemedicine Services',
                  'Robotic Surgery Systems'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="text-green-500 mt-1 mr-3">
                      <FaHeartbeat />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hospital Technology"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-4 flex justify-center">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p>123 Medical Center Drive<br />Health City, HC 12345</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4 flex justify-center">
                <FaPhone />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p>Emergency: (123) 456-7890<br />General: (123) 456-7891</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4 flex justify-center">
                <FaClock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p>24/7 Emergency Services<br />OPD: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Accreditations & Certifications</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-gray-100 px-6 py-3 rounded-lg">JCI Accredited</div>
            <div className="bg-gray-100 px-6 py-3 rounded-lg">NABH Certified</div>
            <div className="bg-gray-100 px-6 py-3 rounded-lg">ISO 9001:2015</div>
            <div className="bg-gray-100 px-6 py-3 rounded-lg">Green Hospital Certified</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;