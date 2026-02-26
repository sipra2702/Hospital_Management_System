import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-xl font-bold text-black -ml-3"
            >
              <i>MEDICAR</i>
            </Link>

            <Dropdown />
          </div>

          {/* RIGHT */}
          <div className="flex items-center space-x-4 text-base">

            <Link to="/" className="text-blue-700 hover:text-black">
              Home
            </Link>
            <Link to="/About" className="text-blue-700 hover:text-black">
              About
            </Link>
            <Link to="/Services" className="text-blue-700 hover:text-black">
              Services
            </Link>
            <Link to="/Doctor" className="text-blue-700 hover:text-black">
              Doctors
            </Link>
            <Link to="/Contact" className="text-blue-700 hover:text-black">
              Contact
            </Link>

            {user ? (
              <>
                {/* ================= ADMIN ================= */}
                {user.role === "admin" ? (
                  <>
                    <span className="text-gray-500">
                      Hi, {user.name}
                    </span>

                    <Link
                      to="/admin"
                      className="text-blue-600 font-semibold"
                    >
                      Admin Panel
                    </Link>

                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  /* ================= USER PROFILE ================= */
                  <div
                    className="relative"
                    ref={profileRef}
                  >
                    <button
                      onClick={() =>
                        setOpenProfile(!openProfile)
                      }
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      <FaUserCircle className="text-2xl text-blue-600" />
                      <span className="text-gray-700">
                        {user.name}
                      </span>
                    </button>

                    {openProfile && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() =>
                            setOpenProfile(false)
                          }
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/my-appointments"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() =>
                            setOpenProfile(false)
                          }
                        >
                          My Appointments
                        </Link>

                        <button
                          onClick={() => {
                            logout();
                            setOpenProfile(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
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
