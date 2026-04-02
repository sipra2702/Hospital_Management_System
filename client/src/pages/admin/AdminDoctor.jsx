import { useEffect, useState } from "react";
import api from "../../services/api";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import DoctorModal from "../../components/doctor/DoctorModal";

const AdminDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalType, setModalType] = useState(null); // create | update | view

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
    <div className="min-h-screen bg-[#FAF6F2] p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#683B2B]">
            Doctor Management
          </h2>

          <button
            onClick={() => openModal(null, "create")}
            className="flex items-center gap-2 bg-linear-to-r from-[#B08401] to-[#D49E8D] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Create Doctor
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-[#DED1BD]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#DED1BD] uppercase text-[#683B2B] text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Specialization</th>
                <th className="px-6 py-4 text-center">Experience</th>
                <th className="px-6 py-4 text-center">Fees</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr
                  key={doc._id}
                  className="transition-all duration-300 rounded-lg hover:shadow-lg"
                  style={{
                    background: "linear-gradient(90deg, transparent, transparent)",
                  }}
                >
                  <td
                    className="px-6 py-4 text-[#683B2B] transition-colors duration-300"
                    style={{ backgroundClip: "padding-box" }}
                  >
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 text-[#683B2B]">{doc.specialization}</td>
                  <td className="px-6 py-4 text-center text-[#683B2B]">
                    {doc.experience} yrs
                  </td>
                  <td className="px-6 py-4 text-center text-[#683B2B]">₹ {doc.fees}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => openModal(doc, "view")}
                        className="text-[#B08401] hover:text-[#D49E8D] transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => openModal(doc, "update")}
                        className="text-[#D49E8D] hover:text-[#B08401] transition"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-[#683B2B] hover:text-[#B08401] transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {doctors.length === 0 && (
            <div className="p-6 text-center text-[#683B2B]">
              No Doctors Found
            </div>
          )}
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