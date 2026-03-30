import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const outside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setOpenProfile(false);
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const navItems = [
    { label: "Home",     to: "/",        end: true },
    { label: "About",    to: "/about"              },
    { label: "Services", to: "/services"           },
    { label: "Doctors",  to: "/doctor"             },
    { label: "Contact",  to: "/contact"            },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800&display=swap');

        /* ── PALETTE ── */
        :root {
          --nb-primary:   #683B2B;
          --nb-secondary: #B08401;
          --nb-accent:    #D49E8D;
          --nb-light:     #FAF6F2;
          --nb-neutral:   #DED1BD;
          --nb-black:     #1A1008;
          --nb-white:     #FFFFFF;
        }

        /* ── NAV SHELL ── */
        .nb-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          font-family: 'Nunito', sans-serif;
        }
        .nb-nav.nb-top {
          background: transparent;
          border-bottom: 1px solid rgba(222,209,189,0.18);
        }
        .nb-nav.nb-scrolled {
          background: rgba(250,246,242,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--nb-neutral);
          box-shadow: 0 2px 24px rgba(104,59,43,0.1);
        }

        /* ── INNER ROW ── */
        .nb-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }

        /* ── LOGO ── */
        .nb-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 800; font-size: 1.5rem;
          color: var(--nb-primary); text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
          letter-spacing: -0.01em; flex-shrink: 0;
        }
        .nb-logo-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: var(--nb-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: white;
          box-shadow: 0 4px 12px rgba(104,59,43,0.35);
        }
        .nb-logo span { color: var(--nb-secondary); }

        /* ── CENTER LINKS ── */
        .nb-links {
          display: flex; align-items: center; gap: 0.15rem;
          list-style: none;
        }
        .nb-links a {
          font-size: 0.92rem; font-weight: 800;
          color: var(--nb-black);
          text-decoration: none; padding: 0.5rem 1rem;
          border-radius: 8px; transition: all 0.2s;
          letter-spacing: 0.01em;
        }
        .nb-links a:hover {
          color: var(--nb-primary);
          background: rgba(104,59,43,0.07);
        }
        .nb-links a.nb-active {
          color: var(--nb-primary);
          background: rgba(104,59,43,0.1);
        }

        /* ── RIGHT SIDE ── */
        .nb-right { display: flex; align-items: center; gap: 0.75rem; }

        /* ── BUTTONS ── */
        .nb-btn-outline {
          background: transparent; color: var(--nb-black);
          padding: 0.52rem 1.2rem; border-radius: 9px; font-weight: 800;
          font-size: 0.86rem; text-decoration: none;
          display: inline-flex; align-items: center;
          border: 2px solid var(--nb-neutral);
          transition: all 0.2s; cursor: pointer;
          font-family: 'Nunito', sans-serif;
        }
        .nb-btn-outline:hover {
          border-color: var(--nb-primary); color: var(--nb-primary);
          background: rgba(104,59,43,0.06);
        }
        .nb-btn-primary {
          background: var(--nb-primary); color: var(--nb-white);
          padding: 0.52rem 1.3rem; border-radius: 9px; font-weight: 800;
          font-size: 0.86rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.3rem;
          border: none; cursor: pointer; transition: all 0.2s;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 4px 14px rgba(104,59,43,0.3);
        }
        .nb-btn-primary:hover {
          background: #7a4533;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(104,59,43,0.38);
        }
        .nb-btn-secondary {
          background: var(--nb-secondary); color: var(--nb-white);
          padding: 0.52rem 1.3rem; border-radius: 9px; font-weight: 800;
          font-size: 0.86rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.3rem;
          border: none; cursor: pointer; transition: all 0.2s;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 4px 14px rgba(176,132,1,0.28);
        }
        .nb-btn-secondary:hover {
          background: #9a7301;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(176,132,1,0.35);
        }
        .nb-btn-danger {
          background: transparent; border: 2px solid rgba(180,60,40,0.35);
          color: #B43C28; font-size: 0.86rem; font-weight: 800;
          padding: 0.5rem 1.1rem; border-radius: 9px;
          cursor: pointer; transition: all 0.2s; font-family: 'Nunito', sans-serif;
        }
        .nb-btn-danger:hover { background: rgba(180,60,40,0.07); border-color: #B43C28; }

        /* ── ADMIN BADGE ── */
        .nb-admin-badge {
          background: rgba(176,132,1,0.14); border: 1px solid rgba(176,132,1,0.35);
          color: var(--nb-secondary); font-size: 0.7rem; font-weight: 800;
          padding: 0.22rem 0.6rem; border-radius: 6px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        /* ── PROFILE PILL ── */
        .nb-profile-btn {
          display: flex; align-items: center; gap: 0.6rem;
          background: var(--nb-light); border: 2px solid var(--nb-neutral);
          border-radius: 50px; padding: 0.3rem 0.9rem 0.3rem 0.35rem;
          cursor: pointer; transition: all 0.2s; color: var(--nb-black);
        }
        .nb-profile-btn:hover { border-color: var(--nb-accent); background: #f3ede6; }
        .nb-profile-btn.nb-open { border-color: var(--nb-primary); }
        .nb-profile-av {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, var(--nb-primary), var(--nb-secondary));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800; color: white; flex-shrink: 0;
        }
        .nb-profile-name { font-size: 0.86rem; font-weight: 800; color: var(--nb-black); }
        .nb-chevron { font-size: 0.65rem; color: var(--nb-neutral); transition: transform 0.2s; }
        .nb-profile-btn.nb-open .nb-chevron { transform: rotate(180deg); }

        /* ── DROPDOWN ── */
        .nb-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          width: 210px; background: var(--nb-white);
          border: 1.5px solid var(--nb-neutral); border-radius: 14px;
          box-shadow: 0 16px 48px rgba(104,59,43,0.18);
          overflow: hidden; animation: nb-drop 0.18s ease;
        }
        @keyframes nb-drop {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        .nb-dd-item {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0.8rem 1rem; font-size: 0.86rem; font-weight: 700;
          color: var(--nb-black); text-decoration: none; cursor: pointer;
          transition: all 0.15s; background: none; border: none; width: 100%;
          text-align: left; font-family: 'Nunito', sans-serif;
        }
        .nb-dd-item:hover { background: #faf0e8; color: var(--nb-primary); }
        .nb-dd-item.nb-danger:hover { background: #fff0ee; color: #c0392b; }
        .nb-dd-ico { font-size: 0.95rem; width: 20px; text-align: center; }
        .nb-dd-divider { height: 1px; background: var(--nb-neutral); margin: 0.2rem 0; opacity: 0.5; }

        /* ── HAMBURGER ── */
        .nb-hamburger {
          display: none; background: var(--nb-light);
          border: 2px solid var(--nb-neutral); color: var(--nb-black);
          padding: 0.48rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem;
          transition: all 0.2s; align-items: center; justify-content: center;
        }
        .nb-hamburger:hover { border-color: var(--nb-primary); color: var(--nb-primary); }

        /* ── MOBILE MENU ── */
        .nb-mobile {
          display: none; position: fixed;
          top: 72px; left: 0; right: 0;
          background: rgba(250,246,242,0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1.5px solid var(--nb-neutral);
          padding: 1rem 1.5rem 1.5rem; z-index: 998;
          animation: nb-slide 0.22s ease;
        }
        @keyframes nb-slide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-mobile.nb-open { display: block; }
        .nb-mobile-link {
          display: block; padding: 0.78rem 0.5rem; font-size: 0.96rem;
          font-weight: 800; color: var(--nb-black); text-decoration: none;
          border-bottom: 1px solid rgba(222,209,189,0.45); transition: color 0.15s;
        }
        .nb-mobile-link:hover, .nb-mobile-link.nb-active { color: var(--nb-primary); }
        .nb-mobile-actions { display: flex; gap: 0.75rem; margin-top: 1.2rem; flex-wrap: wrap; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) { .nb-links { display: none; } }
        @media (max-width: 768px) {
          .nb-hamburger { display: flex; }
          .nb-right .nb-btn-outline,
          .nb-right .nb-btn-primary,
          .nb-right .nb-btn-secondary,
          .nb-right .nb-btn-danger { display: none; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nb-nav ${scrolled ? "nb-scrolled" : "nb-top"}`}>
        <div className="nb-inner">

          {/* LOGO */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">✚</div>
            Medi<span>Care</span>
          </Link>

          {/* CENTER LINKS */}
          <ul className="nb-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => isActive ? "nb-active" : ""}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {Dropdown && <li><Dropdown /></li>}
          </ul>

          {/* RIGHT */}
          <div className="nb-right">
            {user ? (
              <>
                {user.role === "admin" ? (
                  <>
                    <span className="nb-admin-badge">Admin</span>
                    <NavLink to="/admin" className="nb-btn-secondary">Admin Panel</NavLink>
                    <button onClick={logout} className="nb-btn-danger">Logout</button>
                  </>
                ) : (
                  <div style={{ position: "relative" }} ref={profileRef}>
                    <button
                      className={`nb-profile-btn ${openProfile ? "nb-open" : ""}`}
                      onClick={() => setOpenProfile(!openProfile)}
                    >
                      <div className="nb-profile-av">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="nb-profile-name">{user.name}</span>
                      <span className="nb-chevron">▼</span>
                    </button>

                    {openProfile && (
                      <div className="nb-dropdown">
                        <Link to="/dashboard"       className="nb-dd-item" onClick={() => setOpenProfile(false)}><span className="nb-dd-ico">🏠</span> Dashboard</Link>
                        <Link to="/profile"         className="nb-dd-item" onClick={() => setOpenProfile(false)}><span className="nb-dd-ico">👤</span> My Profile</Link>
                        <Link to="/my-appointments" className="nb-dd-item" onClick={() => setOpenProfile(false)}><span className="nb-dd-ico">📅</span> Appointments</Link>
                        <Link to="/records"         className="nb-dd-item" onClick={() => setOpenProfile(false)}><span className="nb-dd-ico">🗂️</span> Health Records</Link>
                        <div className="nb-dd-divider" />
                        <button onClick={() => { logout(); setOpenProfile(false); }} className="nb-dd-item nb-danger">
                          <span className="nb-dd-ico">🚪</span> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login"    className="nb-btn-outline">Log In</NavLink>
                <NavLink to="/register" className="nb-btn-primary">Get Started →</NavLink>
              </>
            )}

            {/* Hamburger */}
            <button className="nb-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nb-mobile ${mobileOpen ? "nb-open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nb-mobile-link ${isActive ? "nb-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <div className="nb-mobile-actions">
          {!user ? (
            <>
              <NavLink to="/login"    className="nb-btn-outline" onClick={() => setMobileOpen(false)}>Log In</NavLink>
              <NavLink to="/register" className="nb-btn-primary" onClick={() => setMobileOpen(false)}>Get Started →</NavLink>
            </>
          ) : user.role === "admin" ? (
            <>
              <NavLink to="/admin" className="nb-btn-secondary" onClick={() => setMobileOpen(false)}>Admin Panel</NavLink>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="nb-btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/dashboard"       className="nb-btn-primary"   onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/my-appointments" className="nb-btn-outline"   onClick={() => setMobileOpen(false)}>Appointments</Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="nb-btn-danger">Logout</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;