import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const C = {
  primary:   "#683B2B",
  secondary: "#B08401",
  accent:    "#D49E8D",
  neutral:   "#DED1BD",
  light:     "#FAF6F2",
  black:     "#1A1008",
  gray:      "#78716C",
  white:     "#FFFFFF",
};

export default function BookingModal({ doctor, onClose, onSuccess }) {
  const { user } = useAuth();
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [reason, setReason]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","02:00 PM",
    "02:30 PM","03:00 PM","03:30 PM","04:00 PM",
  ];

  // Min date = today
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!date)   { setError("Please select a date.");       return; }
    if (!time)   { setError("Please select a time slot.");  return; }
    setError("");
    setLoading(true);
    try {
      // Combine date + time into ISO string
      const [h, mPart] = time.split(":");
      const minutes    = mPart.slice(0, 2);
      const isPM       = mPart.includes("PM");
      let hour         = parseInt(h);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      const dt = new Date(date);
      dt.setHours(hour, parseInt(minutes), 0, 0);

      await api.post("/appointments", {
        doctor: doctor._id,
        date:   dt.toISOString(),
        reason,
      });

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800&display=swap');

        .bm-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(26,16,8,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: bm-fade 0.2s ease;
        }
        @keyframes bm-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .bm-box {
          background: ${C.white}; border-radius: 24px;
          width: 100%; max-width: 500px;
          box-shadow: 0 24px 80px rgba(104,59,43,0.25);
          overflow: hidden;
          animation: bm-rise 0.25s ease;
        }
        @keyframes bm-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── HEADER ── */
        .bm-head {
          background: linear-gradient(135deg, ${C.primary} 0%, #4a2518 100%);
          padding: 1.5rem 1.75rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .bm-head-left { display: flex; align-items: center; gap: 0.85rem; }
        .bm-av {
          width: 46px; height: 46px; border-radius: 50%;
          background: linear-gradient(135deg, ${C.accent}, ${C.secondary});
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; font-weight: 800; color: white;
          font-family: 'Playfair Display', serif;
          border: 2px solid rgba(250,246,242,0.25);
          flex-shrink: 0;
        }
        .bm-doc-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 800; color: white;
        }
        .bm-doc-spec {
          font-size: 0.75rem; color: rgba(250,246,242,0.6);
          font-weight: 600; margin-top: 0.1rem;
        }
        .bm-close {
          background: rgba(250,246,242,0.12); border: none;
          color: rgba(250,246,242,0.7); width: 32px; height: 32px;
          border-radius: 50%; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
          font-family: 'Nunito', sans-serif;
        }
        .bm-close:hover { background: rgba(250,246,242,0.22); color: white; }

        /* ── BODY ── */
        .bm-body {
          padding: 1.75rem;
          font-family: 'Nunito', sans-serif;
        }

        /* Fee badge */
        .bm-fee {
          display: flex; align-items: center; justify-content: space-between;
          background: ${C.light}; border: 1.5px solid ${C.neutral};
          border-radius: 12px; padding: 0.85rem 1.1rem;
          margin-bottom: 1.5rem;
        }
        .bm-fee-lbl { font-size: 0.82rem; color: ${C.gray}; font-weight: 600; }
        .bm-fee-val { font-size: 1rem; font-weight: 800; color: ${C.secondary}; }

        /* Labels & inputs */
        .bm-label {
          display: block; font-size: 0.8rem; font-weight: 800;
          color: ${C.black}; margin-bottom: 0.4rem;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .bm-input {
          width: 100%; padding: 0.7rem 0.95rem;
          border: 2px solid ${C.neutral}; border-radius: 10px;
          font-size: 0.9rem; font-weight: 600; color: ${C.black};
          background: ${C.white}; outline: none;
          font-family: 'Nunito', sans-serif;
          transition: border-color 0.2s;
        }
        .bm-input:focus { border-color: ${C.primary}; }
        .bm-field { margin-bottom: 1.2rem; }

        /* Time slots */
        .bm-slots {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 0.5rem;
        }
        .bm-slot {
          padding: 0.48rem 0; border-radius: 8px; text-align: center;
          font-size: 0.74rem; font-weight: 800; cursor: pointer;
          border: 2px solid ${C.neutral}; background: ${C.white};
          color: ${C.black}; transition: all 0.18s;
          font-family: 'Nunito', sans-serif;
        }
        .bm-slot:hover  { border-color: ${C.accent}; color: ${C.primary}; }
        .bm-slot.active { border-color: ${C.primary}; background: rgba(104,59,43,0.08); color: ${C.primary}; }

        /* Error */
        .bm-error {
          background: rgba(180,60,40,0.08); border: 1.5px solid rgba(180,60,40,0.25);
          color: #B43C28; border-radius: 9px; padding: 0.6rem 0.9rem;
          font-size: 0.82rem; font-weight: 700; margin-bottom: 1rem;
        }

        /* Footer buttons */
        .bm-footer { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .bm-btn-cancel {
          flex: 1; padding: 0.75rem; border-radius: 11px;
          border: 2px solid ${C.neutral}; background: transparent;
          color: ${C.black}; font-weight: 800; font-size: 0.88rem;
          cursor: pointer; transition: all 0.2s;
          font-family: 'Nunito', sans-serif;
        }
        .bm-btn-cancel:hover { border-color: ${C.primary}; color: ${C.primary}; }
        .bm-btn-confirm {
          flex: 2; padding: 0.75rem; border-radius: 11px;
          border: none; background: ${C.primary}; color: white;
          font-weight: 800; font-size: 0.88rem; cursor: pointer;
          transition: all 0.2s; font-family: 'Nunito', sans-serif;
          box-shadow: 0 4px 14px rgba(104,59,43,0.3);
          display: flex; align-items: center; justify-content: center; gap: 0.4rem;
        }
        .bm-btn-confirm:hover:not(:disabled) {
          background: #7a4533;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(104,59,43,0.38);
        }
        .bm-btn-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="bm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="bm-box">

          {/* ── HEADER ── */}
          <div className="bm-head">
            <div className="bm-head-left">
              <div className="bm-av">
                {doctor.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
              </div>
              <div>
                <div className="bm-doc-name">{doctor.name}</div>
                <div className="bm-doc-spec">{doctor.specialization}</div>
              </div>
            </div>
            <button className="bm-close" onClick={onClose}>✕</button>
          </div>

          {/* ── BODY ── */}
          <div className="bm-body">

            {/* Fee */}
            <div className="bm-fee">
              <span className="bm-fee-lbl">Consultation Fee</span>
              <span className="bm-fee-val">₹{doctor.fees}</span>
            </div>

            {/* Date */}
            <div className="bm-field">
              <label className="bm-label">Select Date</label>
              <input
                type="date"
                className="bm-input"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Time Slots */}
            <div className="bm-field">
              <label className="bm-label">Select Time Slot</label>
              <div className="bm-slots">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`bm-slot ${time === slot ? "active" : ""}`}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason (optional) */}
            <div className="bm-field">
              <label className="bm-label">Reason <span style={{ fontWeight: 600, color: C.gray }}>(optional)</span></label>
              <textarea
                className="bm-input"
                rows={2}
                placeholder="Brief description of your concern..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>

            {/* Error */}
            {error && <div className="bm-error">⚠ {error}</div>}

            {/* Footer */}
            <div className="bm-footer">
              <button className="bm-btn-cancel" onClick={onClose}>Cancel</button>
              <button
                className="bm-btn-confirm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Booking…" : "Confirm Appointment →"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}