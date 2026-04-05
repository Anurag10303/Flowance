import { NavLink, useNavigate } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";

const NAV = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4h12M2 8h12M2 12h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 12L5 7L8 9L11 4L14 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ onClose }) {
  const { role, setRole } = useFinanceStore();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const bg = dark ? "#0A0E1A" : "#F4F2EE";
  const bdr = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const txt = dark ? "#F0EEE8" : "#111";
  const muted = dark ? "rgba(240,238,232,0.35)" : "#888";
  const accent = dark ? "#6EE7B7" : "#059669";
  const surf = dark ? "#161C2E" : "#E8E6E0";

  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        background: bg,
        borderRight: `0.5px solid ${bdr}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: "background 0.3s",
      }}
    >
      {/* Logo row — includes close button on mobile */}
      <div
        style={{
          padding: "20px 20px 18px",
          borderBottom: `0.5px solid ${bdr}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          onClick={() => {
            navigate("/");
            onClose?.();
          }}
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: txt,
            letterSpacing: "-0.5px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Flow<span style={{ color: accent }}>ance</span>
        </span>

        {/* Close button — only visible on mobile (via CSS class) */}
        {onClose && (
          <button
            onClick={onClose}
            className="sidebar-close-btn"
            style={{
              background: "transparent",
              border: "none",
              color: muted,
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 9,
              fontSize: 13,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: isActive ? 500 : 400,
              color: isActive ? accent : muted,
              background: isActive
                ? dark
                  ? "rgba(110,231,183,0.08)"
                  : "rgba(5,150,105,0.08)"
                : "transparent",
              textDecoration: "none",
              marginBottom: 2,
              transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
              borderLeft: isActive
                ? `2px solid ${accent}`
                : "2px solid transparent",
            })}
          >
            <span style={{ display: "flex" }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div
        style={{
          padding: "12px 10px",
          borderTop: `0.5px solid ${bdr}`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            padding: "9px 12px",
            borderRadius: 9,
            fontSize: 13,
            fontFamily: "DM Sans, sans-serif",
            background: "transparent",
            border: "none",
            color: muted,
            cursor: "pointer",
            transition: "all 0.15s",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = surf;
            e.currentTarget.style.color = txt;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = muted;
          }}
        >
          <span style={{ fontSize: 16 }}>{dark ? "☀️" : "🌙"}</span>
          {dark ? "Light mode" : "Dark mode"}
        </button>

        {/* Role switcher */}
        <div
          style={{ background: surf, borderRadius: 10, padding: "10px 12px" }}
        >
          <div
            style={{
              fontSize: 10,
              color: muted,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: 8,
            }}
          >
            Role
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["viewer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: "6px 0",
                  borderRadius: 7,
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                  fontWeight: role === r ? 500 : 400,
                  border:
                    role === r
                      ? `0.5px solid ${dark ? "rgba(110,231,183,0.4)" : "rgba(5,150,105,0.4)"}`
                      : "0.5px solid transparent",
                  background:
                    role === r
                      ? dark
                        ? "rgba(110,231,183,0.1)"
                        : "rgba(5,150,105,0.1)"
                      : "transparent",
                  color: role === r ? accent : muted,
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              color: muted,
              lineHeight: 1.4,
            }}
          >
            {role === "admin" ? "Can add, edit & delete" : "Read-only access"}
          </div>
        </div>
      </div>
    </aside>
  );
}
