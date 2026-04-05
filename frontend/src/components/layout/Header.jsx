import { useLocation } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";
import { exportToCSV } from "../../utils/exportCSV";
import { useTheme } from "../../context/ThemeContext";

const TITLES = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export default function Header() {
  const location = useLocation();
  const { filters, setFilter, role, getFilteredTransactions } =
    useFinanceStore();
  const { dark } = useTheme();

  const bdr = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const bg = dark ? "#080B14" : "#F8F7F4";
  const txt = dark ? "#F0EEE8" : "#111";
  const muted = dark ? "rgba(240,238,232,0.4)" : "#888";
  const inp = dark ? "#0D1120" : "#fff";
  const accent = dark ? "#6EE7B7" : "#059669";

  return (
    <header
      style={{
        padding: "0 24px",
        height: 56,
        borderBottom: `0.5px solid ${bdr}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: bg,
        flexShrink: 0,
        gap: 12,
        transition: "background 0.3s",
      }}
    >
      <span
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 17,
          color: txt,
          letterSpacing: "-0.3px",
          whiteSpace: "nowrap",
        }}
      >
        {TITLES[location.pathname] || "Flowance"}
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {location.pathname === "/transactions" && (
          <div style={{ position: "relative" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: muted,
                pointerEvents: "none",
              }}
            >
              <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M9.5 9.5L12 12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <input
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              placeholder="Search..."
              style={{
                background: inp,
                border: `0.5px solid ${bdr}`,
                borderRadius: 9,
                padding: "7px 12px 7px 30px",
                fontSize: 13,
                color: txt,
                fontFamily: "DM Sans, sans-serif",
                width: 180,
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = accent;
                e.target.style.boxShadow = `0 0 0 3px ${dark ? "rgba(110,231,183,0.1)" : "rgba(5,150,105,0.1)"}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = bdr;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        )}

        {role === "admin" && (
          <button
            onClick={() => exportToCSV(getFilteredTransactions())}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: `0.5px solid ${bdr}`,
              borderRadius: 9,
              padding: "6px 12px",
              fontSize: 12,
              color: muted,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = dark
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)";
              e.currentTarget.style.color = txt;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = bdr;
              e.currentTarget.style.color = muted;
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M6.5 1v7M4 6l2.5 2.5L9 6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 10h11"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Export CSV
          </button>
        )}

        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: dark ? "rgba(110,231,183,0.12)" : "rgba(5,150,105,0.1)",
            border: `0.5px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 600,
            color: accent,
            flexShrink: 0,
          }}
        >
          AN
        </div>
      </div>
    </header>
  );
}
