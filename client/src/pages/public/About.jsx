const About = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10 ">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">About our Hospital Management System</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        Our Hospital Management System (HMS) is a web-based application designed.
        To simplify and automate hospital operations.It helps manage patients,doctors,appointments,billings,and medical records efficiently. 
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        This System is built using modern web technologies such as React and is focoused on providing a smooth and 
        user-friendly experience for Hospital.
        staff and administrators.
      </p>
      <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">
        1.Patient Management<br/>
        2.Doctor Management<br/>
        3.Appointments Scheduling<br/>
        4.Staff Management<br/>
      </h2>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Patient registration and Management</li>
        <li>Doctor and staff Management</li>
        <li>Appointment Scheduling</li>
      </ul>
      <p className="text-gray-700 leading-relaxed mt-6">
        Our mission is to make hospital management more efficient, secure, and
        accessible using reliable and scalable software solutions.
      </p>
    </div>
  );
};

export default About;