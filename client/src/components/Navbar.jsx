import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo + Dropdown */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-black -ml-3">
              <i>MEDICAR</i>
            </Link>

            <Dropdown />
          </div>

          {/* RIGHT: Menu */}
          <div className="flex items-center space-x-4 text-base">
            <Link to="/" className="text-blue-700 hover:text-black">Home</Link>
            <Link to="/about" className="text-blue-700 hover:text-black">Services</Link>
            <Link to="/about" className="text-blue-700 hover:text-black">Doctors</Link>
            <Link to="/about" className="text-blue-700 hover:text-black">Contact</Link>

            {user ? (
              <>
                <span className="text-gray-500">Hi, {user.name}</span>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-blue-600 font-semibold"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
