import React from "react";
import { Link } from "react-router-dom";

const Pediatrics = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

        :root {
          --p: #683B2B;
          --s: #B08401;
          --a: #D49E8D;
          --l: #FAF6F2;
          --n: #DED1BD;
        }

        .dept-root {
          font-family: 'Nunito', sans-serif;
          background: var(--l);
          padding-top: 80px;
        }

        .dept-wrap {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
        }

        /* ===== HERO ===== */
        .dept-hero {
          background: linear-gradient(135deg, var(--p), #3a1c10);
          color: white;
          padding: 6rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .dept-hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, var(--a), transparent);
          top: -50px;
          right: -50px;
          opacity: 0.3;
        }

        .dept-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
        }

        .dept-sub {
          margin-top: 1rem;
          color: rgba(255,255,255,0.75);
        }

        /* ===== SECTION ===== */
        .dept-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .dept-tag {
          background: rgba(104,59,43,0.1);
          color: var(--p);
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .dept-h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          margin: 1rem 0;
        }

        .dept-p {
          color: #6b6b6b;
          max-width: 600px;
          margin: auto;
        }

        /* ===== CARDS ===== */
        .dept-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .dept-card {
          background: white;
          border: 1px solid var(--n);
          border-radius: 18px;
          padding: 1.6rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .dept-card::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, var(--s), var(--a));
          top: 0;
          left: 0;
        }

        .dept-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        /* ===== BUTTON ===== */
        .dept-btn {
          display: inline-block;
          margin-top: 2rem;
          background: linear-gradient(to right, var(--s), var(--p));
          color: white;
          padding: 0.9rem 2.2rem;
          border-radius: 12px;
          font-weight: 800;
          transition: 0.3s;
        }

        .dept-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .dept-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dept-root">

        {/* ===== HERO ===== */}
        <section className="dept-hero">
          <h1 className="dept-title">
            Pediatrics Department
          </h1>
          <p className="dept-sub">
            Caring for children with compassion, expertise, and advanced medical care
          </p>
        </section>

        <div className="dept-wrap">

          {/* ===== HEADER ===== */}
          <div className="dept-header">
            <span className="dept-tag">Child Health</span>
            <h2 className="dept-h2">Comprehensive Pediatric Services</h2>
            <p className="dept-p">
              Our pediatrics department focuses on the complete well-being of children,
              providing preventive care, vaccinations, and treatment for a wide range of
              childhood conditions with a gentle and compassionate approach.
            </p>
          </div>

          {/* ===== SERVICES ===== */}
          <div className="dept-grid">
            <div className="dept-card">Newborn & Infant Care</div>
            <div className="dept-card">Child Vaccination</div>
            <div className="dept-card">Growth Monitoring</div>
            <div className="dept-card">Pediatric Emergency Care</div>
          </div>

          {/* ===== CTA ===== */}
          <div style={{ textAlign: "center" }}>
            <Link to="/appointment" className="dept-btn">
              Book Appointment →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Pediatrics;