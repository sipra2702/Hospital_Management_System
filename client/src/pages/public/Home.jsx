import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";

/* ─── Animated Counter ───────────────────────────────────── */
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(end)) return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
};

/* ─── In-View Hook ────────────────────────────────────────── */
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─── Animated Stat ───────────────────────────────────────── */
const Stat = ({ number, suffix, label, icon }) => {
  const [ref, inView] = useInView();
  const raw   = parseFloat(String(number).replace(/[^0-9.]/g, ""));
  const count = useCounter(raw, 1800, inView);
  return (
    <div ref={ref} className="hm-stat">
      <div className="hm-stat-ico">{icon}</div>
      <div className="hm-stat-num">{inView ? count : 0}{suffix}</div>
      <div className="hm-stat-lbl">{label}</div>
    </div>
  );
};

/* ─── Home ────────────────────────────────────────────────── */
const Home = () => {
  const { user } = useAuth();
  const [activeFeat, setActiveFeat] = useState(0);

  /* DATA */
  const features = [
    { icon: "📅", title: "Smart Scheduling",         desc: "AI-powered appointment booking with real-time availability, zero conflicts, and automated patient reminders sent via SMS & email.",       chips: ["Auto Reminders", "Conflict-Free", "Real-time Slots"] },
    { icon: "🗂️", title: "Electronic Health Records", desc: "Complete digital patient profiles — history, labs, prescriptions, imaging reports, and treatment plans — encrypted and always accessible.", chips: ["Fully Encrypted", "Instant Search", "Shareable Reports"] },
    { icon: "💊", title: "Pharmacy Integration",      desc: "Connect e-prescriptions directly to your in-house pharmacy. Track inventory, set reorder alerts, and manage dispensing seamlessly.",       chips: ["E-Prescriptions", "Inventory Alerts", "Digital Dispensing"] },
    { icon: "🧪", title: "Lab & Diagnostics",          desc: "Order tests, receive results digitally, and share reports within the platform. Integrates with all major diagnostic lab systems.",       chips: ["Fast Turnaround", "Digital Results", "Lab API Ready"] },
    { icon: "💰", title: "Billing & Insurance",        desc: "Automated GST-compliant billing, insurance claim processing, and payment tracking — reduce revenue leakage with smart workflows.",        chips: ["GST Compliant", "Auto Claims", "Zero Leakage"] },
    { icon: "📊", title: "Analytics Dashboard",        desc: "Live hospital metrics — OPD trends, bed occupancy, doctor utilisation, and revenue analytics — all in one command centre.",              chips: ["Live Metrics", "OPD Trends", "Revenue Insights"] },
  ];

  const departments = [
    { name: "Cardiology",       icon: "❤️",  docs: 12 },
    { name: "Neurology",        icon: "🧠",  docs: 8  },
    { name: "Orthopedics",      icon: "🦴",  docs: 10 },
    { name: "Pediatrics",       icon: "👶",  docs: 7  },
    { name: "Radiology",        icon: "🔬",  docs: 6  },
    { name: "Dermatology",      icon: "🩺",  docs: 5  },
    { name: "Oncology",         icon: "🎗️", docs: 9  },
    { name: "General Medicine", icon: "💉",  docs: 15 },
    { name: "Ophthalmology",    icon: "👁️", docs: 4  },
    { name: "Gynecology",       icon: "🌸",  docs: 8  },
    { name: "Psychiatry",       icon: "🧘",  docs: 5  },
    { name: "ENT",              icon: "👂",  docs: 6  },
  ];

  const doctors = [
    { name: "Dr. Rahul Sharma", dept: "Cardiologist", exp: "15 yrs", rating: 4.9, patients: "3.2K", initials: "RS" },
    { name: "Dr. Anjali Verma",  dept: "Neurologist",  exp: "12 yrs", rating: 4.8, patients: "2.8K", initials: "AV" },
    { name: "Dr. Amit Singh",   dept: "Orthopedic",   exp: "10 yrs", rating: 4.7, patients: "2.1K", initials: "AS" },
  ];

  const testimonials = [
    { name: "Priya M.",     role: "Patient",          text: "Booking an appointment was effortless. The system sent me reminders and I could see my lab reports online. Highly recommend!" },
    { name: "Dr. Vikram N.", role: "Senior Physician", text: "This platform has cut our admin workload by 60%. Managing patient records and schedules has never been smoother." },
    { name: "Suresh K.",    role: "Hospital Admin",   text: "The insurance claim automation saved us hours every week. Billing disputes have dropped to near zero." },
  ];

  const quickActions = [
    { icon: "📅", title: "Book Appointment", sub: "Available today",   to: "/appointments" },
    { icon: "👤", title: "Patient Portal",   sub: "View your records", to: "/records"      },
    { icon: "🚨", title: "Emergency",        sub: "24/7 support",      to: "/emergency"    },
    { icon: "💊", title: "Pharmacy",         sub: "Order medicines",   to: "/pharmacy"     },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');

        /* ── PALETTE ── */
        :root {
          --p:   #683B2B;   /* primary   – deep brown  */
          --p2:  #7a4533;   /* primary hover           */
          --s:   #B08401;   /* secondary – gold        */
          --s2:  #9a7301;   /* secondary hover         */
          --a:   #D49E8D;   /* accent    – blush       */
          --l:   #FAF6F2;   /* light     – cream       */
          --n:   #DED1BD;   /* neutral   – warm sand   */
          --bl:  #1A1008;   /* near-black              */
          --wh:  #FFFFFF;
          --gray:#78716C;
          --sh:  0 4px 24px rgba(104,59,43,0.10);
          --sh2: 0 16px 56px rgba(104,59,43,0.16);
        }

        /* ── RESET ── */
        .hm-root *, .hm-root *::before, .hm-root *::after { box-sizing: border-box; }
        .hm-root {
          font-family: 'Nunito', sans-serif; color: var(--bl);
          overflow-x: hidden; padding-top: 72px; /* fixed navbar height */
        }

        /* ── SHARED ── */
        .hm-sec   { padding: 6rem 0; }
        .hm-wrap  { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .hm-tag   {
          display: inline-block; background: rgba(104,59,43,0.1); color: var(--p);
          font-size: 0.74rem; font-weight: 800; padding: 0.34rem 0.9rem; border-radius: 50px;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.85rem;
        }
        .hm-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800;
          color: var(--bl); line-height: 1.2; margin-bottom: 0.85rem;
        }
        .hm-desc  { color: var(--gray); font-size: 1rem; line-height: 1.78; max-width: 500px; }
        .hm-hrow  { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; gap: 2rem; flex-wrap: wrap; }

        /* ── BUTTONS ── */
        .hm-btn-primary {
          background: var(--p); color: var(--wh); padding: 0.9rem 2rem; border-radius: 12px;
          font-weight: 800; font-size: 1rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          border: none; cursor: pointer; transition: all 0.25s; font-family: 'Nunito', sans-serif;
          box-shadow: 0 6px 20px rgba(104,59,43,0.32);
        }
        .hm-btn-primary:hover { background: var(--p2); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(104,59,43,0.4); }

        .hm-btn-secondary {
          background: var(--s); color: var(--wh); padding: 0.9rem 2rem; border-radius: 12px;
          font-weight: 800; font-size: 1rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          border: none; cursor: pointer; transition: all 0.25s; font-family: 'Nunito', sans-serif;
          box-shadow: 0 6px 20px rgba(176,132,1,0.28);
        }
        .hm-btn-secondary:hover { background: var(--s2); transform: translateY(-2px); }

        .hm-btn-ghost {
          background: rgba(250,246,242,0.14); color: var(--wh); padding: 0.9rem 2rem; border-radius: 12px;
          font-weight: 700; font-size: 1rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          border: 2px solid rgba(250,246,242,0.3); cursor: pointer; transition: all 0.25s;
          backdrop-filter: blur(8px); font-family: 'Nunito', sans-serif;
        }
        .hm-btn-ghost:hover { background: rgba(250,246,242,0.22); border-color: rgba(250,246,242,0.55); }

        .hm-btn-outline {
          background: transparent; color: var(--bl); padding: 0.65rem 1.5rem; border-radius: 10px;
          font-weight: 800; font-size: 0.88rem; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.35rem;
          border: 2px solid var(--n); cursor: pointer; transition: all 0.2s; font-family: 'Nunito', sans-serif;
        }
        .hm-btn-outline:hover { border-color: var(--p); color: var(--p); background: rgba(104,59,43,0.06); }

        /* ══ HERO ══════════════════════════════════════════════════════════ */
        .hm-hero {
          min-height: calc(100vh - 72px);
          background: linear-gradient(135deg, var(--p) 0%, #4a2518 55%, #3a1c10 100%);
          display: flex; align-items: center; position: relative; overflow: hidden;
        }
        /* warm grain texture overlay */
        .hm-hero::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }
        /* warm pattern */
        .hm-hero-pattern {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            radial-gradient(circle at 20% 80%, rgba(212,158,141,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(176,132,1,0.10) 0%, transparent 50%),
            linear-gradient(rgba(212,158,141,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.04) 1px, transparent 1px);
          background-size: auto, auto, 55px 55px, 55px 55px;
        }
        .hm-hero-inner {
          max-width: 1280px; margin: 0 auto; padding: 5rem 2rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: center; position: relative; z-index: 2; width: 100%;
        }
        .hm-hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(212,158,141,0.18); border: 1px solid rgba(212,158,141,0.35);
          color: var(--a); padding: 0.4rem 1rem; border-radius: 50px;
          font-size: 0.78rem; font-weight: 800; margin-bottom: 1.5rem;
          letter-spacing: 0.07em; text-transform: uppercase;
        }
        .hm-badge-dot {
          width: 6px; height: 6px; background: var(--a); border-radius: 50%;
          animation: hm-blink 1.6s infinite;
        }
        @keyframes hm-blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
        .hm-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 900;
          color: var(--wh); line-height: 1.12; margin-bottom: 1.4rem;
        }
        .hm-hero-accent { color: var(--a); }
        .hm-hero-p {
          color: rgba(250,246,242,0.68); font-size: 1.08rem;
          line-height: 1.78; margin-bottom: 2.5rem; max-width: 460px;
        }
        .hm-hero-acts { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }

        /* trust row */
        .hm-trust { display: flex; align-items: center; gap: 1.2rem; }
        .hm-trust-avs { display: flex; }
        .hm-trust-av {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid rgba(250,246,242,0.4);
          background: linear-gradient(135deg, var(--a), var(--s));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; color: white; font-weight: 800; margin-left: -9px;
        }
        .hm-trust-av:first-child { margin-left: 0; }
        .hm-trust-txt { color: rgba(250,246,242,0.6); font-size: 0.82rem; font-weight: 600; }
        .hm-trust-txt strong { color: var(--wh); }

        /* HERO VISUAL */
        .hm-hero-visual { position: relative; }
        .hm-hero-card {
          background: rgba(250,246,242,0.08); backdrop-filter: blur(18px);
          border: 1px solid rgba(212,158,141,0.2); border-radius: 28px;
          padding: 1.4rem; position: relative;
        }
        .hm-hero-img {
          width: 100%; border-radius: 20px; aspect-ratio: 4/3; object-fit: cover;
          object-position: center top;
        }
        /* floating stat cards */
        .hm-fc {
          position: absolute; background: var(--wh); border-radius: 14px;
          padding: 0.85rem 1.1rem; box-shadow: 0 16px 48px rgba(104,59,43,0.22);
          display: flex; align-items: center; gap: 0.7rem; min-width: 170px;
        }
        .hm-fc-1 { bottom: -18px; left: -24px; animation: hm-fl 3.2s ease-in-out infinite; }
        .hm-fc-2 { top:    -18px; right:-24px; animation: hm-fl 3.2s ease-in-out infinite 1.6s; }
        @keyframes hm-fl { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .hm-fc-ico { font-size: 1.4rem; }
        .hm-fc-lbl { font-size: 0.68rem; color: var(--gray); font-weight: 600; }
        .hm-fc-val { font-size: 0.92rem; font-weight: 800; color: var(--bl); }

        /* ══ QUICK ACTIONS ═══════════════════════════════════════════════ */
        .hm-quick { background: var(--wh); box-shadow: 0 8px 40px rgba(104,59,43,0.1); position: relative; z-index: 10; }
        .hm-quick-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2rem;
          display: grid; grid-template-columns: repeat(4,1fr);
        }
        .hm-qa {
          padding: 1.5rem 1rem; display: flex; align-items: center; gap: 0.9rem;
          text-decoration: none; color: inherit;
          border-right: 1px solid var(--n); transition: background 0.2s; cursor: pointer;
        }
        .hm-qa:last-child { border-right: none; }
        .hm-qa:hover { background: #fdf5ee; }
        .hm-qa:hover .hm-qa-title { color: var(--p); }
        .hm-qa-ico {
          width: 46px; height: 46px; border-radius: 12px;
          background: rgba(104,59,43,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem; flex-shrink: 0; transition: background 0.2s;
        }
        .hm-qa:hover .hm-qa-ico { background: rgba(104,59,43,0.14); }
        .hm-qa-title { font-weight: 800; font-size: 0.9rem; color: var(--bl); margin-bottom: 0.1rem; transition: color 0.2s; }
        .hm-qa-sub   { font-size: 0.76rem; color: var(--gray); }

        /* ══ FEATURES ════════════════════════════════════════════════════ */
        .hm-feat-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 1.5rem; align-items: start; }
        .hm-feat-tabs { display: flex; flex-direction: column; gap: 0.45rem; }
        .hm-feat-tab {
          padding: 1.1rem 1.25rem; border-radius: 14px; cursor: pointer;
          display: flex; align-items: center; gap: 0.9rem;
          border: 2px solid transparent; text-align: left;
          transition: all 0.22s; background: none; width: 100%; font-family: 'Nunito', sans-serif;
        }
        .hm-feat-tab.on  { background: var(--wh); border-color: var(--n); box-shadow: var(--sh); }
        .hm-feat-tab:not(.on):hover { background: rgba(104,59,43,0.05); }
        .hm-tab-ico {
          font-size: 1.25rem; width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hm-feat-tab.on  .hm-tab-ico { background: rgba(104,59,43,0.1); }
        .hm-feat-tab:not(.on) .hm-tab-ico { background: #F3F4F6; }
        .hm-tab-t { font-weight: 800; font-size: 0.92rem; color: var(--bl); }
        .hm-tab-s { font-size: 0.76rem; color: var(--gray); }
        .hm-feat-panel {
          background: var(--wh); border-radius: 22px; padding: 2.4rem;
          box-shadow: var(--sh2); border: 1px solid var(--n);
          position: sticky; top: 88px;
        }
        .hm-panel-ico  { font-size: 2.8rem; margin-bottom: 0.9rem; }
        .hm-panel-h    { font-family: 'Playfair Display', serif; font-size: 1.55rem; font-weight: 800; color: var(--bl); margin-bottom: 0.85rem; }
        .hm-panel-p    { color: var(--gray); line-height: 1.78; font-size: 0.97rem; margin-bottom: 1.75rem; }
        .hm-chips      { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .hm-chip       { background: rgba(104,59,43,0.07); color: var(--p); font-size: 0.76rem; font-weight: 800; padding: 0.38rem 0.75rem; border-radius: 7px; }

        /* ══ DEPARTMENTS ════════════════════════════════════════════════ */
        .hm-dept-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
        .hm-dept-card {
          background: var(--wh); border: 2px solid var(--n); border-radius: 14px;
          padding: 1.3rem; display: flex; align-items: center; gap: 0.85rem;
          text-decoration: none; color: inherit; transition: all 0.22s; cursor: pointer;
        }
        .hm-dept-card:hover { border-color: var(--p); box-shadow: 0 8px 28px rgba(104,59,43,0.13); transform: translateY(-2px); }
        .hm-dept-card:hover .hm-dept-name { color: var(--p); }
        .hm-dept-ico  { font-size: 1.5rem; width: 46px; height: 46px; background: rgba(104,59,43,0.08); border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hm-dept-name { font-weight: 800; font-size: 0.88rem; color: var(--bl); transition: color 0.2s; }
        .hm-dept-docs { font-size: 0.73rem; color: var(--gray); }

        /* ══ DOCTORS ════════════════════════════════════════════════════ */
        .hm-docs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .hm-doc-card  {
          background: var(--wh); border: 2px solid var(--n); border-radius: 22px;
          overflow: hidden; transition: all 0.3s; cursor: pointer;
        }
        .hm-doc-card:hover { box-shadow: var(--sh2); transform: translateY(-4px); border-color: var(--a); }
        .hm-doc-head  {
          background: linear-gradient(135deg, var(--p) 0%, #4a2518 100%);
          padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem;
        }
        .hm-doc-av {
          width: 76px; height: 76px; border-radius: 50%;
          background: linear-gradient(135deg, var(--a), var(--s));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem; font-weight: 800; color: white; font-family: 'Playfair Display', serif;
          border: 3px solid rgba(250,246,242,0.22);
        }
        .hm-doc-name  { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem; color: var(--wh); text-align: center; }
        .hm-doc-badge {
          background: rgba(212,158,141,0.2); border: 1px solid rgba(212,158,141,0.4);
          color: var(--a); font-size: 0.73rem; font-weight: 800; padding: 0.28rem 0.75rem; border-radius: 50px;
        }
        .hm-doc-body  { padding: 1.4rem; }
        .hm-doc-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.5rem; margin-bottom: 1.1rem; }
        .hm-doc-s     { text-align: center; }
        .hm-doc-sv    { font-weight: 800; font-size: 1rem; color: var(--bl); }
        .hm-doc-sl    { font-size: 0.7rem; color: var(--gray); }
        .hm-doc-div   { height: 1px; background: var(--n); margin-bottom: 1.1rem; }
        .hm-doc-row   { display: flex; align-items: center; justify-content: space-between; }
        .hm-stars     { color: var(--s); font-size: 0.82rem; letter-spacing: 1px; }
        .hm-rtxt      { font-size: 0.78rem; color: var(--gray); }
        .hm-book-btn  {
          width: 100%; background: rgba(104,59,43,0.08); color: var(--p);
          border: none; padding: 0.72rem; border-radius: 9px; font-weight: 800;
          font-size: 0.86rem; cursor: pointer; transition: all 0.2s; margin-top: 0.7rem;
          font-family: 'Nunito', sans-serif;
        }
        .hm-book-btn:hover { background: var(--p); color: var(--wh); }

        /* ══ STATS ══════════════════════════════════════════════════════ */
        .hm-stats-sec {
          background: linear-gradient(135deg, var(--p) 0%, #3a1c10 100%);
          padding: 5rem 0; position: relative; overflow: hidden;
        }
        .hm-stats-sec::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(212,158,141,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.07) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .hm-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; position: relative; z-index: 2; }
        .hm-stat       { text-align: center; }
        .hm-stat-ico   { font-size: 2.3rem; margin-bottom: 0.85rem; }
        .hm-stat-num   { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem,4vw,2.9rem); font-weight: 900; color: var(--wh); margin-bottom: 0.2rem; }
        .hm-stat-lbl   { color: rgba(250,246,242,0.55); font-size: 0.88rem; font-weight: 600; }

        /* ══ TESTIMONIALS ═══════════════════════════════════════════════ */
        .hm-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .hm-testi-card {
          background: var(--wh); border-radius: 18px; padding: 1.85rem;
          border: 2px solid var(--n); position: relative;
        }
        .hm-testi-card::before {
          content: '"'; font-size: 4rem; color: var(--a);
          font-family: 'Playfair Display', serif; line-height: 1;
          position: absolute; top: 0.8rem; right: 1.3rem; opacity: 0.35;
        }
        .hm-testi-txt  { color: #4a3728; line-height: 1.78; font-size: 0.93rem; margin-bottom: 1.4rem; }
        .hm-testi-auth { display: flex; align-items: center; gap: 0.7rem; }
        .hm-testi-av   {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, var(--p), var(--s));
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; color: white; font-size: 0.92rem; flex-shrink: 0;
        }
        .hm-testi-name  { font-weight: 800; font-size: 0.88rem; color: var(--bl); }
        .hm-testi-role  { font-size: 0.75rem; color: var(--gray); }
        .hm-testi-stars { color: var(--s); font-size: 0.76rem; margin-top: 0.15rem; }

        /* ══ CTA ════════════════════════════════════════════════════════ */
        .hm-cta {
          background: linear-gradient(135deg, var(--s) 0%, #7a5801 50%, var(--p) 100%);
          padding: 5.5rem 0; text-align: center; position: relative; overflow: hidden;
        }
        .hm-cta::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23fff' fill-opacity='0.06'/%3E%3C/svg%3E");
        }
        .hm-cta-inner { position: relative; z-index: 2; }
        .hm-cta-h2    { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem,4vw,2.9rem); font-weight: 900; color: var(--wh); margin-bottom: 0.85rem; }
        .hm-cta-p     { color: rgba(250,246,242,0.8); font-size: 1.05rem; margin-bottom: 2.4rem; font-weight: 600; }
        .hm-cta-acts  { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* ══ FOOTER ═════════════════════════════════════════════════════ */
        .hm-footer { background: #2a1408; padding: 4rem 0 2rem; }
        .hm-ft-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem; margin-bottom: 3rem;
        }
        .hm-ft-brand { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 800; color: var(--wh); margin-bottom: 0.85rem; }
        .hm-ft-brand span { color: var(--a); }
        .hm-ft-desc  { color: rgba(250,246,242,0.38); font-size: 0.86rem; line-height: 1.72; }
        .hm-ft-col-t { font-weight: 800; color: var(--n); margin-bottom: 0.9rem; font-size: 0.86rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .hm-ft-links { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
        .hm-ft-links a { color: rgba(250,246,242,0.4); font-size: 0.83rem; text-decoration: none; transition: color 0.2s; font-weight: 600; }
        .hm-ft-links a:hover { color: var(--a); }
        .hm-ft-bottom {
          border-top: 1px solid rgba(222,209,189,0.12); padding-top: 1.4rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .hm-ft-copy   { color: rgba(250,246,242,0.3); font-size: 0.8rem; font-weight: 600; }
        .hm-ft-badges { display: flex; gap: 0.6rem; }
        .hm-ft-badge  { background: rgba(222,209,189,0.08); color: rgba(250,246,242,0.38); font-size: 0.7rem; padding: 0.28rem 0.6rem; border-radius: 5px; font-weight: 800; }

        /* ══ RESPONSIVE ═════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .hm-hero-inner  { grid-template-columns: 1fr; text-align: center; }
          .hm-hero-p      { margin: 0 auto 2.5rem; }
          .hm-hero-acts   { justify-content: center; }
          .hm-trust       { justify-content: center; }
          .hm-hero-visual { display: none; }
          .hm-feat-grid   { grid-template-columns: 1fr; }
          .hm-dept-grid   { grid-template-columns: repeat(3,1fr); }
          .hm-stats-grid  { grid-template-columns: repeat(2,1fr); }
          .hm-ft-grid     { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .hm-sec         { padding: 4rem 0; }
          .hm-quick-inner { grid-template-columns: repeat(2,1fr); }
          .hm-dept-grid   { grid-template-columns: repeat(2,1fr); }
          .hm-docs-grid   { grid-template-columns: 1fr; }
          .hm-testi-grid  { grid-template-columns: 1fr; }
          .hm-ft-grid     { grid-template-columns: 1fr; gap: 2rem; }
          .hm-hrow        { flex-direction: column; align-items: flex-start; }
          .hm-ft-bottom   { flex-direction: column; gap: 1rem; text-align: center; }
        }
        @media (max-width: 480px) {
          .hm-quick-inner { grid-template-columns: 1fr; }
          .hm-dept-grid   { grid-template-columns: 1fr 1fr; }
          .hm-stats-grid  { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="hm-root">

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section className="hm-hero" id="home">
          <div className="hm-hero-pattern" />
          <div className="hm-hero-inner">

            {/* LEFT TEXT */}
            <div>
              <div className="hm-hero-badge">
                <span className="hm-badge-dot" />
                Trusted Healthcare Platform
              </div>
              <h1 className="hm-hero-h1">
                Modern Care,<br />
                <span className="hm-hero-accent">Compassionate</span><br />
                Medicine
              </h1>
              <p className="hm-hero-p">
                MediCare brings patients, doctors, and hospital staff together on one intelligent platform —
                from appointments and records to billing and analytics.
              </p>
              <div className="hm-hero-acts">
                {!user ? (
                  <>
                    <Link to="/register" className="hm-btn-secondary">Get Started Free →</Link>
                    <Link to="/login"    className="hm-btn-ghost">Log In</Link>
                  </>
                ) : (
                  /* ✅ WORKING DASHBOARD LINK */
                  <Link to="/dashboard" className="hm-btn-secondary">Go to Dashboard →</Link>
                )}
              </div>
              <div className="hm-trust">
                <div className="hm-trust-avs">
                  {["A","R","S","P"].map((l,i) => <div key={i} className="hm-trust-av">{l}</div>)}
                </div>
                <div className="hm-trust-txt">
                  Trusted by <strong>2,500+ hospitals</strong> across India
                </div>
              </div>
            </div>

            {/* RIGHT – doctor image card */}
            <div className="hm-hero-visual">
              <div className="hm-hero-card">
                {/* ✅ REAL DOCTOR PHOTO */}
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80"
                  alt="Doctor"
                  className="hm-hero-img"
                />
                <div className="hm-fc hm-fc-1">
                  <div className="hm-fc-ico">📅</div>
                  <div>
                    <div className="hm-fc-lbl">Today's Appointments</div>
                    <div className="hm-fc-val">48 Booked</div>
                  </div>
                </div>
                <div className="hm-fc hm-fc-2">
                  <div className="hm-fc-ico">🛏️</div>
                  <div>
                    <div className="hm-fc-lbl">Beds Available</div>
                    <div className="hm-fc-val">124 / 200</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ QUICK ACTIONS ════════════════════════════════════════════ */}
        <div className="hm-quick" id="services">
          <div className="hm-quick-inner">
            {quickActions.map((qa) => (
              <Link to={qa.to} className="hm-qa" key={qa.title}>
                <div className="hm-qa-ico">{qa.icon}</div>
                <div>
                  <div className="hm-qa-title">{qa.title}</div>
                  <div className="hm-qa-sub">{qa.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ══ FEATURES ════════════════════════════════════════════════ */}
        <section className="hm-sec" style={{ background: "var(--l)" }}>
          <div className="hm-wrap">
            <div className="hm-hrow">
              <div>
                <span className="hm-tag">Platform Features</span>
                <h2 className="hm-h2">Everything your hospital needs,<br />in one platform</h2>
              </div>
              <p className="hm-desc">From scheduling to insurance claims — we handle the complexity so your team can focus on care.</p>
            </div>
            <div className="hm-feat-grid">
              <div className="hm-feat-tabs">
                {features.map((f,i) => (
                  <button key={i} className={`hm-feat-tab ${activeFeat===i?"on":""}`} onClick={() => setActiveFeat(i)}>
                    <div className="hm-tab-ico">{f.icon}</div>
                    <div><div className="hm-tab-t">{f.title}</div><div className="hm-tab-s">Click to explore</div></div>
                  </button>
                ))}
              </div>
              <div className="hm-feat-panel">
                <div className="hm-panel-ico">{features[activeFeat].icon}</div>
                <div className="hm-panel-h">{features[activeFeat].title}</div>
                <p className="hm-panel-p">{features[activeFeat].desc}</p>
                <div className="hm-chips">
                  {features[activeFeat].chips.map(c => <span className="hm-chip" key={c}>{c}</span>)}
                  <span className="hm-chip">HIPAA Compliant</span>
                  <span className="hm-chip">Cloud-based</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DEPARTMENTS ═════════════════════════════════════════════ */}
        <section className="hm-sec" id="departments">
          <div className="hm-wrap">
            <div className="hm-hrow">
              <div>
                <span className="hm-tag">Departments</span>
                <h2 className="hm-h2">12 Specialised Departments</h2>
              </div>
              <p className="hm-desc">Seamless data flow between all departments eliminates silos and improves coordination.</p>
            </div>
            <div className="hm-dept-grid">
              {departments.map(d => (
                <a href="/departments" className="hm-dept-card" key={d.name}>
                  <div className="hm-dept-ico">{d.icon}</div>
                  <div>
                    <div className="hm-dept-name">{d.name}</div>
                    <div className="hm-dept-docs">{d.docs} doctors</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DOCTORS ═════════════════════════════════════════════════ */}
        <section className="hm-sec" style={{ background: "var(--l)" }} id="doctors">
          <div className="hm-wrap">
            <div className="hm-hrow">
              <div>
                <span className="hm-tag">Our Team</span>
                <h2 className="hm-h2">Meet Our Specialists</h2>
              </div>
              <a href="/doctor" className="hm-btn-outline">View All Doctors →</a>
            </div>
            <div className="hm-docs-grid">
              {doctors.map((doc,i) => (
                <div className="hm-doc-card" key={i}>
                  <div className="hm-doc-head">
                    <div className="hm-doc-av">{doc.initials}</div>
                    <div>
                      <div className="hm-doc-name">{doc.name}</div>
                      <div className="hm-doc-badge">{doc.dept}</div>
                    </div>
                  </div>
                  <div className="hm-doc-body">
                    <div className="hm-doc-stats">
                      <div className="hm-doc-s"><div className="hm-doc-sv">{doc.exp}</div><div className="hm-doc-sl">Experience</div></div>
                      <div className="hm-doc-s"><div className="hm-doc-sv">{doc.rating}</div><div className="hm-doc-sl">Rating</div></div>
                      <div className="hm-doc-s"><div className="hm-doc-sv">{doc.patients}</div><div className="hm-doc-sl">Patients</div></div>
                    </div>
                    <div className="hm-doc-div" />
                    <div className="hm-doc-row">
                      <span className="hm-stars">★★★★★</span>
                      <span className="hm-rtxt">{doc.rating} / 5</span>
                    </div>
                    <button className="hm-book-btn">Book Appointment</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ════════════════════════════════════════════════════ */}
        <section className="hm-stats-sec">
          <div className="hm-wrap">
            <div className="hm-stats-grid">
              <Stat number="150"   suffix="+" label="Specialist Doctors"  icon="👨‍⚕️" />
              <Stat number="25000" suffix="+" label="Happy Patients"       icon="😊" />
              <Stat number="12"    suffix="+" label="Departments"          icon="🏥" />
              <Stat number="99"    suffix="%" label="Uptime SLA"           icon="⚡" />
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════════════════ */}
        <section className="hm-sec" id="about">
          <div className="hm-wrap">
            <div className="hm-hrow">
              <div>
                <span className="hm-tag">Testimonials</span>
                <h2 className="hm-h2">Trusted by patients<br />&amp; professionals alike</h2>
              </div>
            </div>
            <div className="hm-testi-grid">
              {testimonials.map((t,i) => (
                <div className="hm-testi-card" key={i}>
                  <p className="hm-testi-txt">{t.text}</p>
                  <div className="hm-testi-auth">
                    <div className="hm-testi-av">{t.name[0]}</div>
                    <div>
                      <div className="hm-testi-name">{t.name}</div>
                      <div className="hm-testi-role">{t.role}</div>
                      <div className="hm-testi-stars">★★★★★</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════ */}
        <section className="hm-cta">
          <div className="hm-cta-inner">
            <h2 className="hm-cta-h2">Ready to modernise your hospital?</h2>
            <p className="hm-cta-p">Join 2,500+ hospitals already using MediCare to deliver better care, faster.</p>
            <div className="hm-cta-acts">
              {!user ? (
                <>
                  <Link to="/register" className="hm-btn-ghost">Start for Free →</Link>
                  <a href="#services"  style={{ background:"rgba(250,246,242,0.15)", color:"white", padding:"0.9rem 2rem", borderRadius:"12px", fontWeight:800, fontSize:"1rem", textDecoration:"none", border:"2px solid rgba(250,246,242,0.25)", backdropFilter:"blur(8px)", display:"inline-flex", alignItems:"center" }}>Explore Features</a>
                </>
              ) : (
                <Link to="/dashboard" className="hm-btn-ghost">Go to Dashboard →</Link>
              )}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════ */}
        <footer className="hm-footer" id="contact">
          <div className="hm-wrap">
            <div className="hm-ft-grid">
              <div>
                <div className="hm-ft-brand">Medi<span>Care</span></div>
                <p className="hm-ft-desc">The complete hospital management platform for modern healthcare providers. HIPAA compliant, cloud-native, and built for scale.</p>
              </div>
              <div>
                <div className="hm-ft-col-t">Platform</div>
                <ul className="hm-ft-links">
                  {["Appointments","Patient Records","Pharmacy","Lab Reports","Billing"].map(l => <li key={l}><a href="/">{l}</a></li>)}
                </ul>
              </div>
              <div>
                <div className="hm-ft-col-t">Hospital</div>
                <ul className="hm-ft-links">
                  {["Departments","Doctors","Emergency","OPD","IPD"].map(l => <li key={l}><a href="/">{l}</a></li>)}
                </ul>
              </div>
              <div>
                <div className="hm-ft-col-t">Company</div>
                <ul className="hm-ft-links">
                  {["About Us","Careers","Blog","Contact","Support"].map(l => <li key={l}><a href="/">{l}</a></li>)}
                </ul>
              </div>
            </div>
            <div className="hm-ft-bottom">
              <div className="hm-ft-copy">© 2025 MediCare. All rights reserved.</div>
              <div className="hm-ft-badges">
                <span className="hm-ft-badge">HIPAA</span>
                <span className="hm-ft-badge">ISO 27001</span>
                <span className="hm-ft-badge">NABH Ready</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;