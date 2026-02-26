import { useEffect, useState } from "react";
import api from "../../services/api";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import DoctorModal from "../../components/doctor/DoctorModal";

const AdminDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalType, setModalType] = useState(null); // create | update | view

    // =============================
    // Fetch Doctors
    // =============================
    const fetchDoctors = async () => {
        try {
            const res = await api.get("/doctors");
            setDoctors(res.data.data);
        } catch (error) {
            alert("Failed to fetch doctors");
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // =============================
    // Delete Doctor
    // =============================
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this doctor?")) return;

        try {
            await api.delete(`/doctors/${id}`);
            fetchDoctors();
        } catch (error) {
            alert("Delete failed");
        }
    };

    const openModal = (doctor, type) => {
        setSelectedDoctor(doctor);
        setModalType(type);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white shadow-xl rounded-2xl p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Doctor Management
                    </h2>

                    <button
                        onClick={() => openModal(null, "create")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={18} />
                        Create Doctor
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 uppercase text-gray-600 text-xs">
                            <tr>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left">Specialization</th>
                                <th className="px-6 py-4 text-center">Experience</th>
                                <th className="px-6 py-4 text-center">Fees</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {doctors.map((doc) => (
                                <tr key={doc._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{doc.name}</td>
                                    <td className="px-6 py-4">{doc.specialization}</td>
                                    <td className="px-6 py-4 text-center">
                                        {doc.experience} yrs
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        ₹ {doc.fees}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => openModal(doc, "view")}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() => openModal(doc, "update")}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Edit size={18} />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(doc._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalType && (
                <DoctorModal
                    type={modalType}
                    doctor={selectedDoctor}
                    onClose={() => setModalType(null)}
                    refresh={fetchDoctors}
                />
            )}
        </div>
    );
};

export default AdminDoctor;
