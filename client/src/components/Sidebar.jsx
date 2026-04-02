import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const C = {
  sidebar:  "#2C1A12",
  sidebarH: "#3D2418",
  primary:  "#683B2B",
  secondary:"#B08401",
  accent:   "#D49E8D",
  sText:    "#F5E6D3",
  sMuted:   "#C4956A",
};

const NAV_LINKS = [
  { to: "/admin",             label: "Dashboard",    icon: "⊞", end: true },
  { to: "/admin/patient",     label: "Patient",      icon: "🏥" },
  { to: "/admin/doctor",      label: "Doctor",       icon: "👨‍⚕️" },
  { to: "/admin/appointment", label: "Appointment",  icon: "📅" },
  { to: "/admin/activity",    label: "Activity Log", icon: "📋" },
  { to: "/admin/system",      label: "System",       icon: "⚙️" },
];

export default function Sidebar({ pendingAppts = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <style>{CSS}</style>
      <aside style={S.sidebar}>

        {/* Logo */}
        <div style={S.logo}>
          <div style={S.logoIcon}>✚</div>
          <div>
            <div style={S.logoText}>MEDICARE</div>
            <div style={S.logoSub}>Admin Portal</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={S.nav}>
          <div style={S.navSection}>MAIN MENU</div>

          {NAV_LINKS.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                ...S.navBtn,
                ...(isActive ? S.navOn : {}),
              })}
            >
              <span style={S.navIco}>{icon}</span>
              <span style={{ flex: 1 }}>{label}</span>
              {label === "Appointment" && pendingAppts > 0 && (
                <span style={S.navBadge}>{pendingAppts}</span>
              )}
            </NavLink>
          ))}

          {/* Quick Actions */}
          <div style={{ ...S.navSection, marginTop: 16 }}>QUICK ACTIONS</div>
          <NavLink to="/admin/patient?action=add"     style={S.navBtn}><span style={S.navIco}>➕</span>Add Patient</NavLink>
          <NavLink to="/admin/doctor?action=add"      style={S.navBtn}><span style={S.navIco}>➕</span>Add Doctor</NavLink>
          <NavLink to="/admin/appointment?action=add" style={S.navBtn}><span style={S.navIco}>📌</span>Book Appointment</NavLink>
        </nav>

        {/* Footer */}
        <div style={S.sidebarFoot}>
          <div style={S.footAv}>
            {user?.name?.slice(0, 2).toUpperCase() ?? "AD"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={S.footName}>{user?.name ?? "Admin"}</div>
            <div style={S.footRole}>Super Admin</div>
          </div>
          <button style={S.logoutBtn} title="Logout" onClick={handleLogout}>⏏</button>
        </div>

      </aside>
    </>
  );
}

const S = {
  sidebar: {
    width: 240,
    minWidth: 240,
    background: C.sidebar,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
    flexShrink: 0,
    boxShadow: "2px 0 20px rgba(0,0,0,0.15)",
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "24px 20px 20px",
    borderBottom: `1px solid ${C.sidebarH}`,
    flexShrink: 0,
  },
  logoIcon: {
    width: 38, height: 38, borderRadius: 12,
    background: C.primary, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, fontWeight: 800, flexShrink: 0,
  },
  logoText: { fontWeight: 800, letterSpacing: 3, fontSize: 14, color: C.sText },
  logoSub:  { fontSize: 10, color: C.sMuted, letterSpacing: 1 },

  nav: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 12px",
    flex: 1,
    overflowY: "auto",
    gap: 2,
  },
  navSection: {
    fontSize: 10, color: C.sMuted,
    letterSpacing: 1.5, fontWeight: 700,
    padding: "8px 8px 4px",
  },
  navBtn: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 10,
    border: "none", background: "transparent",
    color: C.sMuted, fontSize: 13, fontWeight: 500,
    cursor: "pointer", textDecoration: "none",
    transition: "all .2s", position: "relative",
    width: "100%",
  },
  navOn: {
    background: C.primary,
    color: "#fff",
    fontWeight: 700,
  },
  navIco: { fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 },
  navBadge: {
    background: C.accent, color: "#fff",
    borderRadius: 99, width: 18, height: 18,
    fontSize: 10, display: "flex",
    alignItems: "center", justifyContent: "center",
    fontWeight: 700,
  },

  sidebarFoot: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "16px",
    borderTop: `1px solid ${C.sidebarH}`,
    flexShrink: 0,
  },
  footAv: {
    width: 34, height: 34, borderRadius: 10,
    background: C.primary, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 700, flexShrink: 0,
  },
  footName: {
    fontSize: 13, fontWeight: 600, color: C.sText,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  footRole: { fontSize: 10, color: C.sMuted },
  logoutBtn: {
    background: "transparent", border: "none",
    color: C.sMuted, fontSize: 16,
    cursor: "pointer", padding: 4,
    marginLeft: "auto", flexShrink: 0,
    transition: "color .2s",
  },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  aside::-webkit-scrollbar { width: 4px; }
  aside::-webkit-scrollbar-thumb { background: #3D2418; border-radius: 4px; }
  aside a:hover:not([aria-current="page"]) { background: #3D241880 !important; color: #F5E6D3 !important; }
  aside button:hover { color: #F5E6D3 !important; }
`;