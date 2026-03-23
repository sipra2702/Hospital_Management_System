import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ACTIVE + NORMAL STYLE using your color palette
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-[#D49E8D] text-white font-semibold"  // accent for active
        : "text-[#683B2B] hover:bg-[#B08401] hover:text-white"
    }`;

  return (
    <nav className="shadow-md relative z-50" style={{ backgroundColor: "#FAF6F2" }}> {/* light background */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LEFT */}
          <div className="flex items-center space-x-6">
            <NavLink to="/" className="text-xl font-bold -ml-3 text-[#683B2B]">
              <i>MEDICAR</i>
            </NavLink>
            <Dropdown />
          </div>

          {/* RIGHT */}
          <div className="flex items-center space-x-4 text-base">

            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/services" className={navLinkClass}>Services</NavLink>
            <NavLink to="/doctor" className={navLinkClass}>Doctors</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            {user ? (
              <>
                {user.role === "admin" ? (
                  <>
                    <span style={{ color: "#DED1BD" }}>Hi, {user.name}</span>
                    <NavLink to="/admin" className={navLinkClass}>Admin Panel</NavLink>
                    <button onClick={logout} className="px-3 py-2 rounded-lg text-[#683B2B] hover:bg-[#B08401] hover:text-white transition">
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setOpenProfile(!openProfile)}
                      className="flex items-center space-x-2 focus:outline-none text-[#683B2B]"
                    >
                      <FaUserCircle className="text-2xl" />
                      <span>{user.name}</span>
                    </button>

                    {openProfile && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-[#683B2B] hover:bg-[#B08401] hover:text-white rounded-lg transition"
                          onClick={() => setOpenProfile(false)}
                        >
                          My Profile
                        </NavLink>
                        <NavLink
                          to="/my-appointments"
                          className="block px-4 py-2 text-[#683B2B] hover:bg-[#B08401] hover:text-white rounded-lg transition"
                          onClick={() => setOpenProfile(false)}
                        >
                          My Appointments
                        </NavLink>
                        <button
                          onClick={() => { logout(); setOpenProfile(false); }}
                          className="w-full text-left px-4 py-2 text-[#683B2B] hover:bg-[#B08401] hover:text-white rounded-lg transition"
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
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                <NavLink to="/register" className="px-3 py-2 rounded-lg bg-[#B08401] text-white font-semibold hover:bg-[#D49E8D] transition">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;