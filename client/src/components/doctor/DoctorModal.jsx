import { useState, useEffect } from "react";
import api from "../../services/api";

const DoctorModal = ({ type, doctor, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        experience: doctor.experience || "",
        fees: doctor.fees || "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (type === "create") {
        await api.post("/doctors", formData);
      }

      if (type === "update") {
        await api.put(`/doctors/${doctor._id}`, formData);
      }

      refresh();
      onClose();
    } catch (error) {
      alert("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[450px] p-6 shadow-2xl">

        <h2 className="text-xl font-bold mb-6 capitalize">
          {type} Doctor
        </h2>

        {type === "view" ? (
          <div className="space-y-3">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Fees:</strong> ₹ {doctor.fees}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="experience"
              type="number"
              placeholder="Experience (years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="fees"
              type="number"
              placeholder="Consultation Fees"
              value={formData.fees}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>

          {type !== "view" && (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
