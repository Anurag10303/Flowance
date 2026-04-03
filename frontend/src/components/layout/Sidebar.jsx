import { NavLink, useNavigate } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";

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
          d="M2 12 L5 7 L8 9 L11 4 L14 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { role, setRole } = useFinanceStore();
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: 220,
        minWidth: 220,
        background: "#0A0E1A",
        borderRight: "0.5px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        onClick={() => navigate("/")}
        style={{
          padding: "20px 20px 18px",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          Flow<span style={{ color: "#6EE7B7" }}>ance</span>
        </span>
      </div>

      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "DM Sans, sans-serif",
              color: isActive ? "#6EE7B7" : "rgba(232,234,240,0.45)",
              background: isActive ? "rgba(110,231,183,0.07)" : "transparent",
              textDecoration: "none",
              marginBottom: 2,
              transition: "all 0.15s",
            })}
          >
            <span style={{ display: "flex" }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          padding: "14px 10px",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            background: "#161C2E",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(232,234,240,0.3)",
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
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                  border:
                    role === r
                      ? "0.5px solid rgba(110,231,183,0.4)"
                      : "0.5px solid rgba(255,255,255,0.08)",
                  background:
                    role === r ? "rgba(110,231,183,0.1)" : "transparent",
                  color: role === r ? "#6EE7B7" : "rgba(232,234,240,0.35)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textTransform: "capitalize",
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
              color: "rgba(232,234,240,0.2)",
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
