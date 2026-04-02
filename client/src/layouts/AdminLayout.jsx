import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF6F2]">
        <p className="text-xl font-semibold text-[#683B2B]">Loading...</p>
      </div>
    );

  // Protect Admin Route
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#FAF6F2" }}>
      <Sidebar />
      <div
        className="flex-1 p-8 overflow-y-auto h-screen"
        style={{
          backgroundColor: "#FAF6F2",
          color: "#683B2B",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;