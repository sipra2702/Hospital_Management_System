import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FaUserMd } from "react-icons/fa";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
  });

  const [booking, setBooking] = useState(false);

  // ============================
  // FETCH DOCTORS
  // ============================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data.data);
      } catch (error) {
        console.error("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ============================
  // FILTER DOCTORS
  // ============================
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doctor.specialization === selectedSpecialty;

    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesSpecialty && matchesSearch;
  });

  // ============================
  // OPEN MODAL
  // ============================
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  // ============================
  // SUBMIT APPOINTMENT
  // ============================
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();

    if (!appointmentData.date || !appointmentData.time) {
      alert("Please select date and time");
      return;
    }

    try {
      setBooking(true);

      // Combine Date + Time
      const selectedDateTime = new Date(
        `${appointmentData.date}T${appointmentData.time}`
      );

      // Prevent past booking
      if (selectedDateTime < new Date()) {
        alert("Cannot book appointment in the past");
        setBooking(false);
        return;
      }

      const res = await api.post("/appointments", {
        doctor: selectedDoctor._id,
        date: selectedDateTime,
      });

      if (res.data.success) {
        alert("Appointment booked successfully!");

        setShowAppointmentModal(false);
        setSelectedDoctor(null);

        setAppointmentData({
          date: "",
          time: "",
        });
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to book appointment"
      );
    } finally {
      setBooking(false);
    }
  };

  // ============================
  // LOADING UI
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">
          Loading doctors...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Meet Our Expert Doctors
        </h1>
        <p className="text-lg">
          Highly qualified medical professionals dedicated to your health
        </p>
      </div>

      <div className="container mx-auto px-6 py-10">

        {/* SEARCH + FILTER */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search doctor..."
            className="w-full px-4 py-3 border rounded-lg"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />

          <select
            className="px-4 py-3 border rounded-lg"
            value={selectedSpecialty}
            onChange={(e) =>
              setSelectedSpecialty(e.target.value)
            }
          >
            <option value="All">All</option>
            {[...new Set(doctors.map((d) => d.specialization))].map(
              (spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              )
            )}
          </select>
        </div>

        {/* DOCTOR GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold">
                  {doctor.name}
                </h3>

                <p className="text-blue-600 mb-2">
                  {doctor.specialization}
                </p>

                <p className="text-gray-600 mb-2">
                  Experience: {doctor.experience} years
                </p>

                <p className="text-gray-600 mb-4">
                  Fee: ₹{doctor.fees}
                </p>

                <button
                  onClick={() =>
                    handleBookAppointment(doctor)
                  }
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <FaUserMd className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600">
              No Doctors Found
            </h3>
          </div>
        )}
      </div>

      {/* APPOINTMENT MODAL */}
      {showAppointmentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[450px] p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">
              Book Appointment with {selectedDoctor.name}
            </h3>

            <form
              onSubmit={handleSubmitAppointment}
              className="space-y-4"
            >
              <input
                type="date"
                required
                className="w-full border p-2 rounded"
                value={appointmentData.date}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    date: e.target.value,
                  })
                }
              />

              <input
                type="time"
                required
                className="w-full border p-2 rounded"
                value={appointmentData.time}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    time: e.target.value,
                  })
                }
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={booking}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  {booking ? "Booking..." : "Confirm"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowAppointmentModal(false)
                  }
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
