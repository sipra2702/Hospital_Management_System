import { useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-900 hover:text-blue-600 flex items-center gap-1"
      >
        Departments
        <span className="text-xs">▼</span>
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            Cardiology
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            Neurology
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            Orthopedics
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            Pediatrics
          </li>
          <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            Emergency
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
