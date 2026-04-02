import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      alert("Failed to delete appointment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF6F2]">
        <p className="text-xl font-semibold text-[#683B2B]">
          Loading Appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#FAF6F2]">
      <h2 className="text-3xl font-bold mb-6 text-[#683B2B]">
        Appointment Management
      </h2>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#DED1BD]">
            <tr>
              <th className="p-4 text-[#683B2B]">Patient</th>
              <th className="p-4 text-[#683B2B]">Doctor</th>
              <th className="p-4 text-[#683B2B]">Specialization</th>
              <th className="p-4 text-[#683B2B]">Date</th>
              <th className="p-4 text-[#683B2B]">Status</th>
              <th className="p-4 text-[#683B2B]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-t hover:bg-[#FAF6F2] transition-all shadow-sm hover:shadow-md rounded-lg"
              >
                <td className="p-4 text-[#683B2B]">{appointment.user?.name}</td>
                <td className="p-4 text-[#683B2B]">{appointment.doctor?.name}</td>
                <td className="p-4 text-[#683B2B]">{appointment.doctor?.specialization}</td>
                <td className="p-4 text-[#683B2B]">
                  {new Date(appointment.date).toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        appointment.status === "approved"
                          ? "bg-gradient-to-r from-[#B08401] to-[#D49E8D] text-white"
                          : appointment.status === "rejected"
                          ? "bg-gradient-to-r from-[#683B2B] to-[#B08401] text-white"
                          : "bg-gradient-to-r from-[#D49E8D] to-[#B08401] text-white"
                      }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(appointment._id, "approved")
                        }
                        className="px-4 py-2 bg-gradient-to-r from-[#B08401] to-[#D49E8D] text-white rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(appointment._id, "rejected")
                        }
                        className="px-4 py-2 bg-gradient-to-r from-[#683B2B] to-[#B08401] text-white rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteAppointment(appointment._id)}
                    className="px-4 py-2 bg-gradient-to-r from-[#DED1BD] to-[#B08401] text-[#683B2B] rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="p-6 text-center text-[#683B2B]">
            No Appointments Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointment;