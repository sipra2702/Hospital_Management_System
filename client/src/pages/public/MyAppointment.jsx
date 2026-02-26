import React, { useEffect, useState } from "react";
import api from "../../services/api";

const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // =============================
    // Fetch My Appointments
    // =============================
    const fetchMyAppointments = async () => {
        try {
            const res = await api.get("/appointments/my");
            setAppointments(res.data.data);
        } catch (error) {
            console.error("Failed to fetch appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyAppointments();
    }, []);

    // =============================
    // Loading State
    // =============================
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold">
                    Loading Your Appointments...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                My Appointments
            </h2>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Doctor</th>
                            <th className="p-4">Specialization</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appointment) => (
                            <tr
                                key={appointment._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    {appointment.doctor?.name}
                                </td>

                                <td className="p-4">
                                    {appointment.doctor?.specialization}
                                </td>

                                <td className="p-4">
                                    {new Date(
                                        appointment.date
                                    ).toLocaleString()}
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
                            </tr>
                        ))}
                    </tbody>
                </table>

                {appointments.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        You have not booked any appointments yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointment;
