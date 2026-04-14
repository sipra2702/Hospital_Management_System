import React, { useEffect, useState } from "react";
import api from "../../services/api";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");
      setAppointments(res.data.data);
    } catch (error) {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const statusStyle = (status) => {
    if (status === "approved")  return { bg: "rgba(176,132,1,0.12)",  color: "#B08401" };
    if (status === "rejected")  return { bg: "rgba(104,59,43,0.1)",   color: "#683B2B" };
    return                             { bg: "rgba(212,158,141,0.2)", color: "#c47a5a" };
  };

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#FAF6F2",
        fontFamily: "'Nunito', sans-serif", color: "#683B2B",
        fontSize: "1rem", fontWeight: 700,
      }}>
        Loading your appointments…
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800&display=swap');

        .ma-root * { box-sizing: border-box; }
        .ma-root {
          font-family: 'Nunito', sans-serif;
          background: #FAF6F2;
          min-height: 100vh;
          padding: 2.5rem 2rem;
          color: #1A1008;
        }

        /* ── HEADER ── */
        .ma-header { margin-bottom: 2rem; }
        .ma-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800; color: #683B2B; margin-bottom: 0.3rem;
        }
        .ma-sub { color: #78716C; font-size: 0.9rem; font-weight: 600; }

        /* ── CARD ── */
        .ma-card {
          background: #FFFFFF;
          border: 2px solid #DED1BD;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(104,59,43,0.08);
        }

        /* ── TABLE ── */
        .ma-table { width: 100%; border-collapse: collapse; }
        .ma-thead { background: linear-gradient(135deg, #683B2B 0%, #4a2518 100%); }
        .ma-thead th {
          padding: 1rem 1.25rem;
          font-size: 0.78rem; font-weight: 800;
          color: rgba(250,246,242,0.85);
          text-transform: uppercase; letter-spacing: 0.06em;
          text-align: left;
        }
        .ma-row { border-top: 1px solid #DED1BD; transition: background 0.18s; }
        .ma-row:hover { background: #fdf5ee; }
        .ma-td { padding: 1rem 1.25rem; vertical-align: middle; }

        /* doctor info cell */
        .ma-doc-cell { display: flex; align-items: center; gap: 0.75rem; }
        .ma-av {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #683B2B, #B08401);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; font-weight: 800; color: white;
        }
        .ma-doc-name  { font-weight: 800; font-size: 0.88rem; color: #1A1008; }
        .ma-doc-spec  { font-size: 0.74rem; color: #78716C; }

        /* date */
        .ma-date { font-size: 0.86rem; font-weight: 700; color: #1A1008; }
        .ma-time { font-size: 0.74rem; color: #78716C; }

        /* reason */
        .ma-reason { font-size: 0.82rem; color: #78716C; font-weight: 600; max-width: 180px; }

        /* status badge */
        .ma-badge {
          display: inline-block;
          font-size: 0.72rem; font-weight: 800;
          padding: 0.3rem 0.8rem; border-radius: 6px;
          text-transform: capitalize;
        }

        /* fees */
        .ma-fees { font-size: 0.86rem; font-weight: 800; color: #B08401; }

        /* ── EMPTY STATE ── */
        .ma-empty {
          padding: 4rem 2rem; text-align: center;
        }
        .ma-empty-ico { font-size: 3rem; margin-bottom: 1rem; }
        .ma-empty-t {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 800;
          color: #683B2B; margin-bottom: 0.5rem;
        }
        .ma-empty-s { font-size: 0.88rem; color: #78716C; font-weight: 600; }
        .ma-empty-btn {
          display: inline-flex; align-items: center; gap: 0.35rem;
          margin-top: 1.5rem; background: #683B2B; color: white;
          padding: 0.7rem 1.5rem; border-radius: 10px;
          font-weight: 800; font-size: 0.88rem;
          text-decoration: none; border: none; cursor: pointer;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 4px 14px rgba(104,59,43,0.28);
          transition: all 0.2s;
        }
        .ma-empty-btn:hover { background: #7a4533; transform: translateY(-1px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .ma-root    { padding: 1.5rem 1rem; }
          .ma-hide    { display: none; }
          .ma-thead th, .ma-td { padding: 0.85rem 0.75rem; }
        }
      `}</style>

      <div className="ma-root">

        {/* ── HEADER ── */}
        <div className="ma-header">
          <div className="ma-title">My Appointments</div>
          <div className="ma-sub">
            {appointments.length > 0
              ? `${appointments.length} appointment${appointments.length > 1 ? "s" : ""} found`
              : "No appointments yet"}
          </div>
        </div>

        {/* ── TABLE CARD ── */}
        <div className="ma-card">
          {appointments.length === 0 ? (

            /* ── EMPTY STATE ── */
            <div className="ma-empty">
              <div className="ma-empty-ico">📅</div>
              <div className="ma-empty-t">No appointments booked yet</div>
              <div className="ma-empty-s">Visit our doctors page and book your first appointment</div>
              <a href="/doctor" className="ma-empty-btn">Browse Doctors →</a>
            </div>

          ) : (
            <table className="ma-table">
              <thead className="ma-thead">
                <tr>
                  <th>Doctor</th>
                  <th className="ma-hide">Fees</th>
                  <th>Date & Time</th>
                  <th className="ma-hide">Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => {
                  const sc  = statusStyle(appt.status);
                  const dt  = new Date(appt.date);
                  const initials = appt.doctor?.name
                    ?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "DR";

                  return (
                    <tr key={appt._id} className="ma-row">

                      {/* Doctor */}
                      <td className="ma-td">
                        <div className="ma-doc-cell">
                          <div className="ma-av">{initials}</div>
                          <div>
                            <div className="ma-doc-name">{appt.doctor?.name || "—"}</div>
                            <div className="ma-doc-spec">{appt.doctor?.specialization || "—"}</div>
                          </div>
                        </div>
                      </td>

                      {/* Fees */}
                      <td className="ma-td ma-hide">
                        <span className="ma-fees">
                          {appt.doctor?.fees ? `₹${appt.doctor.fees}` : "—"}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="ma-td">
                        <div className="ma-date">
                          {dt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                        <div className="ma-time">
                          {dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>

                      {/* Reason */}
                      <td className="ma-td ma-hide">
                        <div className="ma-reason">
                          {appt.reason || <span style={{ color: "#DED1BD" }}>Not specified</span>}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="ma-td">
                        <span
                          className="ma-badge"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {appt.status}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAppointment;