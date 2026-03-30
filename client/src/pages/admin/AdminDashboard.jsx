import { useState, useEffect, useRef } from "react";

const useAuth = () => ({ user: { name: "Debasis Rout" } });

const C = {
  bg:        "#FAF6F2",
  card:      "#ffffff",
  border:    "#DED1BD",
  text:      "#683B2B",
  muted:     "#B08401",
  primary:   "#683B2B",
  secondary: "#B08401",
  accent:    "#D49E8D",
  neutral:   "#DED1BD",
};

const Sparkline = ({ data, color }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 80, h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Counter = ({ target }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0; const step = Math.ceil(target / 40);
    const id = setInterval(() => { n = Math.min(n + step, target); setVal(n); if (n >= target) clearInterval(id); }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <>{val.toLocaleString()}</>;
};

const Ring = ({ pct, color, size = 72 }) => {
  const r = (size - 8) / 2, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.neutral} strokeWidth="6" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
    </svg>
  );
};

const Badge = ({ label, bg, fg }) => (
  <span style={{ background: bg, color: fg, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: fg, display: "inline-block" }} />{label}
  </span>
);

const INIT_PATIENTS = [
  { id: "P001", name: "Ravi Sharma",  age: 45, gender: "M", blood: "O+",  diagnosis: "Hypertension", doctor: "Dr. Meera Nair",  status: "admitted",   phone: "9876543210", ward: "Cardiology",    admitted: "Mar 20" },
  { id: "P002", name: "Sunita Devi",  age: 32, gender: "F", blood: "A+",  diagnosis: "Diabetes T2",  doctor: "Dr. Arjun Patel", status: "outpatient", phone: "9123456780", ward: "Endocrinology", admitted: "Mar 22" },
  { id: "P003", name: "Mohan Das",    age: 60, gender: "M", blood: "B-",  diagnosis: "Fracture Leg", doctor: "Dr. Priya Iyer",  status: "discharged", phone: "9988776655", ward: "Orthopaedics",  admitted: "Feb 14" },
  { id: "P004", name: "Anita Roy",    age: 28, gender: "F", blood: "AB+", diagnosis: "Appendicitis", doctor: "Dr. Kiran Reddy", status: "surgery",    phone: "9012345678", ward: "Surgery",       admitted: "Mar 25" },
  { id: "P005", name: "Vikram Singh", age: 52, gender: "M", blood: "O-",  diagnosis: "Asthma",       doctor: "Dr. Meera Nair",  status: "outpatient", phone: "9345678901", ward: "Pulmonology",   admitted: "Mar 10" },
];

const INIT_DOCTORS = [
  { id: "D001", name: "Dr. Meera Nair",   specialty: "Cardiology",    exp: "12 yrs", patients: 38, status: "on-duty",  rating: 4.9, phone: "9811223344", email: "meera@medicare.io"  },
  { id: "D002", name: "Dr. Arjun Patel",  specialty: "Endocrinology", exp: "8 yrs",  patients: 27, status: "on-duty",  rating: 4.7, phone: "9822334455", email: "arjun@medicare.io"  },
  { id: "D003", name: "Dr. Priya Iyer",   specialty: "Orthopaedics",  exp: "15 yrs", patients: 42, status: "off-duty", rating: 4.8, phone: "9833445566", email: "priya@medicare.io"  },
  { id: "D004", name: "Dr. Kiran Reddy",  specialty: "Surgery",       exp: "20 yrs", patients: 55, status: "on-duty",  rating: 5.0, phone: "9844556677", email: "kiran@medicare.io"  },
  { id: "D005", name: "Dr. Suresh Kumar", specialty: "Pulmonology",   exp: "6 yrs",  patients: 19, status: "leave",    rating: 4.5, phone: "9855667788", email: "suresh@medicare.io" },
];

const INIT_APPTS = [
  { id: "A001", patient: "Ravi Sharma",  doctor: "Dr. Meera Nair",  date: "2026-03-27", time: "10:00 AM", type: "Follow-up",    status: "confirmed" },
  { id: "A002", patient: "Sunita Devi",  doctor: "Dr. Arjun Patel", date: "2026-03-27", time: "11:30 AM", type: "Consultation", status: "pending"   },
  { id: "A003", patient: "Anita Roy",    doctor: "Dr. Kiran Reddy", date: "2026-03-28", time: "09:00 AM", type: "Pre-op",       status: "confirmed" },
  { id: "A004", patient: "Vikram Singh", doctor: "Dr. Meera Nair",  date: "2026-03-28", time: "02:00 PM", type: "Check-up",     status: "pending"   },
  { id: "A005", patient: "Mohan Das",    doctor: "Dr. Priya Iyer",  date: "2026-03-29", time: "03:30 PM", type: "Discharge",    status: "cancelled" },
];

const ACTIVITY = [
  { icon: "🔐", text: "New admin login detected",           time: "2m ago",  type: "security" },
  { icon: "🏥", text: "Patient Anita Roy moved to Surgery", time: "15m ago", type: "patient"  },
  { icon: "📋", text: "Appointment A002 status updated",    time: "1h ago",  type: "appt"     },
  { icon: "💊", text: "Pharmacy stock alert: Paracetamol",  time: "2h ago",  type: "warning"  },
  { icon: "👨‍⚕️", text: "Dr. Suresh Kumar on leave today",   time: "3h ago",  type: "doctor"   },
  { icon: "📦", text: "System v2.4.1 deployed",             time: "4h ago",  type: "deploy"   },
];

const SYS_INIT = [
  { label: "CPU",     pct: 42, color: C.primary   },
  { label: "Memory",  pct: 67, color: C.secondary },
  { label: "Storage", pct: 55, color: C.accent    },
];

const STATUS_CLR = {
  admitted:   { bg: "#683B2B18", fg: C.primary   },
  outpatient: { bg: "#B0840120", fg: C.secondary },
  discharged: { bg: "#DED1BD50", fg: "#7A6A5A"   },
  surgery:    { bg: "#D49E8D28", fg: "#b06040"   },
  "on-duty":  { bg: "#683B2B18", fg: C.primary   },
  "off-duty": { bg: "#DED1BD50", fg: "#7A6A5A"   },
  leave:      { bg: "#D49E8D28", fg: "#b06040"   },
  confirmed:  { bg: "#683B2B18", fg: C.primary   },
  pending:    { bg: "#B0840120", fg: C.secondary },
  cancelled:  { bg: "#D49E8D28", fg: "#b06040"   },
};

const ACT_CLR = {
  security: { bg: "#683B2B18", fg: C.primary   },
  patient:  { bg: "#B0840120", fg: C.secondary },
  appt:     { bg: "#D49E8D28", fg: "#b06040"   },
  warning:  { bg: "#B0840120", fg: C.secondary },
  doctor:   { bg: "#683B2B18", fg: C.primary   },
  deploy:   { bg: "#DED1BD50", fg: "#7A6A5A"   },
};

const NAV_TABS = [
  { key: "dashboard",   label: "Dashboard",    icon: "⊞" },
  { key: "patient",     label: "Patient",      icon: "🏥" },
  { key: "doctor",      label: "Doctor",       icon: "👨‍⚕️" },
  { key: "appointment", label: "Appointment",  icon: "📅" },
  { key: "activity",    label: "Activity Log", icon: "📋" },
  { key: "system",      label: "System",       icon: "⚙️" },
];

const Modal = ({ onClose, children }) => (
  <div style={S.overlay} onClick={onClose}>
    <div style={S.modal} className="modal-in" onClick={e => e.stopPropagation()}>
      <button style={S.modalX} onClick={onClose}>✕</button>
      {children}
    </div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", options }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={S.input}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={S.input} />
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// ⚠️  NO SIDEBAR RENDERED HERE.
//     This component is the main content only.
//     Your AdminLayout.jsx already renders <Sidebar /> — do NOT add it here.
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab]       = useState("dashboard");
  const [toast, setToast]   = useState(null);
  const [notifs, setNotifs] = useState(3);
  const [search, setSearch] = useState("");
  const [sys, setSys]       = useState(SYS_INIT.map(s => ({ ...s })));
  const timerRef            = useRef(null);

  const [patients, setPatients] = useState(INIT_PATIENTS);
  const [doctors,  setDoctors]  = useState(INIT_DOCTORS);
  const [appts,    setAppts]    = useState(INIT_APPTS);
  const [modal, setModal]       = useState(null);
  const [pForm, setPForm]       = useState({});
  const [dForm, setDForm]       = useState({});
  const [aForm, setAForm]       = useState({});

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSys(prev => prev.map(s => ({ ...s, pct: Math.min(99, Math.max(10, s.pct + ((Math.random() * 6 - 3) | 0))) })));
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, []);

  const notify = (msg, type = "ok") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3200); };

  const openAddPatient = () => { setPForm({ name:"", age:"", gender:"M", blood:"O+", diagnosis:"", doctor:doctors[0]?.name||"", status:"outpatient", phone:"", ward:"Cardiology", admitted:new Date().toLocaleDateString("en-GB",{month:"short",day:"numeric"}) }); setModal({ type:"addPatient" }); };
  const savePatient    = () => { if (!pForm.name || !pForm.diagnosis) return notify("Name & diagnosis required","err"); setPatients(p=>[{...pForm,id:"P"+String(p.length+1).padStart(3,"0")},...p]); setModal(null); notify("✅ Patient admitted"); };
  const updatePatientStatus = (id,status) => { setPatients(p=>p.map(x=>x.id===id?{...x,status}:x)); notify(`Status → ${status}`); };
  const dischargePatient    = (id) => { updatePatientStatus(id,"discharged"); setModal(null); };

  const openAddDoctor = () => { setDForm({ name:"Dr. ", specialty:"Cardiology", exp:"", patients:0, status:"on-duty", rating:4.5, phone:"", email:"" }); setModal({ type:"addDoctor" }); };
  const saveDoctor    = () => { if (!dForm.name||!dForm.specialty) return notify("Name & specialty required","err"); setDoctors(d=>[{...dForm,id:"D"+String(d.length+1).padStart(3,"0"),patients:Number(dForm.patients),rating:Number(dForm.rating)},...d]); setModal(null); notify("✅ Doctor registered"); };
  const toggleDoctorStatus = (id) => { setDoctors(d=>d.map(x=>x.id===id?{...x,status:x.status==="on-duty"?"off-duty":"on-duty"}:x)); notify("Doctor status updated"); };

  const openAddAppt = () => { setAForm({ patient:patients[0]?.name||"", doctor:doctors[0]?.name||"", date:"2026-03-27", time:"10:00 AM", type:"Consultation", status:"pending" }); setModal({ type:"addAppt" }); };
  const saveAppt    = () => { if (!aForm.patient||!aForm.doctor) return notify("Patient & doctor required","err"); setAppts(a=>[{...aForm,id:"A"+String(a.length+1).padStart(3,"0")},...a]); setModal(null); notify("✅ Appointment booked"); };
  const updateApptStatus = (id,status) => { setAppts(a=>a.map(x=>x.id===id?{...x,status}:x)); notify(`Appointment ${status}`); };
  const cancelAppt  = (id) => { updateApptStatus(id,"cancelled"); setModal(null); };
  const confirmAppt = (id) => { updateApptStatus(id,"confirmed"); setModal(null); };

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase()));
  const filteredDoctors  = doctors.filter(d  => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));
  const filteredAppts    = appts.filter(a    => a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase()));

  const METRICS = [
    { label:"Total Patients", value:patients.length,                                     delta:"+3 today",  up:true,  color:C.primary,   spark:[10,12,15,14,18,20,22,24,25,patients.length],                                   icon:"🏥" },
    { label:"Active Doctors", value:doctors.filter(d=>d.status==="on-duty").length,       delta:"on duty",   up:true,  color:C.secondary, spark:[3,4,3,4,4,3,4,4,3,doctors.filter(d=>d.status==="on-duty").length],              icon:"👨‍⚕️" },
    { label:"Appointments",   value:appts.filter(a=>a.status!=="cancelled").length,       delta:"this week", up:true,  color:C.accent,    spark:[2,3,4,3,5,4,5,4,4,appts.filter(a=>a.status!=="cancelled").length],              icon:"📅" },
    { label:"Admissions",     value:patients.filter(p=>p.status==="admitted").length,     delta:"admitted",  up:false, color:C.primary,   spark:[1,2,2,3,2,3,2,2,3,patients.filter(p=>p.status==="admitted").length],            icon:"🛏️" },
  ];

  const tabTitle = { dashboard:"Dashboard", patient:"Patient Management", doctor:"Doctor Management", appointment:"Appointments", activity:"Activity Log", system:"System Health" };

  return (
    <div style={S.root}>
      <style>{CSS}</style>

      <header style={S.header}>
        <div>
          <div style={S.breadcrumb}>Medicare Admin / {tabTitle[tab]}</div>
          <h1 style={S.pageTitle}>{tabTitle[tab]}</h1>
        </div>
        <div style={S.headerRight}>
          <div style={S.searchWrap}>
            <span style={S.searchIco}>⌕</span>
            <input style={S.searchInput} placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} />
            {search && <button style={S.clearBtn} onClick={()=>setSearch("")}>✕</button>}
          </div>
          <button style={S.notifBtn} onClick={()=>{ setNotifs(0); notify("All notifications cleared"); }}>
            🔔{notifs>0&&<span style={S.badge}>{notifs}</span>}
          </button>
        </div>
      </header>

      {/* Tab strip */}
      <div style={S.tabBar}>
        {NAV_TABS.map(n => (
          <button key={n.key} style={{...S.tabBtn,...(tab===n.key?S.tabOn:{})}} onClick={()=>{ setTab(n.key); setSearch(""); }}>
            <span>{n.icon}</span>{n.label}
            {n.key==="appointment"&&appts.filter(a=>a.status==="pending").length>0&&(
              <span style={S.tabBadge}>{appts.filter(a=>a.status==="pending").length}</span>
            )}
          </button>
        ))}
      </div>

      <div style={S.section}>

        {/* ── DASHBOARD ── */}
        {tab==="dashboard"&&(
          <>
            <div style={S.metricGrid}>
              {METRICS.map((m,i)=>(
                <div key={i} style={{...S.card,animationDelay:`${i*70}ms`}} className="card-in">
                  <div style={S.cardTop}>
                    <div><div style={S.cardLabel}>{m.label}</div><div style={{...S.cardVal,color:m.color}}><Counter target={m.value}/></div></div>
                    <span style={{fontSize:24}}>{m.icon}</span>
                  </div>
                  <div style={S.cardBot}><Sparkline data={m.spark} color={m.color}/><span style={{fontSize:12,fontWeight:700,color:m.up?C.primary:"#b06040"}}>{m.delta}</span></div>
                  <div style={{...S.cardStripe,background:m.color}}/>
                </div>
              ))}
            </div>
            <div style={{...S.card,padding:28,marginBottom:20}} className="card-in">
              <div style={S.glowBlob}/>
              <div style={{position:"relative"}}>
                <div style={S.welcomeHi}>Good morning, {user?.name} 👋</div>
                <div style={S.welcomeSub}>You have <strong style={{color:C.secondary}}>{appts.filter(a=>a.status==="pending").length} pending appointments</strong> and <strong style={{color:C.primary}}>{patients.filter(p=>p.status==="admitted").length} admitted patients</strong> today.</div>
                <div style={S.quickRow}>
                  <button style={S.quickBtn} onClick={()=>setTab("patient")}>🏥 View Patients</button>
                  <button style={S.quickBtn} onClick={()=>setTab("appointment")}>📅 Appointments</button>
                  <button style={S.quickBtn} onClick={openAddPatient}>➕ Admit Patient</button>
                  <button style={S.quickBtn} onClick={()=>setTab("doctor")}>👨‍⚕️ Doctors</button>
                </div>
              </div>
            </div>
            <div style={S.tableCard} className="card-in">
              <div style={S.tableHead}><span style={S.tableTitle}>Today's Appointments</span><button style={S.addBtn} onClick={()=>setTab("appointment")}>View All →</button></div>
              <table style={S.table}>
                <thead><tr>{["Patient","Doctor","Time","Type","Status"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{appts.slice(0,4).map((a,i)=>(
                  <tr key={i} style={S.tr} className="table-row">
                    <td style={S.td}><span style={S.uName}>{a.patient}</span></td>
                    <td style={S.td}><span style={{color:C.muted,fontSize:12}}>{a.doctor}</span></td>
                    <td style={S.td}><span style={{fontSize:12}}>{a.time}</span></td>
                    <td style={S.td}><span style={S.roleChip}>{a.type}</span></td>
                    <td style={S.td}><Badge label={a.status} bg={STATUS_CLR[a.status]?.bg} fg={STATUS_CLR[a.status]?.fg}/></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}

        {/* ── PATIENTS ── */}
        {tab==="patient"&&(
          <div style={S.tableCard} className="card-in">
            <div style={S.tableHead}>
              <div><span style={S.tableTitle}>All Patients</span><span style={{marginLeft:10,fontSize:12,color:C.muted}}>{filteredPatients.length} records</span></div>
              <button style={S.addBtn} onClick={openAddPatient}>+ Admit Patient</button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={S.table}>
                <thead><tr>{["ID","Patient","Age","Blood","Diagnosis","Doctor","Ward","Status","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{filteredPatients.map((p,i)=>(
                  <tr key={i} style={S.tr} className="table-row">
                    <td style={S.td}><span style={{color:C.muted,fontSize:11,fontFamily:"monospace"}}>{p.id}</span></td>
                    <td style={S.td}><div style={S.userCell}><div style={{...S.av,background:C.primary+"18",color:C.primary}}>{p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div><div><div style={S.uName}>{p.name}</div><div style={S.uSub}>{p.phone}</div></div></div></td>
                    <td style={S.td}>{p.age}/{p.gender}</td>
                    <td style={S.td}><span style={{...S.roleChip,background:C.secondary+"15",color:C.secondary}}>{p.blood}</span></td>
                    <td style={S.td}>{p.diagnosis}</td>
                    <td style={S.td}><span style={{fontSize:12,color:C.muted}}>{p.doctor}</span></td>
                    <td style={S.td}><span style={{fontSize:12}}>{p.ward}</span></td>
                    <td style={S.td}><Badge label={p.status} bg={STATUS_CLR[p.status]?.bg||"#eee"} fg={STATUS_CLR[p.status]?.fg||"#666"}/></td>
                    <td style={S.td}><div style={{display:"flex",gap:6}}><button style={S.actBtn} onClick={()=>setModal({type:"viewPatient",data:p})}>View</button>{p.status!=="discharged"&&<button style={{...S.actBtn,color:C.secondary}} onClick={()=>updatePatientStatus(p.id,"discharged")}>Discharge</button>}</div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── DOCTORS ── */}
        {tab==="doctor"&&(
          <div style={S.tableCard} className="card-in">
            <div style={S.tableHead}>
              <div><span style={S.tableTitle}>Medical Staff</span><span style={{marginLeft:10,fontSize:12,color:C.muted}}>{filteredDoctors.length} doctors</span></div>
              <button style={S.addBtn} onClick={openAddDoctor}>+ Add Doctor</button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={S.table}>
                <thead><tr>{["ID","Doctor","Specialty","Experience","Patients","Rating","Status","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{filteredDoctors.map((d,i)=>(
                  <tr key={i} style={S.tr} className="table-row">
                    <td style={S.td}><span style={{color:C.muted,fontSize:11,fontFamily:"monospace"}}>{d.id}</span></td>
                    <td style={S.td}><div style={S.userCell}><div style={{...S.av,background:C.secondary+"18",color:C.secondary}}>{d.name.split(" ").slice(-1)[0].slice(0,2).toUpperCase()}</div><div><div style={S.uName}>{d.name}</div><div style={S.uSub}>{d.email}</div></div></div></td>
                    <td style={S.td}><span style={S.roleChip}>{d.specialty}</span></td>
                    <td style={S.td}>{d.exp}</td>
                    <td style={S.td}><span style={{fontWeight:700,color:C.primary}}>{d.patients}</span></td>
                    <td style={S.td}><span style={{color:C.secondary,fontWeight:700}}>{"★".repeat(Math.floor(d.rating))} {d.rating}</span></td>
                    <td style={S.td}><Badge label={d.status} bg={STATUS_CLR[d.status]?.bg||"#eee"} fg={STATUS_CLR[d.status]?.fg||"#666"}/></td>
                    <td style={S.td}><div style={{display:"flex",gap:6}}><button style={S.actBtn} onClick={()=>setModal({type:"viewDoctor",data:d})}>View</button><button style={{...S.actBtn,color:C.secondary}} onClick={()=>toggleDoctorStatus(d.id)}>Toggle</button></div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── APPOINTMENTS ── */}
        {tab==="appointment"&&(
          <div style={S.tableCard} className="card-in">
            <div style={S.tableHead}>
              <div><span style={S.tableTitle}>All Appointments</span><span style={{marginLeft:10,fontSize:12,color:C.muted}}>{filteredAppts.length} total</span></div>
              <button style={S.addBtn} onClick={openAddAppt}>+ Book Appointment</button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={S.table}>
                <thead><tr>{["ID","Patient","Doctor","Date","Time","Type","Status","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{filteredAppts.map((a,i)=>(
                  <tr key={i} style={S.tr} className="table-row">
                    <td style={S.td}><span style={{color:C.muted,fontSize:11,fontFamily:"monospace"}}>{a.id}</span></td>
                    <td style={S.td}><span style={S.uName}>{a.patient}</span></td>
                    <td style={S.td}><span style={{fontSize:12,color:C.muted}}>{a.doctor}</span></td>
                    <td style={S.td}><span style={{fontSize:12}}>{a.date}</span></td>
                    <td style={S.td}><span style={{fontSize:12,fontWeight:600}}>{a.time}</span></td>
                    <td style={S.td}><span style={S.roleChip}>{a.type}</span></td>
                    <td style={S.td}><Badge label={a.status} bg={STATUS_CLR[a.status]?.bg||"#eee"} fg={STATUS_CLR[a.status]?.fg||"#666"}/></td>
                    <td style={S.td}><div style={{display:"flex",gap:6}}>{a.status==="pending"&&<button style={{...S.actBtn,color:C.primary}} onClick={()=>confirmAppt(a.id)}>Confirm</button>}{a.status!=="cancelled"&&<button style={{...S.actBtn,color:"#b06040"}} onClick={()=>cancelAppt(a.id)}>Cancel</button>}<button style={S.actBtn} onClick={()=>setModal({type:"viewAppt",data:a})}>View</button></div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ACTIVITY ── */}
        {tab==="activity"&&(
          <div style={S.tableCard} className="card-in">
            <div style={S.tableHead}><span style={S.tableTitle}>System Activity Log</span><button style={S.addBtn} onClick={()=>notify("📥 Log exported")}>Export CSV</button></div>
            {ACTIVITY.map((a,i)=>(
              <div key={i} style={{...S.actRow,animationDelay:`${i*60}ms`}} className="card-in">
                <span style={{fontSize:20}}>{a.icon}</span>
                <div style={{flex:1,fontSize:13}}>{a.text}</div>
                <span style={{fontSize:11,color:C.muted,whiteSpace:"nowrap"}}>{a.time}</span>
                <span style={{...S.tag,background:ACT_CLR[a.type]?.bg,color:ACT_CLR[a.type]?.fg}}>{a.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── SYSTEM ── */}
        {tab==="system"&&(
          <>
            <div style={S.sysGrid}>
              {sys.map((s,i)=>(
                <div key={i} style={{...S.sysCard,animationDelay:`${i*80}ms`}} className="card-in">
                  <Ring pct={s.pct} color={s.color}/>
                  <div style={{marginTop:12,color:s.color,fontSize:22,fontWeight:700}}>{s.pct}%</div>
                  <div style={{color:C.muted,fontSize:12,textTransform:"uppercase",letterSpacing:1,marginTop:4}}>{s.label}</div>
                  <div style={S.sysBar}><div style={{...S.sysBarFill,width:`${s.pct}%`,background:s.color}}/></div>
                  <div style={{fontSize:12,marginTop:10,fontWeight:600,color:s.pct<70?C.primary:C.secondary}}>{s.pct<70?"● Healthy":"● Elevated"}</div>
                </div>
              ))}
            </div>
            <div style={S.tableCard} className="card-in">
              <div style={S.tableHead}><span style={S.tableTitle}>Live System Stats</span></div>
              {[["Uptime","99.97%"],["Avg Response","142ms"],["Error Rate","0.03%"],["Active Connections","3,820"],["DB Queries/min","1,240"],["Cache Hit Rate","94.2%"]].map(([k,v],i)=>(
                <div key={i} style={S.statRow}><span style={{color:C.muted,fontSize:13}}>{k}</span><span style={{fontWeight:700,fontSize:14,color:C.primary}}>{v}</span></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── MODALS ── */}
      {modal?.type==="addPatient"&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Admit New Patient</h2><div style={S.formGrid}><Field label="Full Name" value={pForm.name} onChange={v=>setPForm(f=>({...f,name:v}))}/><Field label="Age" value={pForm.age} onChange={v=>setPForm(f=>({...f,age:v}))} type="number"/><Field label="Gender" value={pForm.gender} onChange={v=>setPForm(f=>({...f,gender:v}))} options={["M","F","Other"]}/><Field label="Blood Group" value={pForm.blood} onChange={v=>setPForm(f=>({...f,blood:v}))} options={["O+","O-","A+","A-","B+","B-","AB+","AB-"]}/><Field label="Diagnosis" value={pForm.diagnosis} onChange={v=>setPForm(f=>({...f,diagnosis:v}))}/><Field label="Doctor" value={pForm.doctor} onChange={v=>setPForm(f=>({...f,doctor:v}))} options={doctors.map(d=>d.name)}/><Field label="Ward" value={pForm.ward} onChange={v=>setPForm(f=>({...f,ward:v}))} options={["Cardiology","Surgery","Orthopaedics","Endocrinology","Pulmonology","ICU","General"]}/><Field label="Phone" value={pForm.phone} onChange={v=>setPForm(f=>({...f,phone:v}))} type="tel"/></div><div style={S.modalActions}><button style={S.cancelBtn} onClick={()=>setModal(null)}>Cancel</button><button style={S.saveBtn} onClick={savePatient}>Admit Patient</button></div></Modal>)}
      {modal?.type==="viewPatient"&&modal.data&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Patient Details</h2><div style={{...S.av,width:60,height:60,borderRadius:14,fontSize:18,background:C.primary+"18",color:C.primary,margin:"0 auto 16px"}}>{modal.data.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div><div style={{fontSize:18,fontWeight:800,color:C.primary,textAlign:"center",marginBottom:4}}>{modal.data.name}</div><div style={{fontSize:12,color:C.muted,textAlign:"center",marginBottom:16}}>{modal.data.id}·{modal.data.phone}</div>{[["Age/Gender",`${modal.data.age}/${modal.data.gender}`],["Blood",modal.data.blood],["Diagnosis",modal.data.diagnosis],["Doctor",modal.data.doctor],["Ward",modal.data.ward],["Admitted",modal.data.admitted]].map(([k,v])=>(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}><span style={{color:C.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>))}<div style={{marginTop:16}}><Badge label={modal.data.status} bg={STATUS_CLR[modal.data.status]?.bg} fg={STATUS_CLR[modal.data.status]?.fg}/></div><div style={S.modalActions}><button style={S.cancelBtn} onClick={()=>setModal(null)}>Close</button>{modal.data.status!=="discharged"&&<button style={S.saveBtn} onClick={()=>dischargePatient(modal.data.id)}>Discharge</button>}</div></Modal>)}
      {modal?.type==="addDoctor"&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Register Doctor</h2><div style={S.formGrid}><Field label="Full Name" value={dForm.name} onChange={v=>setDForm(f=>({...f,name:v}))}/><Field label="Specialty" value={dForm.specialty} onChange={v=>setDForm(f=>({...f,specialty:v}))} options={["Cardiology","Surgery","Orthopaedics","Endocrinology","Pulmonology","General","Neurology","Paediatrics"]}/><Field label="Experience" value={dForm.exp} onChange={v=>setDForm(f=>({...f,exp:v}))}/><Field label="Phone" value={dForm.phone} onChange={v=>setDForm(f=>({...f,phone:v}))} type="tel"/><Field label="Email" value={dForm.email} onChange={v=>setDForm(f=>({...f,email:v}))} type="email"/><Field label="Rating" value={dForm.rating} onChange={v=>setDForm(f=>({...f,rating:v}))} type="number"/></div><div style={S.modalActions}><button style={S.cancelBtn} onClick={()=>setModal(null)}>Cancel</button><button style={S.saveBtn} onClick={saveDoctor}>Register</button></div></Modal>)}
      {modal?.type==="viewDoctor"&&modal.data&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Doctor Profile</h2><div style={{...S.av,width:60,height:60,borderRadius:14,fontSize:18,background:C.secondary+"18",color:C.secondary,margin:"0 auto 16px"}}>{modal.data.name.split(" ").slice(-1)[0].slice(0,2).toUpperCase()}</div><div style={{fontSize:18,fontWeight:800,color:C.primary,textAlign:"center",marginBottom:4}}>{modal.data.name}</div><div style={{fontSize:12,color:C.muted,textAlign:"center",marginBottom:16}}>{modal.data.specialty}</div>{[["ID",modal.data.id],["Experience",modal.data.exp],["Phone",modal.data.phone],["Email",modal.data.email],["Patients",modal.data.patients],["Rating",`${"★".repeat(Math.floor(modal.data.rating))} ${modal.data.rating}`]].map(([k,v])=>(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}><span style={{color:C.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>))}<div style={{marginTop:16}}><Badge label={modal.data.status} bg={STATUS_CLR[modal.data.status]?.bg} fg={STATUS_CLR[modal.data.status]?.fg}/></div><div style={S.modalActions}><button style={S.cancelBtn} onClick={()=>setModal(null)}>Close</button><button style={S.saveBtn} onClick={()=>{toggleDoctorStatus(modal.data.id);setModal(null);}}>Toggle Status</button></div></Modal>)}
      {modal?.type==="addAppt"&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Book Appointment</h2><div style={S.formGrid}><Field label="Patient" value={aForm.patient} onChange={v=>setAForm(f=>({...f,patient:v}))} options={patients.map(p=>p.name)}/><Field label="Doctor" value={aForm.doctor} onChange={v=>setAForm(f=>({...f,doctor:v}))} options={doctors.map(d=>d.name)}/><Field label="Date" value={aForm.date} onChange={v=>setAForm(f=>({...f,date:v}))} type="date"/><Field label="Time" value={aForm.time} onChange={v=>setAForm(f=>({...f,time:v}))} options={["09:00 AM","10:00 AM","11:00 AM","11:30 AM","12:00 PM","02:00 PM","03:00 PM","03:30 PM","04:00 PM"]}/><Field label="Type" value={aForm.type} onChange={v=>setAForm(f=>({...f,type:v}))} options={["Consultation","Follow-up","Pre-op","Check-up","Discharge","Emergency"]}/></div><div style={S.modalActions}><button style={S.cancelBtn} onClick={()=>setModal(null)}>Cancel</button><button style={S.saveBtn} onClick={saveAppt}>Book Now</button></div></Modal>)}
      {modal?.type==="viewAppt"&&modal.data&&(<Modal onClose={()=>setModal(null)}><h2 style={S.modalTitle}>Appointment Details</h2><div style={{textAlign:"center",marginBottom:16}}><div style={{fontSize:40}}>📅</div><div style={{fontSize:16,fontWeight:800,color:C.primary,marginTop:8}}>{modal.data.type}</div><div style={{fontSize:12,color:C.muted}}>{modal.data.id}</div></div>{[["Patient",modal.data.patient],["Doctor",modal.data.doctor],["Date",modal.data.date],["Time",modal.data.time],["Type",modal.data.type]].map(([k,v])=>(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}><span style={{color:C.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span></div>))}<div style={{marginTop:16}}><Badge label={modal.data.status} bg={STATUS_CLR[modal.data.status]?.bg} fg={STATUS_CLR[modal.data.status]?.fg}/></div><div style={S.modalActions}>{modal.data.status==="pending"&&<button style={S.saveBtn} onClick={()=>confirmAppt(modal.data.id)}>Confirm</button>}{modal.data.status!=="cancelled"&&<button style={S.cancelBtn} onClick={()=>cancelAppt(modal.data.id)}>Cancel Appt</button>}{modal.data.status==="cancelled"&&<button style={S.cancelBtn} onClick={()=>setModal(null)}>Close</button>}</div></Modal>)}

      {toast&&(<div style={{...S.toast,background:toast.type==="err"?C.accent+"28":C.secondary+"18",borderColor:toast.type==="err"?C.accent:C.secondary}} className="toast-in">{toast.msg}</div>)}
    </div>
  );
}

const S = {
  // ⚠️ root is flex-column and fills its parent — no sidebar here
  root:       { display:"flex", flexDirection:"column", flex:1, minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans','Segoe UI',sans-serif", color:C.text },
  header:     { display:"flex", justifyContent:"space-between", alignItems:"flex-end", padding:"20px 28px 16px", borderBottom:`1px solid ${C.border}`, flexShrink:0, background:C.card },
  breadcrumb: { fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:4 },
  pageTitle:  { fontSize:22, fontWeight:800, letterSpacing:-0.5, margin:0, color:C.primary },
  headerRight:{ display:"flex", alignItems:"center", gap:10 },
  searchWrap: { position:"relative", display:"flex", alignItems:"center" },
  searchIco:  { position:"absolute", left:10, color:C.muted, fontSize:16 },
  searchInput:{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 28px 8px 30px", color:C.text, fontSize:13, outline:"none", width:200 },
  clearBtn:   { position:"absolute", right:8, background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:12 },
  notifBtn:   { position:"relative", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 12px", cursor:"pointer", fontSize:16 },
  badge:      { position:"absolute", top:4, right:4, background:C.accent, borderRadius:99, width:14, height:14, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700 },
  tabBar:     { display:"flex", gap:4, padding:"12px 28px 0", background:C.card, borderBottom:`1px solid ${C.border}`, flexShrink:0, overflowX:"auto" },
  tabBtn:     { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:"8px 8px 0 0", border:"none", background:"transparent", color:C.muted, fontSize:12, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap", position:"relative", transition:"all .2s" },
  tabOn:      { background:C.primary, color:"#fff", fontWeight:700 },
  tabBadge:   { background:C.accent, color:"#fff", borderRadius:99, width:16, height:16, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 },
  section:    { padding:"24px 28px", overflowY:"auto", flex:1 },
  metricGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:18 },
  card:       { background:C.card, borderRadius:14, padding:18, border:`1px solid ${C.border}`, position:"relative", overflow:"hidden", boxShadow:`0 2px 12px ${C.primary}0c` },
  cardTop:    { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 },
  cardLabel:  { fontSize:11, textTransform:"uppercase", letterSpacing:1.2, color:C.muted, marginBottom:5 },
  cardVal:    { fontSize:26, fontWeight:800, letterSpacing:-1 },
  cardBot:    { display:"flex", alignItems:"flex-end", justifyContent:"space-between" },
  cardStripe: { position:"absolute", bottom:0, left:0, right:0, height:3, opacity:0.5 },
  glowBlob:   { position:"absolute", top:-50, right:-50, width:160, height:160, borderRadius:"50%", background:C.accent+"20", pointerEvents:"none" },
  welcomeHi:  { fontSize:18, fontWeight:800, marginBottom:6, color:C.primary },
  welcomeSub: { fontSize:13, color:C.muted, lineHeight:1.7, marginBottom:16 },
  quickRow:   { display:"flex", gap:8, flexWrap:"wrap" },
  quickBtn:   { background:C.primary+"12", border:`1px solid ${C.primary}25`, borderRadius:8, padding:"7px 14px", color:C.primary, fontSize:12, fontWeight:600, cursor:"pointer" },
  tableCard:  { background:C.card, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden", marginBottom:18, boxShadow:`0 2px 12px ${C.primary}0c` },
  tableHead:  { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:`1px solid ${C.border}` },
  tableTitle: { fontWeight:700, fontSize:14, color:C.primary },
  addBtn:     { background:C.secondary+"15", border:`1px solid ${C.secondary}30`, borderRadius:8, padding:"6px 14px", color:C.secondary, fontSize:12, fontWeight:600, cursor:"pointer" },
  table:      { width:"100%", borderCollapse:"collapse" },
  th:         { padding:"10px 16px", fontSize:10, textTransform:"uppercase", letterSpacing:1, color:C.muted, textAlign:"left", fontWeight:700, background:C.bg, whiteSpace:"nowrap" },
  tr:         { borderTop:`1px solid ${C.border}`, transition:"background .15s" },
  td:         { padding:"12px 16px", fontSize:13 },
  userCell:   { display:"flex", alignItems:"center", gap:10 },
  av:         { width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 },
  uName:      { fontWeight:600, fontSize:13, color:C.text },
  uSub:       { fontSize:11, color:C.muted },
  roleChip:   { background:C.primary+"14", color:C.primary, borderRadius:5, padding:"2px 8px", fontSize:11, fontWeight:600, whiteSpace:"nowrap" },
  actBtn:     { background:"transparent", border:`1px solid ${C.border}`, borderRadius:6, padding:"4px 10px", color:C.text, fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" },
  actRow:     { display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderTop:`1px solid ${C.border}` },
  tag:        { borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, marginLeft:8, whiteSpace:"nowrap" },
  sysGrid:    { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:18 },
  sysCard:    { background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:22, display:"flex", flexDirection:"column", alignItems:"center", boxShadow:`0 2px 12px ${C.primary}0c` },
  sysBar:     { width:"100%", height:4, borderRadius:99, background:C.neutral, overflow:"hidden", marginTop:12 },
  sysBarFill: { height:"100%", borderRadius:99, transition:"width 1s ease" },
  statRow:    { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 20px", borderTop:`1px solid ${C.border}` },
  overlay:    { position:"fixed", inset:0, background:"#00000055", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 },
  modal:      { background:C.card, borderRadius:18, padding:"28px 28px 24px", width:460, maxWidth:"90vw", maxHeight:"85vh", overflowY:"auto", border:`1px solid ${C.border}`, position:"relative", boxShadow:`0 24px 60px ${C.primary}28` },
  modalX:     { position:"absolute", top:14, right:16, background:"transparent", border:"none", color:C.muted, fontSize:18, cursor:"pointer" },
  modalTitle: { fontSize:17, fontWeight:800, color:C.primary, margin:"0 0 18px" },
  formGrid:   { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" },
  modalActions:{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 },
  saveBtn:    { background:C.primary, border:"none", borderRadius:9, padding:"9px 20px", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" },
  cancelBtn:  { background:C.accent+"28", border:`1px solid ${C.accent}44`, borderRadius:9, padding:"9px 20px", color:"#b06040", fontSize:13, fontWeight:700, cursor:"pointer" },
  input:      { width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 10px", color:C.text, fontSize:13, outline:"none", boxSizing:"border-box" },
  toast:      { position:"fixed", bottom:24, right:24, borderRadius:10, padding:"11px 18px", fontSize:13, fontWeight:600, border:"1px solid", zIndex:200, color:C.text, backdropFilter:"blur(8px)" },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  @keyframes scaleIn { from { opacity:0; transform:scale(.93); }      to { opacity:1; transform:none; } }
  .card-in  { animation: fadeUp  .38s ease both; }
  .modal-in { animation: scaleIn .22s ease; }
  .toast-in { animation: fadeUp  .28s ease; }
  .table-row:hover { background: #683B2B06; }
  select, input, button { font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-thumb { background:#DED1BD; border-radius:6px; }
`;