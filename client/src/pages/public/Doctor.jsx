import React, { useState } from 'react';
import { 
  FaUserMd, 
  FaSearch, 
  FaFilter, 
  FaStar, 
  FaCalendarAlt, 
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaStethoscope,
  FaHeartbeat
} from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';

const DoctorPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: ''
  });

  // Doctor specialties
  const specialties = [
    'All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
    'Dermatology', 'Gynecology', 'Dentistry', 'Psychiatry', 'Oncology',
    'Endocrinology', 'Gastroenterology'
  ];

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      experience: '15 years',
      education: 'MD, Harvard Medical School',
      availability: 'Mon, Wed, Fri: 9 AM - 5 PM',
      fee: '$150',
      patients: 4200,
      description: 'Expert in cardiovascular diseases with extensive experience in interventional cardiology.',
      location: 'Cardiology Wing, Floor 3',
      phone: '(123) 456-7890',
      email: 's.johnson@hospital.com'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      experience: '12 years',
      education: 'MD, Johns Hopkins University',
      availability: 'Tue, Thu, Sat: 10 AM - 6 PM',
      fee: '$180',
      patients: 3800,
      description: 'Specialized in neurological disorders and advanced neurosurgical procedures.',
      location: 'Neurology Department, Floor 4',
      phone: '(123) 456-7891',
      email: 'm.chen@hospital.com'
    },
    {
      id: 3,
      name: 'Dr. Emma Wilson',
      specialty: 'Pediatrics',
      image: 'https://images.unsplash.com/photo-1594824487713-6e1e9ad56d6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      experience: '10 years',
      education: 'MD, Stanford University',
      availability: 'Mon-Fri: 8 AM - 4 PM',
      fee: '$120',
      patients: 3500,
      description: 'Caring pediatrician with expertise in child development and preventive care.',
      location: 'Pediatrics Wing, Floor 2',
      phone: '(123) 456-7892',
      email: 'e.wilson@hospital.com'
    },
    {
      id: 4,
      name: 'Dr. Robert Davis',
      specialty: 'Orthopedics',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      experience: '18 years',
      education: 'MD, Mayo Clinic',
      availability: 'Mon, Wed, Thu: 9 AM - 5 PM',
      fee: '$200',
      patients: 4500,
      description: 'Orthopedic surgeon specializing in joint replacements and sports injuries.',
      location: 'Orthopedics Department, Floor 5',
      phone: '(123) 456-7893',
      email: 'r.davis@hospital.com'
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatology',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      experience: '8 years',
      education: 'MD, Duke University',
      availability: 'Tue, Thu, Fri: 10 AM - 6 PM',
      fee: '$130',
      patients: 3200,
      description: 'Dermatologist specializing in cosmetic and medical dermatology.',
      location: 'Dermatology Clinic, Floor 1',
      phone: '(123) 456-7894',
      email: 'p.sharma@hospital.com'
    },
    {
      id: 6,
      name: 'Dr. James Miller',
      specialty: 'Gynecology',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      experience: '20 years',
      education: 'MD, Columbia University',
      availability: 'Mon-Fri: 9 AM - 5 PM',
      fee: '$160',
      patients: 5000,
      description: 'Experienced gynecologist with expertise in women\'s health and fertility.',
      location: 'Women\'s Health Center, Floor 3',
      phone: '(123) 456-7895',
      email: 'j.miller@hospital.com'
    }
  ];

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    alert(`Appointment booked with ${selectedDoctor.name} on ${appointmentData.date} at ${appointmentData.time}`);
    setShowAppointmentModal(false);
    setAppointmentData({ date: '', time: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Expert Doctors
            </h1>
            <p className="text-xl mb-8">
              Highly qualified medical professionals dedicated to your health and well-being
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" />
                Filter by Specialty
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Specialty Quick Filters */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {specialties.slice(1).map((specialty) => (
                <button
                  key={specialty}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSpecialty === specialty
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSpecialty(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Doctor Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {doctor.specialty}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-bold">{doctor.rating}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <FaGraduationCap className="mr-3 text-blue-500" />
                    <span>{doctor.education}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBriefcaseMedical className="mr-3 text-blue-500" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdPeople className="mr-3 text-blue-500" />
                    <span>{doctor.patients.toLocaleString()} patients</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-3 text-blue-500" />
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-3 text-blue-500" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">{doctor.fee}</span>
                    <span className="text-gray-500 ml-1">/consultation</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <FaUserMd className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Doctors Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filter</p>
          </div>
        )}

        {/* Statistics Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{doctors.length}+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Patient Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15min</div>
              <div className="text-gray-600">Average Wait Time</div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            How to Book an Appointment
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Find a Doctor</h3>
              <p className="text-gray-600">Search or browse through our list of specialist doctors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Choose Date & Time</h3>
              <p className="text-gray-600">Select your preferred appointment slot</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeartbeat className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Confirm Booking</h3>
              <p className="text-gray-600">Receive confirmation and prepare for your visit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showAppointmentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Book Appointment
                </h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Doctor Info */}
              <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{selectedDoctor.name}</h4>
                  <p className="text-blue-600">{selectedDoctor.specialty}</p>
                  <p className="text-gray-600 text-sm">Fee: {selectedDoctor.fee}</p>
                </div>
              </div>

              {/* Appointment Form */}
              <form onSubmit={handleSubmitAppointment}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaClock className="inline mr-2" />
                      Select Time Slot
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={appointmentData.time}
                      onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaStethoscope className="inline mr-2" />
                      Reason for Visit
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Briefly describe your symptoms or reason for appointment..."
                      value={appointmentData.reason}
                      onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Please arrive 15 minutes before your scheduled appointment time.
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAppointmentModal(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;