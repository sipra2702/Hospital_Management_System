import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";


const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside OR scrolling
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
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
      >
        Departments
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
  <Link to="/departments/cardiology">Cardiology</Link>
</li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <Link to="/departments/neurology">Neurology</Link>

          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              <Link to="/departments/orthopedics">Orthopedics</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <Link to="/departments/pediatrics">Pediatrics</Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <Link to="/departments/emergency">Emergency</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
