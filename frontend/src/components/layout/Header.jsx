import { useLocation } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";
import { exportToCSV } from "../../utils/exportCSV";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export default function Header() {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "Flowance";
  const { filters, setFilter, role, getFilteredTransactions } =
    useFinanceStore();

  return (
    <header
      style={{
        padding: "0 24px",
        height: 56,
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#080B14",
        flexShrink: 0,
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 17,
          color: "#fff",
          letterSpacing: "-0.3px",
          whiteSpace: "nowrap",
        }}
      >
        {title}
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
                color: "rgba(232,234,240,0.25)",
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
              placeholder="Search transactions..."
              style={{
                background: "#0D1120",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "7px 12px 7px 30px",
                fontSize: 13,
                color: "#E8EAF0",
                fontFamily: "DM Sans, sans-serif",
                width: 200,
                outline: "none",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(110,231,183,0.4)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
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
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              color: "rgba(232,234,240,0.5)",
              fontFamily: "DM Sans, sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.color = "#E8EAF0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(232,234,240,0.5)";
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
            background: "rgba(110,231,183,0.12)",
            border: "0.5px solid rgba(110,231,183,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 500,
            color: "#6EE7B7",
            flexShrink: 0,
          }}
        >
          AN
        </div>
      </div>
    </header>
  );
}
