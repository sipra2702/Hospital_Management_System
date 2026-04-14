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
    // ✅ Step 1: Validation (check empty fields)
    if (
      !formData.name ||
      !formData.specialization ||
      !formData.experience ||
      !formData.fees
    ) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Step 2: Convert string → number (VERY IMPORTANT)
    const payload = {
      ...formData,
      experience: Number(formData.experience),
      fees: Number(formData.fees),
    };

    // ✅ Step 3: API calls
    if (type === "create") {
      await api.post("/doctors", payload);
    }

    if (type === "update") {
      await api.put(`/doctors/${doctor._id}`, payload);
    }

    // ✅ Step 4: Refresh + Close modal
    refresh();
    onClose();

  } catch (error) {
    // ✅ Step 5: Show real error
    console.log("ERROR:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Operation failed");
  }
}; 

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      
      {/* MODAL BOX */}
      <div className="bg-(--light) rounded-2xl w-112.5 p-6 shadow-2xl border border-(--neutral)">

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-6 capitalize text-(--primary)">
          {type} Doctor
        </h2>

        {/* VIEW MODE */}
        {type === "view" ? (
          <div className="space-y-3 text-(--primary)">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Fees:</strong> ₹ {doctor.fees}</p>
          </div>
        ) : (
          /* FORM MODE */
          <div className="space-y-4">

            <input
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-(--neutral) bg-white text-(--primary) focus:outline-none focus:ring-2 focus:ring-(--secondary) transition"
            />

            <input
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-(--neutral) bg-white text-(--primary) focus:outline-none focus:ring-2 focus:ring-(--secondary) transition"
            />

            <input
              name="experience"
              type="number"
              placeholder="Experience (years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-(--neutral) bg-white text-(--primary) focus:outline-none focus:ring-2 focus:ring-(--secondary) transition"
            />

            <input
              name="fees"
              type="number"
              placeholder="Consultation Fees"
              value={formData.fees}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-(--neutral) bg-white text-(--primary) focus:outline-none focus:ring-2 focus:ring-(--secondary) transition"
            />

          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-(--neutral) text-(--primary) transition hover:bg-(--neutral)"
          >
            Close
          </button>

          {/* SAVE */}
          {type !== "view" && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-full bg-(--secondary) text-white transition hover:bg-(--accent) hover:shadow-lg hover:-translate-y-0.5"
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