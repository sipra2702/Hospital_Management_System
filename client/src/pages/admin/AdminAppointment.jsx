import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AdminAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // =============================
    // Fetch All Appointments
    // =============================
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

    // =============================
    // Update Status
    // =============================
    const updateStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}`, { status });
            fetchAppointments();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    // =============================
    // Delete Appointment
    // =============================
    const deleteAppointment = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;

        try {
            await api.delete(`/appointments/${id}`);
            fetchAppointments();
        } catch (error) {
            alert("Failed to delete appointment");
        }
    };

    // =============================
    // Loading State
    // =============================
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold">Loading Appointments...</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Appointment Management
            </h2>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Patient</th>
                            <th className="p-4">Doctor</th>
                            <th className="p-4">Specialization</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appointment) => (
                            <tr
                                key={appointment._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    {appointment.user?.name}
                                </td>

                                <td className="p-4">
                                    {appointment.doctor?.name}
                                </td>

                                <td className="p-4">
                                    {appointment.doctor?.specialization}
                                </td>

                                <td className="p-4">
                                    {new Date(appointment.date).toLocaleString()}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${appointment.status === "approved"
                                                ? "bg-green-100 text-green-600"
                                                : appointment.status === "rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }
                    `}
                                    >
                                        {appointment.status}
                                    </span>
                                </td>

                                <td className="p-4 space-x-2">
                                    {appointment.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        appointment._id,
                                                        "approved"
                                                    )
                                                }
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        appointment._id,
                                                        "rejected"
                                                    )
                                                }
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() =>
                                            deleteAppointment(appointment._id)
                                        }
                                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {appointments.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No Appointments Found
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAppointment;
