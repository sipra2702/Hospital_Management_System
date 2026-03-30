import React, { useRef, useState, useEffect } from 'react';
import {
  FaHeartbeat, FaUserMd, FaHospital, FaAward,
  FaUsers, FaAmbulance, FaClock, FaPhone, FaMapMarkerAlt, FaCheckCircle
} from 'react-icons/fa';

/* ─── In-View Hook ─────────────────────────────────────── */
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

/* ─── Animated Counter ─────────────────────────────────── */
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseFloat(String(target).replace(/[^0-9.]/g, ''));
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

const StatCard = ({ icon, value, label }) => {
  const [ref, inView] = useInView();
  const suffix = value.replace(/[0-9.]/g, '');
  const count  = useCounter(value, 1600, inView);
  return (
    <div ref={ref} className="ab-stat-card">
      <div className="ab-stat-ico">{icon}</div>
      <div className="ab-stat-num">{inView ? count : 0}{suffix}</div>
      <div className="ab-stat-lbl">{label}</div>
    </div>
  );
};

const About = () => {
  const stats = [
    { icon: <FaUserMd />,    value: '200+', label: 'Expert Doctors'      },
    { icon: <FaHospital />,  value: '50+',  label: 'Departments'         },
    { icon: <FaUsers />,     value: '500+', label: 'Medical Staff'       },
    { icon: <FaAmbulance />, value: '24+',  label: 'Emergency Units'     },
    { icon: <FaAward />,     value: '25+',  label: 'Years Experience'    },
    { icon: <FaHeartbeat />, value: '5000+',label: 'Happy Patients'      },
  ];

  const values = [
    { icon: '❤️', title: 'Patient-Centered Care',   desc: 'We put our patients at the heart of everything we do, ensuring their comfort, dignity, and well-being at every step.' },
    { icon: '🏅', title: 'Medical Excellence',      desc: 'Our specialists deliver world-class treatment using the most advanced technology and evidence-based protocols.' },
    { icon: '🤝', title: 'Compassion & Empathy',    desc: 'We treat every patient with kindness, respect, and deep understanding throughout their healing journey.' },
    { icon: '🔬', title: 'Innovation & Research',   desc: 'We continuously advance medical science through cutting-edge research and bold, innovative treatments.' },
  ];

  const team = [
    { name: 'Dr. Debasis Rout',    role: 'Chief Medical Officer',      exp: '10+ yrs', spec: 'Cardiology',        initials: 'DR' },
    { name: 'Dr. Sipra Mohapatra', role: 'Head of Surgery',            exp: '5+ yrs',  spec: 'Neurosurgery',      initials: 'SM' },
    { name: 'Dr. Minakshi Sahoo',  role: 'Medical Director',           exp: '3+ yrs',  spec: 'Pediatrics',        initials: 'MS' },
    { name: 'Dr. Sonalisha Sahoo', role: 'Emergency Department Head',  exp: '2+ yrs',  spec: 'Emergency Medicine',initials: 'SS' },
  ];

  const facilities = [
    'State-of-the-art Operation Theaters',
    'Advanced Diagnostic Imaging Center',
    '24/7 Cardiac Care Unit',
    'Neonatal Intensive Care Unit (NICU)',
    'Modern Rehabilitation Center',
    'Digital Patient Records System',
    'Telemedicine Services',
    'Robotic Surgery Systems',
  ];

  const accreditations = ['JCI Accredited', 'NABH Certified', 'ISO 9001:2015', 'Green Hospital Certified'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Nunito:wght@400;500;600;700;800&display=swap');

        :root {
          --p:  #683B2B;
          --p2: #7a4533;
          --s:  #B08401;
          --s2: #9a7301;
          --a:  #D49E8D;
          --l:  #FAF6F2;
          --n:  #DED1BD;
          --bl: #1A1008;
          --wh: #FFFFFF;
          --gr: #78716C;
          --sh: 0 4px 24px rgba(104,59,43,0.10);
          --sh2:0 16px 56px rgba(104,59,43,0.16);
        }

        .ab-root *, .ab-root *::before, .ab-root *::after { box-sizing: border-box; }
        .ab-root {
          font-family: 'Nunito', sans-serif;
          color: var(--bl); overflow-x: hidden;
          padding-top: 72px; background: var(--l);
        }

        /* ── SHARED ── */
        .ab-sec    { padding: 6rem 0; }
        .ab-wrap   { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .ab-tag    { display:inline-block; background:rgba(104,59,43,0.1); color:var(--p); font-size:0.74rem; font-weight:800; padding:0.34rem 0.9rem; border-radius:50px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.85rem; }
        .ab-h2     { font-family:'Playfair Display',serif; font-size:clamp(1.75rem,3vw,2.5rem); font-weight:800; color:var(--bl); line-height:1.2; margin-bottom:0.85rem; }
        .ab-p      { color:var(--gr); font-size:1rem; line-height:1.78; }
        .ab-center { text-align:center; }
        .ab-2col   { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }

        /* ── HERO ── */
        .ab-hero {
          background: linear-gradient(135deg, var(--p) 0%, #4a2518 55%, #3a1c10 100%);
          padding: 6rem 0; position: relative; overflow: hidden;
        }
        .ab-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(212,158,141,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.06) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .ab-hero-orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(212,158,141,0.14) 0%,transparent 70%); top:-100px; right:-80px; pointer-events:none; animation:ab-orb 7s ease-in-out infinite; }
        .ab-hero-orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(176,132,1,0.1) 0%,transparent 70%); bottom:-60px; left:-60px; pointer-events:none; animation:ab-orb 9s ease-in-out infinite reverse; }
        @keyframes ab-orb { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08); opacity:.75;} }
        .ab-hero-inner { position:relative; z-index:2; max-width:700px; margin:0 auto; text-align:center; padding:0 2rem; }
        .ab-hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(212,158,141,0.18); border:1px solid rgba(212,158,141,0.35); color:var(--a); padding:0.4rem 1rem; border-radius:50px; font-size:0.78rem; font-weight:800; margin-bottom:1.5rem; letter-spacing:0.07em; text-transform:uppercase; }
        .ab-badge-dot  { width:6px; height:6px; background:var(--a); border-radius:50%; animation:ab-blink 1.6s infinite; }
        @keyframes ab-blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        .ab-hero-h1    { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,5vw,3.8rem); font-weight:900; color:var(--wh); line-height:1.12; margin-bottom:1.25rem; }
        .ab-hero-accent{ color:var(--a); }
        .ab-hero-sub   { color:rgba(250,246,242,0.68); font-size:1.08rem; line-height:1.78; max-width:580px; margin:0 auto; font-weight:600; }

        /* ── MISSION ── */
        .ab-mission-txt .ab-h2 { margin-bottom:1.2rem; }
        .ab-mission-body { color:var(--gr); font-size:1rem; line-height:1.8; margin-bottom:1.75rem; }
        .ab-vision-box {
          background:rgba(104,59,43,0.06); border-left:4px solid var(--p);
          padding:1.5rem 1.75rem; border-radius:0 14px 14px 0;
        }
        .ab-vision-box h3 { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:800; color:var(--bl); margin-bottom:0.6rem; }
        .ab-vision-box p  { color:var(--gr); font-size:0.95rem; line-height:1.75; }
        .ab-mission-img   { border-radius:22px; box-shadow:var(--sh2); width:100%; aspect-ratio:4/3; object-fit:cover; }

        /* ── STATS ── */
        .ab-stats-sec { background:linear-gradient(135deg,var(--p) 0%,#3a1c10 100%); padding:5rem 0; position:relative; overflow:hidden; }
        .ab-stats-sec::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(212,158,141,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(212,158,141,0.07) 1px,transparent 1px); background-size:44px 44px; }
        .ab-stats-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1.5rem; position:relative; z-index:2; }
        .ab-stat-card  { text-align:center; padding:1.5rem 0.5rem; background:rgba(250,246,242,0.06); border:1px solid rgba(212,158,141,0.14); border-radius:16px; transition:all 0.25s; }
        .ab-stat-card:hover { background:rgba(250,246,242,0.1); transform:translateY(-3px); }
        .ab-stat-ico   { font-size:1.8rem; color:var(--a); margin-bottom:0.75rem; display:flex; justify-content:center; }
        .ab-stat-num   { font-family:'Playfair Display',serif; font-size:2rem; font-weight:900; color:var(--wh); margin-bottom:0.2rem; }
        .ab-stat-lbl   { color:rgba(250,246,242,0.55); font-size:0.8rem; font-weight:700; }

        /* ── VALUES ── */
        .ab-values-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
        .ab-val-card    { background:var(--wh); border:2px solid var(--n); border-radius:18px; padding:2rem 1.5rem; transition:all 0.25s; cursor:default; }
        .ab-val-card:hover { border-color:var(--p); box-shadow:var(--sh2); transform:translateY(-3px); }
        .ab-val-ico     { font-size:2rem; margin-bottom:1rem; }
        .ab-val-title   { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:800; color:var(--bl); margin-bottom:0.75rem; }
        .ab-val-desc    { color:var(--gr); font-size:0.9rem; line-height:1.75; }

        /* ── TEAM ── */
        .ab-team-grid   { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; }
        .ab-team-card   { background:var(--wh); border:2px solid var(--n); border-radius:22px; overflow:hidden; transition:all 0.3s; }
        .ab-team-card:hover { box-shadow:var(--sh2); transform:translateY(-4px); border-color:var(--a); }
        .ab-team-head   { background:linear-gradient(135deg,var(--p) 0%,#4a2518 100%); padding:2rem 1.5rem; display:flex; flex-direction:column; align-items:center; gap:0.85rem; }
        .ab-team-av     { width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,var(--a),var(--s)); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:800; color:white; border:3px solid rgba(250,246,242,0.22); }
        .ab-team-name   { font-family:'Playfair Display',serif; font-weight:700; font-size:0.95rem; color:var(--wh); text-align:center; }
        .ab-team-role   { background:rgba(212,158,141,0.2); border:1px solid rgba(212,158,141,0.4); color:var(--a); font-size:0.72rem; font-weight:800; padding:0.25rem 0.7rem; border-radius:50px; text-align:center; }
        .ab-team-body   { padding:1.3rem; }
        .ab-team-row    { display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.84rem; color:var(--gr); }
        .ab-team-row:last-child { margin-bottom:0; }
        .ab-team-row strong { color:var(--bl); font-weight:800; }
        .ab-team-dot    { width:7px; height:7px; border-radius:50%; background:var(--a); flex-shrink:0; }

        /* ── FACILITIES ── */
        .ab-fac-img  { border-radius:22px; box-shadow:var(--sh2); width:100%; aspect-ratio:4/3; object-fit:cover; }
        .ab-fac-list { display:flex; flex-direction:column; gap:0.85rem; }
        .ab-fac-item { display:flex; align-items:center; gap:0.85rem; padding:0.85rem 1rem; background:var(--wh); border:2px solid var(--n); border-radius:12px; transition:all 0.2s; }
        .ab-fac-item:hover { border-color:var(--p); background:#fdf5ee; }
        .ab-fac-ico  { color:var(--p); font-size:1rem; flex-shrink:0; }
        .ab-fac-txt  { font-size:0.9rem; font-weight:700; color:var(--bl); }

        /* ── CONTACT ── */
        .ab-contact-sec { background:linear-gradient(135deg,var(--s) 0%,#7a5801 50%,var(--p) 100%); padding:5rem 0; position:relative; overflow:hidden; }
        .ab-contact-sec::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23fff' fill-opacity='0.05'/%3E%3C/svg%3E"); }
        .ab-contact-inner { position:relative; z-index:2; }
        .ab-contact-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; margin-top:3rem; }
        .ab-contact-card { background:rgba(250,246,242,0.1); border:1px solid rgba(250,246,242,0.18); border-radius:18px; padding:2rem 1.5rem; text-align:center; backdrop-filter:blur(8px); transition:all 0.25s; }
        .ab-contact-card:hover { background:rgba(250,246,242,0.16); transform:translateY(-3px); }
        .ab-contact-ico  { font-size:2rem; color:var(--a); margin-bottom:1rem; display:flex; justify-content:center; }
        .ab-contact-title{ font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:800; color:var(--wh); margin-bottom:0.6rem; }
        .ab-contact-txt  { color:rgba(250,246,242,0.72); font-size:0.9rem; line-height:1.7; font-weight:600; }

        /* ── ACCREDITATION ── */
        .ab-accred-row { display:flex; flex-wrap:wrap; justify-content:center; gap:1rem; margin-top:2rem; }
        .ab-accred-badge { background:rgba(104,59,43,0.08); border:2px solid var(--n); color:var(--p); font-size:0.84rem; font-weight:800; padding:0.6rem 1.4rem; border-radius:50px; transition:all 0.2s; }
        .ab-accred-badge:hover { background:var(--p); color:var(--wh); border-color:var(--p); }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) {
          .ab-stats-grid  { grid-template-columns:repeat(3,1fr); }
          .ab-values-grid { grid-template-columns:repeat(2,1fr); }
          .ab-team-grid   { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .ab-sec         { padding:4rem 0; }
          .ab-2col        { grid-template-columns:1fr; gap:2.5rem; }
          .ab-stats-grid  { grid-template-columns:repeat(2,1fr); }
          .ab-values-grid { grid-template-columns:1fr; }
          .ab-team-grid   { grid-template-columns:1fr; }
          .ab-contact-grid{ grid-template-columns:1fr; }
        }
      `}</style>

      <div className="ab-root">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="ab-hero">
          <div className="ab-hero-orb1" /><div className="ab-hero-orb2" />
          <div className="ab-hero-inner">
            <div className="ab-hero-badge"><span className="ab-badge-dot" />Since 1998</div>
            <h1 className="ab-hero-h1">
              About <span className="ab-hero-accent">MediCare</span><br />Hospital
            </h1>
            <p className="ab-hero-sub">
              Delivering exceptional healthcare with compassion, innovation, and excellence
              for over 25 years — serving thousands of patients across the region.
            </p>
          </div>
        </section>

        {/* ══ MISSION & VISION ══════════════════════════════ */}
        <section className="ab-sec" style={{ background: 'var(--wh)' }}>
          <div className="ab-wrap">
            <div className="ab-2col">
              <div className="ab-mission-txt">
                <span className="ab-tag">Who We Are</span>
                <h2 className="ab-h2">Our Mission</h2>
                <p className="ab-mission-body">
                  To provide comprehensive, high-quality healthcare services to all patients
                  with dignity, compassion, and respect. We are committed to improving the
                  health and well-being of our community through excellence in clinical care,
                  education, and research.
                </p>
                <div className="ab-vision-box">
                  <h3>Our Vision</h3>
                  <p>
                    To be the leading healthcare institution recognised for clinical excellence,
                    innovative research, and an exceptional patient experience that sets the
                    standard for modern medicine.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                  alt="Modern Hospital Facility"
                  className="ab-mission-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════ */}
        <section className="ab-stats-sec">
          <div className="ab-wrap">
            <div className="ab-center" style={{ marginBottom: '3rem' }}>
              <span className="ab-tag" style={{ background:'rgba(212,158,141,0.18)', color:'var(--a)' }}>By The Numbers</span>
              <h2 className="ab-h2" style={{ color:'var(--wh)' }}>Our Achievements</h2>
            </div>
            <div className="ab-stats-grid">
              {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>
          </div>
        </section>

        {/* ══ CORE VALUES ════════════════════════════════════ */}
        <section className="ab-sec" style={{ background: 'var(--l)' }}>
          <div className="ab-wrap">
            <div className="ab-center" style={{ marginBottom: '3.5rem' }}>
              <span className="ab-tag">What Drives Us</span>
              <h2 className="ab-h2">Our Core Values</h2>
              <p className="ab-p" style={{ maxWidth:'520px', margin:'0 auto' }}>
                These principles guide every decision we make and every interaction we have with our patients.
              </p>
            </div>
            <div className="ab-values-grid">
              {values.map((v, i) => (
                <div className="ab-val-card" key={i}>
                  <div className="ab-val-ico">{v.icon}</div>
                  <div className="ab-val-title">{v.title}</div>
                  <p className="ab-val-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LEADERSHIP TEAM ════════════════════════════════ */}
        <section className="ab-sec" style={{ background: 'var(--wh)' }}>
          <div className="ab-wrap">
            <div className="ab-center" style={{ marginBottom: '3.5rem' }}>
              <span className="ab-tag">Leadership</span>
              <h2 className="ab-h2">Meet Our Team</h2>
              <p className="ab-p" style={{ maxWidth:'500px', margin:'0 auto' }}>
                Our experienced leaders bring decades of clinical expertise and a shared commitment to excellence.
              </p>
            </div>
            <div className="ab-team-grid">
              {team.map((m, i) => (
                <div className="ab-team-card" key={i}>
                  <div className="ab-team-head">
                    <div className="ab-team-av">{m.initials}</div>
                    <div className="ab-team-name">{m.name}</div>
                    <div className="ab-team-role">{m.role}</div>
                  </div>
                  <div className="ab-team-body">
                    <div className="ab-team-row"><span className="ab-team-dot" /><span><strong>Specialty:</strong> {m.spec}</span></div>
                    <div className="ab-team-row"><span className="ab-team-dot" /><span><strong>Experience:</strong> {m.exp}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FACILITIES ═════════════════════════════════════ */}
        <section className="ab-sec" style={{ background: 'var(--l)' }}>
          <div className="ab-wrap">
            <div className="ab-2col">
              <div>
                <span className="ab-tag">Infrastructure</span>
                <h2 className="ab-h2">Advanced Facilities &amp; Technology</h2>
                <p className="ab-p" style={{ marginBottom:'1.75rem' }}>
                  Our hospital is equipped with world-class infrastructure to support the full spectrum of modern medical care.
                </p>
                <div className="ab-fac-list">
                  {facilities.map((f, i) => (
                    <div className="ab-fac-item" key={i}>
                      <FaCheckCircle className="ab-fac-ico" />
                      <span className="ab-fac-txt">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1586773860418-dc22f8b874bc?w=800&q=80"
                  alt="Hospital Technology"
                  className="ab-fac-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ════════════════════════════════════════ */}
        <section className="ab-contact-sec">
          <div className="ab-wrap ab-contact-inner">
            <div className="ab-center">
              <span className="ab-tag" style={{ background:'rgba(212,158,141,0.18)', color:'var(--a)' }}>Reach Us</span>
              <h2 className="ab-h2" style={{ color:'var(--wh)' }}>Contact Information</h2>
            </div>
            <div className="ab-contact-grid">
              <div className="ab-contact-card">
                <div className="ab-contact-ico"><FaMapMarkerAlt /></div>
                <div className="ab-contact-title">Address</div>
                <p className="ab-contact-txt">123 Medical Centre Drive<br />Health City, HC 12345</p>
              </div>
              <div className="ab-contact-card">
                <div className="ab-contact-ico"><FaPhone /></div>
                <div className="ab-contact-title">Phone</div>
                <p className="ab-contact-txt">Emergency: (123) 456-7890<br />General: (123) 456-7891</p>
              </div>
              <div className="ab-contact-card">
                <div className="ab-contact-ico"><FaClock /></div>
                <div className="ab-contact-title">Hours</div>
                <p className="ab-contact-txt">24/7 Emergency Services<br />OPD: 8:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ ACCREDITATION ══════════════════════════════════ */}
        <section className="ab-sec" style={{ background:'var(--wh)', paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div className="ab-wrap ab-center">
            <span className="ab-tag">Certifications</span>
            <h2 className="ab-h2">Accreditations &amp; Certifications</h2>
            <div className="ab-accred-row">
              {accreditations.map((a, i) => (
                <div className="ab-accred-badge" key={i}>{a}</div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;