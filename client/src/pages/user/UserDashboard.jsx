import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const C = {
  bg: "#FAF6F2",
  primary: "#683B2B",
  secondary: "#B08401",
  accent: "#D49E8D",
  neutral: "#DED1BD",
  white: "#FFFFFF",
  gray: "#78716C",
  black: "#1A1008",
};

/* ── Animated Counter ── */
const Counter = ({ target }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      n = Math.min(n + step, target);
      setVal(n);
      if (n >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <>{val}</>;
};

export default function UserDashboard() {
  const { user } = useAuth();

  // These will later come from your API
  const [stats] = useState({
    appointments: 3,
    doctors: 2,
    records: 5,
    prescriptions: 4,
  });

  const recentAppointments = [
    { doctor: "Dr. Rahul Sharma", dept: "Cardiology",  date: "10 Apr 2025", status: "Upcoming"  },
    { doctor: "Dr. Anjali Verma",  dept: "Neurology",   date: "02 Apr 2025", status: "Completed" },
    { doctor: "Dr. Amit Singh",   dept: "Orthopedics", date: "28 Mar 2025", status: "Completed" },
  ];

  const quickLinks = [
    { icon: "📅", label: "Book Appointment", to: "/appointments"   },
    { icon: "🗂️", label: "Health Records",   to: "/records"        },
    { icon: "💊", label: "Pharmacy",          to: "/pharmacy"       },
    { icon: "👤", label: "My Profile",        to: "/profile"        },
  ];

  const statusColor = (s) =>
    s === "Upcoming"  ? { bg: "rgba(104,59,43,0.1)",  color: C.primary   } :
    s === "Completed" ? { bg: "rgba(176,132,1,0.1)",  color: C.secondary } :
                        { bg: "rgba(212,158,141,0.2)", color: C.accent    };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800&display=swap');

        .ud-root * { box-sizing: border-box; }
        .ud-root {
          font-family: 'Nunito', sans-serif;
          background: ${C.bg};
          min-height: 100vh;
          padding: 2.5rem 2rem;
          color: ${C.black};
        }

        /* ── HEADER ── */
        .ud-header { margin-bottom: 2.5rem; }
        .ud-greeting {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800; color: ${C.primary};
          margin-bottom: 0.3rem;
        }
        .ud-sub { color: ${C.gray}; font-size: 0.92rem; font-weight: 600; }

        /* ── STAT CARDS ── */
        .ud-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem; margin-bottom: 2.5rem;
        }
        .ud-stat {
          background: ${C.white}; border: 2px solid ${C.neutral};
          border-radius: 18px; padding: 1.4rem 1.5rem;
          display: flex; align-items: center; gap: 1rem;
          transition: all 0.22s;
        }
        .ud-stat:hover { border-color: ${C.accent}; box-shadow: 0 8px 28px rgba(104,59,43,0.12); transform: translateY(-2px); }
        .ud-stat-ico {
          width: 50px; height: 50px; border-radius: 14px;
          background: rgba(104,59,43,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; flex-shrink: 0;
        }
        .ud-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 800; color: ${C.black};
          line-height: 1;
        }
        .ud-stat-lbl { font-size: 0.78rem; color: ${C.gray}; font-weight: 600; margin-top: 0.2rem; }

        /* ── GRID ── */
        .ud-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        /* ── CARD ── */
        .ud-card {
          background: ${C.white}; border: 2px solid ${C.neutral};
          border-radius: 18px; padding: 1.6rem;
        }
        .ud-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 800;
          color: ${C.black}; margin-bottom: 1.3rem;
        }

        /* ── APPOINTMENTS TABLE ── */
        .ud-appt-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 0; border-bottom: 1px solid ${C.neutral};
          gap: 1rem;
        }
        .ud-appt-row:last-child { border-bottom: none; }
        .ud-appt-av {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, ${C.primary}, ${C.secondary});
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 800; color: white;
        }
        .ud-appt-doc  { font-weight: 800; font-size: 0.88rem; color: ${C.black}; }
        .ud-appt-dept { font-size: 0.74rem; color: ${C.gray}; }
        .ud-appt-date { font-size: 0.78rem; color: ${C.gray}; font-weight: 600; white-space: nowrap; }
        .ud-badge {
          font-size: 0.7rem; font-weight: 800;
          padding: 0.28rem 0.7rem; border-radius: 6px;
          white-space: nowrap;
        }

        /* ── QUICK LINKS ── */
        .ud-ql-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .ud-ql {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.85rem 1rem; border-radius: 12px;
          background: ${C.bg}; border: 2px solid ${C.neutral};
          text-decoration: none; color: ${C.black};
          font-weight: 800; font-size: 0.85rem;
          transition: all 0.2s;
        }
        .ud-ql:hover {
          border-color: ${C.primary};
          color: ${C.primary};
          background: rgba(104,59,43,0.05);
        }
        .ud-ql-ico {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(104,59,43,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }

        /* ── WELCOME BANNER ── */
        .ud-banner {
          background: linear-gradient(135deg, ${C.primary} 0%, #4a2518 100%);
          border-radius: 18px; padding: 1.6rem 1.8rem;
          margin-bottom: 1.5rem; position: relative; overflow: hidden;
        }
        .ud-banner::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(212,158,141,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .ud-banner-inner { position: relative; z-index: 2; }
        .ud-banner-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 800;
          color: white; margin-bottom: 0.4rem;
        }
        .ud-banner-p { color: rgba(250,246,242,0.65); font-size: 0.82rem; font-weight: 600; margin-bottom: 1rem; }
        .ud-banner-btn {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: ${C.secondary}; color: white;
          padding: 0.55rem 1.2rem; border-radius: 9px;
          font-weight: 800; font-size: 0.82rem;
          text-decoration: none; border: none; cursor: pointer;
          font-family: 'Nunito', sans-serif;
          transition: all 0.2s;
        }
        .ud-banner-btn:hover { background: #9a7301; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ud-stats { grid-template-columns: repeat(2, 1fr); }
          .ud-grid  { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .ud-stats { grid-template-columns: 1fr 1fr; }
          .ud-root  { padding: 1.5rem 1rem; }
        }
      `}</style>

      <div className="ud-root">

        {/* ── HEADER ── */}
        <div className="ud-header">
          <div className="ud-greeting">Welcome back, {user?.name} 👋</div>
          <div className="ud-sub">Here's a summary of your health activity</div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="ud-stats">
          {[
            { icon: "📅", label: "My Appointments", val: stats.appointments },
            { icon: "👨‍⚕️", label: "My Doctors",      val: stats.doctors       },
            { icon: "🗂️", label: "Health Records",   val: stats.records       },
            { icon: "💊", label: "Prescriptions",    val: stats.prescriptions },
          ].map((s) => (
            <div className="ud-stat" key={s.label}>
              <div className="ud-stat-ico">{s.icon}</div>
              <div>
                <div className="ud-stat-val"><Counter target={s.val} /></div>
                <div className="ud-stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="ud-grid">

          {/* LEFT — Recent Appointments */}
          <div className="ud-card">
            <div className="ud-card-title">Recent Appointments</div>
            {recentAppointments.map((a, i) => {
              const sc = statusColor(a.status);
              return (
                <div className="ud-appt-row" key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                    <div className="ud-appt-av">{a.doctor.split(" ")[1]?.[0]}{a.doctor.split(" ")[2]?.[0]}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className="ud-appt-doc">{a.doctor}</div>
                      <div className="ud-appt-dept">{a.dept}</div>
                    </div>
                  </div>
                  <div className="ud-appt-date">{a.date}</div>
                  <span className="ud-badge" style={{ background: sc.bg, color: sc.color }}>{a.status}</span>
                </div>
              );
            })}
            <div style={{ marginTop: "1.2rem" }}>
              <Link
                to="/my-appointments"
                style={{
                  fontSize: "0.84rem", fontWeight: 800,
                  color: C.primary, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "0.3rem"
                }}
              >
                View all appointments →
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Welcome Banner */}
            <div className="ud-banner">
              <div className="ud-banner-inner">
                <div className="ud-banner-h">Book your next visit</div>
                <div className="ud-banner-p">Schedule with any of our 150+ specialists instantly</div>
                <Link to="/appointments" className="ud-banner-btn">Book Appointment →</Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="ud-card">
              <div className="ud-card-title">Quick Actions</div>
              <div className="ud-ql-grid">
                {quickLinks.map((q) => (
                  <Link to={q.to} className="ud-ql" key={q.label}>
                    <div className="ud-ql-ico">{q.icon}</div>
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}