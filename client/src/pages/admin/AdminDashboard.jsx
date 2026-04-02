import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#FAF6F2] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[#683B2B] mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gradient-to-b from-[#B08401] via-[#D49E8D] to-[#683B2B] transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-[#DED1BD] text-sm font-medium uppercase">
            Total Users
          </h2>
          <p className="text-2xl font-bold text-[#683B2B] mt-2">1,250</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gradient-to-b from-[#D49E8D] via-[#B08401] to-[#683B2B] transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-[#DED1BD] text-sm font-medium uppercase">
            Active Sessions
          </h2>
          <p className="text-2xl font-bold text-[#683B2B] mt-2">45</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-gradient-to-b from-[#683B2B] via-[#D49E8D] to-[#B08401] transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-[#DED1BD] text-sm font-medium uppercase">
            Pending Approvals
          </h2>
          <p className="text-2xl font-bold text-[#683B2B] mt-2">12</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-300 hover:scale-102 hover:shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-[#683B2B]">
          Welcome, Admin {user?.name}
        </h2>
        <p className="text-[#683B2B]/80">
          This is your control center. Use the sidebar to navigate to user management or settings.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;