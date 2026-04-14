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

  // ================= FETCH DOCTORS =================
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

  // ================= FILTER =================
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

  // ================= BOOK =================
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();

    if (!appointmentData.date || !appointmentData.time) {
      alert("Please select date and time");
      return;
    }

    try {
      setBooking(true);

      const selectedDateTime = new Date(
        `${appointmentData.date}T${appointmentData.time}`
      );

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
        setAppointmentData({ date: "", time: "" });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setBooking(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading doctors...</p>
      </div>
    );
  }

  return (
    <>
      {/* ===== STYLE (MATCH SERVICES PAGE) ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

        .doc-root {
          font-family: 'Nunito', sans-serif;
          background: #FAF6F2;
          padding-top: 80px;
        }

        .doc-wrap {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
        }

        .doc-search {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .doc-input, .doc-select {
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 2px solid #DED1BD;
          outline: none;
          font-weight: 600;
        }

        .doc-input {
          flex: 1;
        }

        .doc-input:focus,
        .doc-select:focus {
          border-color: #683B2B;
        }

        .doc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .doc-card {
          background: white;
          border: 2px solid #DED1BD;
          border-radius: 20px;
          padding: 1.5rem;
          transition: 0.3s;
        }

        .doc-card:hover {
          border-color: #683B2B;
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .doc-title {
          font-size: 1.2rem;
          font-weight: 800;
        }

        .doc-spec {
          color: #B08401;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .doc-btn {
          width: 100%;
          background: #683B2B;
          color: white;
          padding: 0.7rem;
          border-radius: 10px;
          margin-top: 1rem;
          font-weight: 700;
        }

        .doc-btn:hover {
          background: #4a2518;
        }

        .doc-empty {
          text-align: center;
          padding: 5rem 0;
          color: #78716C;
        }

        @media (max-width: 1024px) {
          .doc-grid { grid-template-columns: repeat(2,1fr); }
        }

        @media (max-width: 768px) {
          .doc-grid { grid-template-columns: 1fr; }
          .doc-search { flex-direction: column; }
        }
      `}</style>

      <div className="doc-root">

        {/* ===== HERO ===== */}
        <section className="sv-hero">
          <div className="sv-hero-inner">
            <div className="sv-hero-badge">
              <span className="sv-badge-dot" />Our Specialists
            </div>
            <h1 className="sv-hero-h1">
              Meet Our <span className="sv-hero-accent">Doctors</span>
            </h1>
            <p className="sv-hero-sub">
              Experienced professionals dedicated to your health.
            </p>
          </div>
        </section>

        <div className="doc-wrap">

          {/* SEARCH */}
          <div className="doc-search">
            <input
              type="text"
              placeholder="Search doctor..."
              className="doc-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="doc-select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="All">All</option>
              {[...new Set(doctors.map((d) => d.specialization))].map(
                (spec) => (
                  <option key={spec}>{spec}</option>
                )
              )}
            </select>
          </div>

          {/* GRID */}
          {filteredDoctors.length > 0 ? (
            <div className="doc-grid">
              {filteredDoctors.map((doctor) => (
                <div key={doctor._id} className="doc-card">
                  <h3 className="doc-title">{doctor.name}</h3>
                  <p className="doc-spec">{doctor.specialization}</p>
                  <p>Experience: {doctor.experience} yrs</p>
                  <p>Fee: ₹{doctor.fees}</p>

                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="doc-btn"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="doc-empty">
              <FaUserMd size={60} />
              <h2 style={{ marginTop: "1rem", fontWeight: "700" }}>
                No Doctors Found
              </h2>
              <p>Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        {/* ===== MODAL ===== */}
        {showAppointmentModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-[400px] p-6">
              <h3 className="text-lg font-bold mb-4">
                Book with {selectedDoctor.name}
              </h3>

              <form onSubmit={handleSubmitAppointment} className="space-y-3">
                <input
                  type="date"
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
                  className="w-full border p-2 rounded"
                  value={appointmentData.time}
                  onChange={(e) =>
                    setAppointmentData({
                      ...appointmentData,
                      time: e.target.value,
                    })
                  }
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                  {booking ? "Booking..." : "Confirm"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorPage;