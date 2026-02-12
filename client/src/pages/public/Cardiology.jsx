
import CardiologyImg from "../../assets/Cardiology.jpg";
const Cardiology = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Cardiology Department</h1>
        <p className="mt-3 text-lg">
          Advanced heart care with experienced specialists
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Image */}
        <div className="flex justify-center mb-10">
          <img
            src="https://www.lummi.ai/photo/healthcare-professional-in-clinical-setting-ncgfz"
            alt="Cardiology Department"
            className="w-full max-w-4xl rounded-xl shadow-lg object-cover"
          />
          <p className="text-center text-green-600">
  Image loaded successfully
</p>

        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Comprehensive Heart Care
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our Cardiology Department provides complete care for heart-related
            conditions using modern technology and evidence-based practices.
            From diagnosis to treatment and rehabilitation, our experienced
            cardiologists are dedicated to your heart health.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Heart Checkups
            </h3>
            <p className="text-gray-600">
              Regular heart health screenings and preventive cardiology services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              ECG & Echocardiography
            </h3>
            <p className="text-gray-600">
              Accurate diagnostic tests for early detection of heart diseases.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Cardiac Surgery Support
            </h3>
            <p className="text-gray-600">
              Pre- and post-operative care with expert cardiac surgeons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Emergency Cardiac Care
            </h3>
            <p className="text-gray-600">
              24/7 emergency response for heart attacks and critical conditions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Hypertension Management
            </h3>
            <p className="text-gray-600">
              Personalized treatment plans for blood pressure control.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Lifestyle Counseling
            </h3>
            <p className="text-gray-600">
              Diet, exercise, and lifestyle guidance for a healthy heart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardiology;
