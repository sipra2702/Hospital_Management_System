iimport { useState, useEffect, useRef } from "react";

/* ───────── MOCK AUTH ───────── */
const useAuth = () => ({ user: { name: "Debasis Rout" } });

/* ───────── COLORS ───────── */
const C = {
  bg: "#FAF6F2",
  card: "#ffffff",
  border: "#DED1BD",
  text: "#683B2B",
  muted: "#B08401",
  primary: "#683B2B",
  secondary: "#B08401",
  accent: "#D49E8D",
  neutral: "#DED1BD",
};

/* ───────── COMPONENTS ───────── */

// ✅ Sparkline FIXED
const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80,
    h = 32;

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

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

const Ring = ({ pct, color }) => {
  const r = 30;
  const circ = 2 * Math.PI * r;

  return (
    <svg width="72" height="72">
      <circle cx="36" cy="36" r={r} stroke="#eee" strokeWidth="6" fill="none" />
      <circle
        cx="36"
        cy="36"
        r={r}
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
      />
    </svg>
  );
};

/* ───────── MAIN ───────── */

export default function AdminDashboard() {
  const { user } = useAuth();

  const [patients] = useState(120);
  const [doctors] = useState(25);
  const [appointments] = useState(45);

  const [sys, setSys] = useState([
    { label: "CPU", pct: 40, color: C.primary },
    { label: "Memory", pct: 60, color: C.secondary },
    { label: "Storage", pct: 50, color: C.accent },
  ]);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSys((prev) =>
        prev.map((s) => ({
          ...s,
          pct: Math.min(95, Math.max(10, s.pct + (Math.random() * 6 - 3))),
        }))
      );
    }, 2000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: 20 }}>
      <h1 style={{ color: C.primary }}>
        Welcome, {user?.name} 👋
      </h1>

      {/* METRICS */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Patients" value={patients} />
        <Card title="Doctors" value={doctors} />
        <Card title="Appointments" value={appointments} />
      </div>

      {/* SYSTEM */}
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {sys.map((s, i) => (
          <div key={i} style={{ background: "#fff", padding: 20 }}>
            <Ring pct={s.pct} color={s.color} />
            <h3>{s.label}</h3>
            <p>{Math.round(s.pct)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── CARD ───────── */

const Card = ({ title, value }) => (
  <div style={{ background: "#fff", padding: 20, width: 200 }}>
    <h4>{title}</h4>
    <h2>
      <Counter target={value} />
    </h2>
    <Sparkline data={[10, 20, 30, value]} color="#683B2B" />
  </div>
);