import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaAmbulance, FaUserMd, FaHospital, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const emergencyContacts = [
    { icon: <FaAmbulance />, title: "Emergency Ambulance",  number: "103",            available: "24/7"             },
    { icon: <FaUserMd />,    title: "Emergency Doctor",     number: "112",            available: "24/7"             },
    { icon: <FaHospital />,  title: "Hospital Reception",   number: "(123) 456-7890", available: "Mon–Sun, 6AM–10PM" },
  ];

  const contactInfo = [
    { icon: <FaPhone />,         title: "Phone Number",  lines: ["(123) 456-7890", "(098) 765-4321"]                        },
    { icon: <FaEnvelope />,      title: "Email Address", lines: ["info@medicare.in", "support@medicare.in"]                  },
    { icon: <FaMapMarkerAlt />,  title: "Our Location",  lines: ["123 Medical Center Drive", "Healthcare City, HC 12345"]    },
    { icon: <FaClock />,         title: "Working Hours", lines: ["Mon – Fri: 8:00 AM – 8:00 PM", "Sat – Sun: 9:00 AM – 5:00 PM"] },
  ];

  const otherWays = [
    { icon: <FaHospital />,  title: "Patient Portal",      desc: "Access your medical records, test results, and schedule appointments online.",         link: "/dashboard",    cta: "Visit Patient Portal →"  },
    { icon: <FaUserMd />,    title: "Virtual Consultation", desc: "Schedule a virtual appointment with our specialists from the comfort of your home.",   link: "/appointments", cta: "Book Virtual Visit →"    },
    { icon: <FaPhone />,     title: "24/7 Helpline",        desc: "Our helpline is available round the clock for any medical emergencies or queries.",    link: null,            cta: "1800-MED-HELP"           },
  ];

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

        .ct-root *, .ct-root *::before, .ct-root *::after { box-sizing: border-box; }
        .ct-root {
          font-family: 'Nunito', sans-serif;
          color: var(--bl); overflow-x: hidden;
          padding-top: 72px; background: var(--l);
        }

        /* ── SHARED ── */
        .ct-sec  { padding: 6rem 0; }
        .ct-wrap { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
        .ct-tag  { display:inline-block; background:rgba(104,59,43,0.1); color:var(--p); font-size:0.74rem; font-weight:800; padding:0.34rem 0.9rem; border-radius:50px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.85rem; }
        .ct-h2   { font-family:'Playfair Display',serif; font-size:clamp(1.75rem,3vw,2.5rem); font-weight:800; color:var(--bl); line-height:1.2; margin-bottom:0.85rem; }
        .ct-p    { color:var(--gr); font-size:1rem; line-height:1.78; }
        .ct-center { text-align: center; }

        /* ── HERO ── */
        .ct-hero {
          background: linear-gradient(135deg, var(--p) 0%, #4a2518 55%, #3a1c10 100%);
          padding: 6rem 0; position: relative; overflow: hidden;
        }
        .ct-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(212,158,141,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,158,141,0.06) 1px, transparent 1px);
          background-size: 55px 55px;
        }
        .ct-hero-orb1 { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(212,158,141,0.14) 0%,transparent 70%); top:-100px; right:-80px; pointer-events:none; animation:ct-orb 7s ease-in-out infinite; }
        .ct-hero-orb2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle,rgba(176,132,1,0.1) 0%,transparent 70%); bottom:-60px; left:-60px; pointer-events:none; animation:ct-orb 9s ease-in-out infinite reverse; }
        @keyframes ct-orb { 0%,100%{transform:scale(1);} 50%{transform:scale(1.08);opacity:.75;} }
        .ct-hero-inner { position:relative; z-index:2; max-width:700px; margin:0 auto; text-align:center; padding:0 2rem; }
        .ct-hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(212,158,141,0.18); border:1px solid rgba(212,158,141,0.35); color:var(--a); padding:0.4rem 1rem; border-radius:50px; font-size:0.78rem; font-weight:800; margin-bottom:1.5rem; letter-spacing:0.07em; text-transform:uppercase; }
        .ct-badge-dot  { width:6px; height:6px; background:var(--a); border-radius:50%; animation:ct-blink 1.6s infinite; }
        @keyframes ct-blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        .ct-hero-h1    { font-family:'Playfair Display',serif; font-size:clamp(2.4rem,5vw,3.8rem); font-weight:900; color:var(--wh); line-height:1.12; margin-bottom:1.25rem; }
        .ct-hero-accent{ color:var(--a); }
        .ct-hero-sub   { color:rgba(250,246,242,0.68); font-size:1.08rem; line-height:1.78; max-width:580px; margin:0 auto; font-weight:600; }

        /* ── EMERGENCY STRIP ── */
        .ct-em-sec { background:linear-gradient(135deg,var(--p) 0%,#3a1c10 100%); padding:3.5rem 0; position:relative; overflow:hidden; }
        .ct-em-sec::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(212,158,141,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(212,158,141,0.07) 1px,transparent 1px); background-size:44px 44px; }
        .ct-em-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; position:relative; z-index:2; }
        .ct-em-card { background:rgba(250,246,242,0.06); border:1px solid rgba(212,158,141,0.18); border-radius:18px; padding:1.5rem; display:flex; align-items:center; gap:1rem; transition:all 0.25s; }
        .ct-em-card:hover { background:rgba(250,246,242,0.1); transform:translateY(-3px); }
        .ct-em-ico  { width:50px; height:50px; border-radius:14px; background:rgba(212,158,141,0.15); display:flex; align-items:center; justify-content:center; font-size:1.3rem; color:var(--a); flex-shrink:0; }
        .ct-em-t    { font-size:0.76rem; color:rgba(250,246,242,0.5); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; }
        .ct-em-num  { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:800; color:var(--wh); margin:0.2rem 0; }
        .ct-em-av   { font-size:0.74rem; color:var(--a); font-weight:700; }

        /* ── MAIN SECTION ── */
        .ct-main-grid { display:grid; grid-template-columns:360px 1fr; gap:2rem; align-items:start; }

        /* ── INFO CARD ── */
        .ct-info-card { background:var(--wh); border:2px solid var(--n); border-radius:22px; overflow:hidden; position:sticky; top:88px; }
        .ct-info-head { background:linear-gradient(135deg,var(--p) 0%,#4a2518 100%); padding:1.75rem; }
        .ct-info-head-t { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:800; color:var(--wh); margin-bottom:0.3rem; }
        .ct-info-head-s { font-size:0.78rem; color:rgba(250,246,242,0.6); font-weight:600; }
        .ct-info-body { padding:1.5rem; display:flex; flex-direction:column; gap:1rem; }
        .ct-info-item { display:flex; align-items:flex-start; gap:0.9rem; padding:1rem; border-radius:12px; background:var(--l); border:1.5px solid var(--n); transition:all 0.2s; }
        .ct-info-item:hover { border-color:var(--p); background:#fdf5ee; }
        .ct-info-ico  { width:40px; height:40px; border-radius:10px; background:rgba(104,59,43,0.1); display:flex; align-items:center; justify-content:center; font-size:0.95rem; color:var(--p); flex-shrink:0; }
        .ct-info-t    { font-weight:800; font-size:0.84rem; color:var(--bl); margin-bottom:0.3rem; }
        .ct-info-l    { font-size:0.78rem; color:var(--gr); font-weight:600; line-height:1.65; }

        /* ── RIGHT COLUMN ── */
        .ct-right { display:flex; flex-direction:column; gap:1.5rem; }

        /* ── FORM CARD ── */
        .ct-form-card { background:var(--wh); border:2px solid var(--n); border-radius:22px; overflow:hidden; box-shadow:var(--sh); }
        .ct-form-head { padding:1.75rem; border-bottom:1px solid var(--n); display:flex; align-items:center; gap:1rem; }
        .ct-form-head-ico { width:46px; height:46px; border-radius:13px; background:rgba(104,59,43,0.1); display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:var(--p); flex-shrink:0; }
        .ct-form-head-t { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:800; color:var(--bl); }
        .ct-form-head-s { font-size:0.78rem; color:var(--gr); font-weight:600; margin-top:0.15rem; }
        .ct-form-body   { padding:1.75rem; }
        .ct-form        { display:flex; flex-direction:column; gap:1.1rem; }
        .ct-row         { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .ct-label       { display:block; font-size:0.76rem; font-weight:800; color:var(--bl); margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; }
        .ct-input       { width:100%; padding:0.72rem 1rem; border:2px solid var(--n); border-radius:10px; font-size:0.88rem; font-weight:600; color:var(--bl); background:var(--wh); outline:none; font-family:'Nunito',sans-serif; transition:border-color 0.2s; }
        .ct-input:focus { border-color:var(--p); }
        .ct-textarea    { resize:vertical; min-height:110px; }
        .ct-form-footer { display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .ct-form-note   { font-size:0.78rem; color:var(--gr); font-weight:600; }
        .ct-submit {
          background:var(--p); color:var(--wh);
          padding:0.75rem 2rem; border-radius:11px;
          font-weight:800; font-size:0.9rem;
          border:none; cursor:pointer;
          font-family:'Nunito',sans-serif;
          box-shadow:0 4px 14px rgba(104,59,43,0.3);
          transition:all 0.2s;
          display:inline-flex; align-items:center; gap:0.4rem;
        }
        .ct-submit:hover { background:var(--p2); transform:translateY(-1px); box-shadow:0 8px 22px rgba(104,59,43,0.38); }

        /* success */
        .ct-success { background:rgba(176,132,1,0.06); border:2px solid rgba(176,132,1,0.2); border-radius:16px; padding:3rem 2rem; text-align:center; }
        .ct-success-ico { font-size:2.8rem; margin-bottom:0.85rem; }
        .ct-success-t   { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:800; color:var(--p); margin-bottom:0.5rem; }
        .ct-success-p   { color:var(--gr); font-size:0.88rem; font-weight:600; }

        /* ── MAP ── */
        .ct-map-card { background:var(--wh); border:2px solid var(--n); border-radius:22px; overflow:hidden; box-shadow:var(--sh); }
        .ct-map-head { padding:1.4rem 1.75rem; border-bottom:1px solid var(--n); }
        .ct-map-t    { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:800; color:var(--bl); }
        .ct-map-s    { font-size:0.78rem; color:var(--gr); font-weight:600; margin-top:0.2rem; }
        .ct-map-foot { background:var(--l); padding:0.85rem 1.75rem; font-size:0.8rem; color:var(--gr); font-weight:600; text-align:center; border-top:1px solid var(--n); }
        .ct-map-foot strong { color:var(--p); }

        /* ── OTHER WAYS ── */
        .ct-ways-sec { background:linear-gradient(135deg,var(--s) 0%,#7a5801 50%,var(--p) 100%); padding:5rem 0; position:relative; overflow:hidden; }
        .ct-ways-sec::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23fff' fill-opacity='0.05'/%3E%3C/svg%3E"); }
        .ct-ways-inner { position:relative; z-index:2; }
        .ct-ways-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; margin-top:3rem; }
        .ct-way-card   { background:rgba(250,246,242,0.1); border:1px solid rgba(250,246,242,0.18); border-radius:18px; padding:2rem 1.5rem; text-align:center; backdrop-filter:blur(8px); transition:all 0.25s; }
        .ct-way-card:hover { background:rgba(250,246,242,0.16); transform:translateY(-3px); }
        .ct-way-ico    { font-size:1.8rem; color:var(--a); margin-bottom:1rem; display:flex; justify-content:center; }
        .ct-way-title  { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:800; color:var(--wh); margin-bottom:0.6rem; }
        .ct-way-desc   { color:rgba(250,246,242,0.72); font-size:0.9rem; line-height:1.7; font-weight:600; margin-bottom:1.2rem; }
        .ct-way-link   { display:inline-flex; align-items:center; gap:0.35rem; background:rgba(250,246,242,0.14); border:1px solid rgba(250,246,242,0.25); color:var(--wh); font-size:0.82rem; font-weight:800; padding:0.5rem 1.1rem; border-radius:8px; text-decoration:none; transition:all 0.2s; cursor:pointer; font-family:'Nunito',sans-serif; }
        .ct-way-link:hover { background:rgba(250,246,242,0.22); }

        /* ── NOTE ── */
        .ct-note-sec { background:var(--wh); padding:3rem 0; }
        .ct-note     { text-align:center; color:var(--gr); font-size:0.88rem; font-weight:600; line-height:1.8; }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) {
          .ct-main-grid { grid-template-columns:1fr; }
          .ct-em-grid   { grid-template-columns:1fr; }
          .ct-ways-grid { grid-template-columns:1fr; }
          .ct-info-card { position:static; }
        }
        @media (max-width:768px) {
          .ct-sec  { padding:4rem 0; }
          .ct-row  { grid-template-columns:1fr; }
          .ct-ways-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="ct-root">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="ct-hero">
          <div className="ct-hero-orb1" /><div className="ct-hero-orb2" />
          <div className="ct-hero-inner">
            <div className="ct-hero-badge">
              <span className="ct-badge-dot" />
              We're Here to Help
            </div>
            <h1 className="ct-hero-h1">
              Get in <span className="ct-hero-accent">Touch</span><br />with MediCare
            </h1>
            <p className="ct-hero-sub">
              We're here to help with any questions about our services.
              Reach out through any channel and we'll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* ══ EMERGENCY STRIP ══════════════════════════════ */}
        <section className="ct-em-sec">
          <div className="ct-wrap">
            <div className="ct-center" style={{ marginBottom: "2.5rem" }}>
              <span className="ct-tag" style={{ background: "rgba(212,158,141,0.18)", color: "var(--a)" }}>
                🚨 Emergency Contacts
              </span>
              <h2 className="ct-h2" style={{ color: "var(--wh)" }}>Available 24 / 7</h2>
            </div>
            <div className="ct-em-grid">
              {emergencyContacts.map((c, i) => (
                <div className="ct-em-card" key={i}>
                  <div className="ct-em-ico">{c.icon}</div>
                  <div>
                    <div className="ct-em-t">{c.title}</div>
                    <div className="ct-em-num">{c.number}</div>
                    <div className="ct-em-av">Available: {c.available}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ══════════════════════════════════ */}
        <section className="ct-sec" style={{ background: "var(--l)" }}>
          <div className="ct-wrap">
            <div className="ct-main-grid">

              {/* LEFT — Contact Info */}
              <div className="ct-info-card">
                <div className="ct-info-head">
                  <div className="ct-info-head-t">Contact Information</div>
                  <div className="ct-info-head-s">Multiple ways to reach our team</div>
                </div>
                <div className="ct-info-body">
                  {contactInfo.map((c, i) => (
                    <div className="ct-info-item" key={i}>
                      <div className="ct-info-ico">{c.icon}</div>
                      <div>
                        <div className="ct-info-t">{c.title}</div>
                        <div className="ct-info-l">{c.lines.map((l, j) => <span key={j}>{l}<br /></span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Form + Map */}
              <div className="ct-right">

                {/* Form */}
                <div className="ct-form-card">
                  <div className="ct-form-head">
                    <div className="ct-form-head-ico"><FaPaperPlane /></div>
                    <div>
                      <div className="ct-form-head-t">Send us a Message</div>
                      <div className="ct-form-head-s">Fill out the form and we'll get back to you shortly</div>
                    </div>
                  </div>
                  <div className="ct-form-body">
                    {submitted ? (
                      <div className="ct-success">
                        <div className="ct-success-ico">✅</div>
                        <div className="ct-success-t">Message Sent!</div>
                        <div className="ct-success-p">Thank you for contacting us. We'll respond within 24 hours.</div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="ct-form">
                        <div className="ct-row">
                          <div>
                            <label className="ct-label">Full Name *</label>
                            <input name="name" type="text" required placeholder="Your full name" value={formData.name} onChange={handleChange} className="ct-input" />
                          </div>
                          <div>
                            <label className="ct-label">Email Address *</label>
                            <input name="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} className="ct-input" />
                          </div>
                        </div>
                        <div className="ct-row">
                          <div>
                            <label className="ct-label">Phone Number</label>
                            <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} className="ct-input" />
                          </div>
                          <div>
                            <label className="ct-label">Subject *</label>
                            <select name="subject" required value={formData.subject} onChange={handleChange} className="ct-input">
                              <option value="">Select a subject</option>
                              <option value="appointment">Book an Appointment</option>
                              <option value="billing">Billing Inquiry</option>
                              <option value="feedback">Feedback / Suggestion</option>
                              <option value="medical-records">Medical Records</option>
                              <option value="general">General Inquiry</option>
                              <option value="emergency">Emergency</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="ct-label">Message *</label>
                          <textarea name="message" required placeholder="Describe your inquiry in detail..." value={formData.message} onChange={handleChange} className={`ct-input ct-textarea`} />
                        </div>
                        <div className="ct-form-footer">
                          <span className="ct-form-note">* Required fields</span>
                          <button type="submit" className="ct-submit">
                            <FaPaperPlane /> Send Message
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="ct-map-card">
                  <div className="ct-map-head">
                    <div className="ct-map-t">📍 Find Our Hospital</div>
                    <div className="ct-map-s">Visit us at our main campus location</div>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.8379098956125!2d85.89041007501551!3d20.471849581041685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190d7fd866141d%3A0xcb2c394af5c137e0!2sS.C.B.%20Medical%20College%20and%20Hospital%20cuttack!5e0!3m2!1sen!2sin!4v1770359142643!5m2!1sen!2sin"
                    width="100%" height="300"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hospital Location Map"
                  />
                  <div className="ct-map-foot">
                    <strong>Parking available:</strong> Free parking for all patients and visitors
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══ OTHER WAYS ════════════════════════════════════ */}
        <section className="ct-ways-sec">
          <div className="ct-wrap ct-ways-inner">
            <div className="ct-center">
              <span className="ct-tag" style={{ background: "rgba(212,158,141,0.18)", color: "var(--a)" }}>
                More Options
              </span>
              <h2 className="ct-h2" style={{ color: "var(--wh)" }}>Other Ways to Reach Us</h2>
            </div>
            <div className="ct-ways-grid">
              {otherWays.map((w, i) => (
                <div className="ct-way-card" key={i}>
                  <div className="ct-way-ico">{w.icon}</div>
                  <div className="ct-way-title">{w.title}</div>
                  <div className="ct-way-desc">{w.desc}</div>
                  {w.link
                    ? <a href={w.link} className="ct-way-link">{w.cta}</a>
                    : <span className="ct-way-link">{w.cta}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ NOTE ══════════════════════════════════════════ */}
        <section className="ct-note-sec">
          <div className="ct-wrap">
            <div className="ct-note">
              <p>We typically respond to inquiries within 24 hours during business days.</p>
              <p>For medical emergencies, please call our emergency numbers or visit the nearest emergency department.</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;