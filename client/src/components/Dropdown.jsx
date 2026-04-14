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
    const handleScroll = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>

      {/* BUTTON — uses exact same styles as nb-links a */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "0.92rem",
          fontWeight: 800,
          color: open ? "var(--nb-primary)" : "var(--nb-black)",
          background: open ? "rgba(104,59,43,0.1)" : "transparent",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          fontFamily: "'Nunito', sans-serif",
          letterSpacing: "0.01em",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "var(--nb-primary)";
          e.currentTarget.style.background = "rgba(104,59,43,0.07)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = open ? "var(--nb-primary)" : "var(--nb-black)";
          e.currentTarget.style.background = open ? "rgba(104,59,43,0.1)" : "transparent";
        }}
      >
        Departments
        <span style={{
          fontSize: "0.65rem",
          color: "var(--nb-neutral)",
          transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          display: "inline-block",
        }}>▼</span>
      </button>

      {/* DROPDOWN PANEL */}
      {open && (
        <ul style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          width: "200px",
          background: "var(--nb-white)",
          border: "1.5px solid var(--nb-neutral)",
          borderRadius: "14px",
          boxShadow: "0 16px 48px rgba(104,59,43,0.18)",
          overflow: "hidden",
          zIndex: 1000,
          padding: "0.3rem",
          margin: 0,
          listStyle: "none",
          animation: "nb-drop 0.18s ease",
        }}>
          {[
            { label: "Cardiology",   to: "/departments/cardiology"   },
            { label: "Neurology",    to: "/departments/neurology"    },
            { label: "Orthopedics",  to: "/departments/orthopedics"  },
            { label: "Pediatrics",   to: "/departments/pediatrics"   },
            { label: "Emergency",    to: "/departments/emergency"    },
          ].map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className="nb-dd-item"   /* reuses your existing dropdown-item style from Navbar.jsx */
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;