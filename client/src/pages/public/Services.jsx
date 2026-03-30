import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";

/* ─── In-View Hook ─────────────────────────────────────── */
const useInView = (threshold = 0.18) => {
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

const AnimStat = ({ number, label }) => {
  const [ref, inView] = useInView();
  const suffix = number.replace(/[0-9.,]/g, '');
  const count  = useCounter(number, 1600, inView);
  return (
    <div ref={ref} className="sv-stat">
      <div className="sv-stat-num">{inView ? count.toLocaleString() : 0}{suffix}</div>
      <div className="sv-stat-lbl">{label}</div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const facilities = [
    { title: "24/7 Emergency Services",      desc: "Rapid-response emergency care backed by trained medical professionals around the clock.",         icon: "🚨" },
    { title: "State-of-the-Art ICU",          desc: "Fully equipped intensive care units with modern monitoring and life-support systems.",            icon: "🏥" },
    { title: "Advanced Diagnostic Lab",       desc: "Comprehensive pathology and radiology services delivering precision results fast.",                icon: "🔬" },
    { title: "Modern Operation Theatres",     desc: "High-tech surgical suites ensuring safe, efficient, and minimally invasive procedures.",          icon: "⚕️" },
  ];

  const stats = [
    { number: "50+",    label: "Specialist Doctors"        },
    { number: "10000+", label: "Patients Treated Annually" },
    { number: "20+",    label: "Departments"               },
    { number: "15+",    label: "Years of Service"          },
  ];

  /* fallback cards when API is loading or empty */
  const fallbackServices = [
    { _id:'1', icon:'FaHeartbeat',   title:'Cardiology',        description:'Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.',           slug:'cardiology'       },
    { _id:'2', icon:'FaBrain',       title:'Neurology',         description:'Expert diagnosis and treatment of neurological conditions from migraines to complex brain disorders.',             slug:'neurology'        },
    { _id:'3', icon:'FaBone',        title:'Orthopedics',       description:'Surgical and non-surgical care for musculoskeletal conditions, sports injuries, and joint replacements.',          slug:'orthopedics'      },
    { _id:'4', icon:'FaBaby',        title:'Pediatrics',        description:'Specialised care for infants, children, and adolescents across all medical conditions.',                            slug:'pediatrics'       },
    { _id:'5', icon:'FaEye',         title:'Ophthalmology',     description:'Complete eye care services from routine check-ups to advanced surgical procedures.',                               slug:'ophthalmology'    },
    { _id:'6', icon:'FaLungs',       title:'Pulmonology',       description:'Diagnosis and treatment of respiratory diseases including asthma, COPD, and lung infections.',                     slug:'pulmonology'      },
  ];

  const displayServices = services.length > 0 ? services : (loading ? [] : fallbackServices);

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

        .sv-root *, .sv-root *::before, .sv-root *::after { box-sizing: border-box; }
        .sv-root {
          font-family: 'Nunito', sans-serif; color: var(--bl);
          overflow-x: hidden; padding-top: 72px; background: var(--l);
        }

        /* ── SHARED ── */
        .sv-sec  { padding: 6rem 0; }
        .sv-wrap { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .sv-tag  { display:inline-block; background:rgba(104,59,43,0.1); color:var(--p); font-size:0.74rem; font-weight:800; padding:0.34rem 0.9rem; border-radius:50px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.85rem; }
        .sv-h2   { font-family:'Playfair Display',serif; font-size:clamp(1.75rem,3vw,2.5rem); font-weight:800; color:var(--bl); line-height:1.2; margin-bottom:0.85rem; }
        .sv-p    { color:var(--gr); font-size:1rem; line-height:1.78; }
        .sv-ctr  { text-align:center; }

        /* ── HERO ── */
        .sv-hero {
          background: linear-gradient(135deg, var(--p) 0%, #4a2518 55%, #3a1c10 100%);
          padding: 6rem 0; position: relative; overflow: hidden;
        }
        .sv-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(212,158,141,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.06) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .sv-hero-orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(212,158,141,0.14) 0%,transparent 70%); top:-100px; right:-80px; pointer-events:none; animation:sv-orb 7s ease-in-out infinite; }
        .sv-hero-orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(176,132,1,0.10) 0%,transparent 70%); bottom:-60px; left:-60px; pointer-events:none; animation:sv-orb 9s ease-in-out infinite reverse; }
        @keyframes sv-orb { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);opacity:.75;} }
        .sv-hero-inner { position:relative; z-index:2; max-width:720px; margin:0 auto; text-align:center; padding:0 2rem; }
        .sv-hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(212,158,141,0.18); border:1px solid rgba(212,158,141,0.35); color:var(--a); padding:0.4rem 1rem; border-radius:50px; font-size:0.78rem; font-weight:800; margin-bottom:1.5rem; letter-spacing:0.07em; text-transform:uppercase; }
        .sv-badge-dot  { width:6px; height:6px; background:var(--a); border-radius:50%; animation:sv-blink 1.6s infinite; }
        @keyframes sv-blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        .sv-hero-h1    { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,5vw,3.8rem); font-weight:900; color:var(--wh); line-height:1.12; margin-bottom:1.25rem; }
        .sv-hero-accent{ color:var(--a); }
        .sv-hero-sub   { color:rgba(250,246,242,0.68); font-size:1.08rem; line-height:1.78; font-weight:600; max-width:600px; margin:0 auto; }

        /* ── INTRO STRIP ── */
        .sv-intro { background:var(--wh); }
        .sv-intro-box { max-width:820px; margin:0 auto; text-align:center; }
        .sv-intro-box .sv-h2 { margin-bottom:1rem; }

        /* ── SERVICES GRID ── */
        .sv-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .sv-card {
          background:var(--wh); border:2px solid var(--n); border-radius:20px;
          padding:2rem 1.75rem; transition:all 0.3s; cursor:default;
          display:flex; flex-direction:column;
        }
        .sv-card:hover { border-color:var(--p); box-shadow:var(--sh2); transform:translateY(-4px); }
        .sv-card:hover .sv-card-ico  { background:var(--p); color:var(--wh); }
        .sv-card:hover .sv-card-link { color:var(--p); }
        .sv-card-ico   { width:52px; height:52px; border-radius:14px; background:rgba(104,59,43,0.09); display:flex; align-items:center; justify-content:center; font-size:1.4rem; color:var(--p); margin-bottom:1.2rem; transition:all 0.2s; flex-shrink:0; }
        .sv-card-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:800; color:var(--bl); margin-bottom:0.7rem; }
        .sv-card-desc  { color:var(--gr); font-size:0.9rem; line-height:1.75; flex:1; margin-bottom:1.4rem; }
        .sv-card-link  { font-size:0.86rem; font-weight:800; color:var(--gr); text-decoration:none; transition:color 0.2s; display:inline-flex; align-items:center; gap:0.3rem; }
        .sv-card-link:hover { color:var(--p); }

        /* loading skeleton */
        .sv-skeleton { background:linear-gradient(90deg, var(--n) 25%, rgba(222,209,189,0.5) 50%, var(--n) 75%); background-size:200% 100%; animation:sv-shimmer 1.4s infinite; border-radius:10px; }
        @keyframes sv-shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }

        /* ── FACILITIES ── */
        .sv-fac-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; }
        .sv-fac-card {
          background:var(--wh); border:2px solid var(--n); border-radius:18px;
          padding:1.75rem 1.25rem; transition:all 0.25s;
        }
        .sv-fac-card:hover { border-color:var(--p); box-shadow:var(--sh); transform:translateY(-3px); }
        .sv-fac-ico   { font-size:2rem; margin-bottom:1rem; }
        .sv-fac-title { font-family:'Playfair Display',serif; font-size:0.98rem; font-weight:800; color:var(--bl); margin-bottom:0.6rem; }
        .sv-fac-desc  { color:var(--gr); font-size:0.84rem; line-height:1.7; }

        /* ── STATS ── */
        .sv-stats-sec {
          background:linear-gradient(135deg,var(--p) 0%,#3a1c10 100%);
          padding:5rem 0; position:relative; overflow:hidden;
        }
        .sv-stats-sec::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(212,158,141,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(212,158,141,0.07) 1px,transparent 1px); background-size:44px 44px; }
        .sv-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; position:relative; z-index:2; }
        .sv-stat       { text-align:center; padding:2rem 1rem; background:rgba(250,246,242,0.06); border:1px solid rgba(212,158,141,0.14); border-radius:18px; transition:all 0.25s; }
        .sv-stat:hover { background:rgba(250,246,242,0.1); transform:translateY(-3px); }
        .sv-stat-num   { font-family:'Playfair Display',serif; font-size:clamp(2rem,4vw,2.8rem); font-weight:900; color:var(--wh); margin-bottom:0.3rem; }
        .sv-stat-lbl   { color:rgba(250,246,242,0.55); font-size:0.86rem; font-weight:700; }

        /* ── CTA ── */
        .sv-cta {
          background:linear-gradient(135deg,var(--s) 0%,#7a5801 50%,var(--p) 100%);
          padding:5.5rem 0; text-align:center; position:relative; overflow:hidden;
        }
        .sv-cta::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23fff' fill-opacity='0.06'/%3E%3C/svg%3E"); }
        .sv-cta-inner  { position:relative; z-index:2; padding:0 2rem; }
        .sv-cta-h2     { font-family:'Playfair Display',serif; font-size:clamp(1.9rem,4vw,2.9rem); font-weight:900; color:var(--wh); margin-bottom:0.85rem; }
        .sv-cta-p      { color:rgba(250,246,242,0.78); font-size:1.05rem; margin-bottom:2.4rem; font-weight:600; }
        .sv-cta-btn {
          display:inline-flex; align-items:center; gap:0.4rem;
          background:var(--wh); color:var(--p); padding:0.9rem 2.2rem; border-radius:12px;
          font-weight:800; font-size:1rem; text-decoration:none;
          transition:all 0.25s; font-family:'Nunito',sans-serif;
          box-shadow:0 6px 20px rgba(0,0,0,0.18);
        }
        .sv-cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(0,0,0,0.25); }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) {
          .sv-cards-grid { grid-template-columns:repeat(2,1fr); }
          .sv-fac-grid   { grid-template-columns:repeat(2,1fr); }
          .sv-stats-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .sv-sec        { padding:4rem 0; }
          .sv-cards-grid { grid-template-columns:1fr; }
          .sv-fac-grid   { grid-template-columns:1fr; }
          .sv-stats-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      <div className="sv-root">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="sv-hero">
          <div className="sv-hero-orb1" /><div className="sv-hero-orb2" />
          <div className="sv-hero-inner">
            <div className="sv-hero-badge"><span className="sv-badge-dot" />Comprehensive Care</div>
            <h1 className="sv-hero-h1">
              Our Medical<br /><span className="sv-hero-accent">Services</span>
            </h1>
            <p className="sv-hero-sub">
              Advanced medical infrastructure, highly qualified specialists, and compassionate
              patient care — all delivered under one roof across every major specialty.
            </p>
          </div>
        </section>

        {/* ══ INTRO ═════════════════════════════════════════ */}
        <section className="sv-sec sv-intro">
          <div className="sv-wrap">
            <div className="sv-intro-box">
              <span className="sv-tag">What We Offer</span>
              <h2 className="sv-h2">Comprehensive Medical Care</h2>
              <p className="sv-p">
                We provide a wide range of preventive, diagnostic, therapeutic, and rehabilitative
                services under one roof. Our multidisciplinary approach ensures patients receive
                coordinated, personalised treatment plans tailored precisely to their medical needs.
              </p>
            </div>
          </div>
        </section>

        {/* ══ DEPARTMENTS GRID ═══════════════════════════════ */}
        <section className="sv-sec" style={{ background:'var(--l)' }}>
          <div className="sv-wrap">
            <div className="sv-ctr" style={{ marginBottom:'3.5rem' }}>
              <span className="sv-tag">Specialties</span>
              <h2 className="sv-h2">Our Specialised Departments</h2>
              <p className="sv-p" style={{ maxWidth:'540px', margin:'0 auto' }}>
                Each department is led by dedicated specialists supported by experienced nursing and support staff.
              </p>
            </div>

            {loading ? (
              /* Loading skeleton */
              <div className="sv-cards-grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ background:'var(--wh)', border:'2px solid var(--n)', borderRadius:'20px', padding:'2rem' }}>
                    <div className="sv-skeleton" style={{ width:'52px', height:'52px', borderRadius:'14px', marginBottom:'1.2rem' }} />
                    <div className="sv-skeleton" style={{ height:'1.1rem', width:'60%', borderRadius:'6px', marginBottom:'0.7rem' }} />
                    <div className="sv-skeleton" style={{ height:'0.85rem', width:'100%', borderRadius:'6px', marginBottom:'0.4rem' }} />
                    <div className="sv-skeleton" style={{ height:'0.85rem', width:'80%', borderRadius:'6px' }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="sv-cards-grid">
                {displayServices.map((service) => {
                  const IconComponent = Icons[service.icon] || Icons.FaHospital;
                  return (
                    <div key={service._id} className="sv-card">
                      <div className="sv-card-ico">
                        <IconComponent />
                      </div>
                      <div className="sv-card-title">{service.title}</div>
                      <p className="sv-card-desc">{service.description}</p>
                      <Link to={`/departments/${service.slug}`} className="sv-card-link">
                        View Department →
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══ FACILITIES ════════════════════════════════════ */}
        <section className="sv-sec" style={{ background:'var(--wh)' }}>
          <div className="sv-wrap">
            <div className="sv-ctr" style={{ marginBottom:'3.5rem' }}>
              <span className="sv-tag">Infrastructure</span>
              <h2 className="sv-h2">Advanced Facilities &amp; Infrastructure</h2>
              <p className="sv-p" style={{ maxWidth:'520px', margin:'0 auto' }}>
                Our hospital is equipped with cutting-edge technology to support every aspect of modern medical care.
              </p>
            </div>
            <div className="sv-fac-grid">
              {facilities.map((f, i) => (
                <div className="sv-fac-card" key={i}>
                  <div className="sv-fac-ico">{f.icon}</div>
                  <div className="sv-fac-title">{f.title}</div>
                  <p className="sv-fac-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ═════════════════════════════════════════ */}
        <section className="sv-stats-sec">
          <div className="sv-wrap">
            <div className="sv-ctr" style={{ marginBottom:'3rem' }}>
              <span className="sv-tag" style={{ background:'rgba(212,158,141,0.18)', color:'var(--a)' }}>Excellence</span>
              <h2 className="sv-h2" style={{ color:'var(--wh)' }}>Excellence in Healthcare</h2>
            </div>
            <div className="sv-stats-grid">
              {stats.map((s, i) => <AnimStat key={i} {...s} />)}
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════ */}
        <section className="sv-cta">
          <div className="sv-cta-inner">
            <h2 className="sv-cta-h2">Schedule Your Consultation Today</h2>
            <p className="sv-cta-p">Our medical experts are ready to provide you with the highest standard of care.</p>
            <Link to="/my-appointments" className="sv-cta-btn">Book Appointment →</Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default Services;