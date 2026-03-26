import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="nav-link flex items-center gap-1"
      >
        Departments
        <span className="text-xs">▼</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <ul className="absolute left-0 mt-3 w-52 bg-(--light) border border-(--neutral) rounded-xl shadow-lg z-50 p-2">

          <li>
            <Link to="/departments/cardiology" className="dropdown-item block px-4 py-2 rounded-lg">
              Cardiology
            </Link>
          </li>

          <li>
            <Link to="/departments/neurology" className="dropdown-item block px-4 py-2 rounded-lg">
              Neurology
            </Link>
          </li>

          <li>
            <Link to="/departments/orthopedics" className="dropdown-item block px-4 py-2 rounded-lg">
              Orthopedics
            </Link>
          </li>

          <li>
            <Link to="/departments/pediatrics" className="dropdown-item block px-4 py-2 rounded-lg">
              Pediatrics
            </Link>
          </li>

          <li>
            <Link to="/departments/emergency" className="dropdown-item block px-4 py-2 rounded-lg">
              Emergency
            </Link>
          </li>

        </ul>
      )}
    </div>
  );
};

export default Dropdown;