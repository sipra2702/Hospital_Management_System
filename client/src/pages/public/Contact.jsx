import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faHospital,
  faAmbulance,
  faUserMd
} from '@fortawesome/free-solid-svg-icons';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a backend server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const emergencyContacts = [
    { icon: faAmbulance, title: 'Emergency Ambulance', number: '103', available: '24/7' },
    { icon: faUserMd, title: 'Emergency Doctor', number: '112', available: '24/7' },
    { icon: faHospital, title: 'Hospital Reception', number: '(123) 456-7890', available: 'Mon-Sun, 6AM-10PM' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to help you with any questions or concerns about our hospital services. 
            Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FontAwesomeIcon icon={faAmbulance} className="mr-3 text-red-500" />
                Emergency Contacts
              </h2>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <FontAwesomeIcon icon={contact.icon} className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                      <p className="text-2xl font-bold text-red-700 my-1">{contact.number}</p>
                      <p className="text-sm text-gray-600">Available: {contact.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faPhone} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">(123) 456-7890</p>
                    <p className="text-gray-600">(098) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <p className="text-gray-600">info@hospitalmanagement.com</p>
                    <p className="text-gray-600">support@hospitalmanagement.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Location</h3>
                    <p className="text-gray-600">123 Medical Center Drive</p>
                    <p className="text-gray-600">Healthcare City, HC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faClock} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form and Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-8">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book an Appointment</option>
                        <option value="billing">Billing Inquiry</option>
                        <option value="feedback">Feedback/Suggestion</option>
                        <option value="medical-records">Medical Records</option>
                        <option value="general">General Inquiry</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Fields marked with * are required
                    </p>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="p-6 border-b">
    <h2 className="text-2xl font-bold text-gray-800">Find Our Hospital</h2>
    <p className="text-gray-600">Visit us at our main campus location</p>
  </div>
  <div className="h-64 md:h-80 bg-gray-200">
    {/* Google Maps Embed */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.8379098956125!2d85.89041007501551!3d20.471849581041685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d7fd866141d%3A0xcb2c394af5c137e0!2sS.C.B.%20Medical%20College%20and%20Hospital%20cuttack!5e0!3m2!1sen!2sin!4v1770359142643!5m2!1sen!2sin" 
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Hospital Location Map"
      className="w-full h-full"
    ></iframe>
  </div>
  <div className="p-4 bg-gray-50 text-center">
    <p className="text-gray-700">
      <span className="font-semibold">Parking available:</span> Yes, free parking for patients and visitors
    </p>
  </div>
</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-r border-gray-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faHospital} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Patient Portal</h3>
              <p className="text-gray-600">Access your medical records, test results, and schedule appointments online.</p>
              <a href="#" className="text-blue-600 font-medium mt-3 inline-block hover:underline">
                Visit Patient Portal →
              </a>
            </div>
            
            <div className="text-center p-6 border-r border-gray-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUserMd} className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Virtual Consultation</h3>
              <p className="text-gray-600">Schedule a virtual appointment with our specialists from the comfort of your home.</p>
              <a href="#" className="text-blue-600 font-medium mt-3 inline-block hover:underline">
                Book Virtual Visit →
              </a>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faClock} className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Helpline</h3>
              <p className="text-gray-600">Our helpline is available round the clock for any medical emergencies or queries.</p>
              <p className="text-2xl font-bold text-purple-700 mt-3">1-800-MED-HELP</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600">
          <p className="mb-2">We typically respond to inquiries within 24 hours during business days.</p>
          <p>For medical emergencies, please call our emergency numbers or visit the nearest emergency department.</p>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;