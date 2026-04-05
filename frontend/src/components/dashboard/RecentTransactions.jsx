import { useNavigate } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import CategoryBadge from "../ui/CategoryBadge";
import EmptyState from "../ui/EmptyState";
import { formatINR, formatDate } from "../../utils/formatter";

export default function RecentTransactions() {
  const { transactions } = useFinanceStore();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";

  return (
    <div
      style={{
        background: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: dark
          ? "0 4px 40px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px 14px",
          borderBottom: "0.5px solid var(--border)",
          background: "var(--card2)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text3)",
              textTransform: "uppercase",
              letterSpacing: "0.9px",
              fontWeight: 500,
              marginBottom: 2,
            }}
          >
            Recent transactions
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>
            Last {recent.length} entries
          </div>
        </div>
        <button
          onClick={() => navigate("/transactions")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: dark
              ? "rgba(110,231,183,0.08)"
              : "rgba(5,150,105,0.07)",
            border: `0.5px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.2)"}`,
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 12,
            color: accent,
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View all
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6h7M6.5 3l3 3-3 3"
              stroke={accent}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Column headers */}
      {recent.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
            padding: "8px 22px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          {["Description", "Category", "Date", "Amount"].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 10,
                color: "var(--text3)",
                textTransform: "uppercase",
                letterSpacing: "0.7px",
              }}
            >
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Rows */}
      {recent.length === 0 ? (
        <div style={{ padding: "24px 22px" }}>
          <EmptyState
            title="No transactions yet"
            message="Add your first transaction to get started."
          />
        </div>
      ) : (
        recent.map((txn, i) => (
          <div
            key={txn.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              padding: "12px 22px",
              alignItems: "center",
              borderBottom:
                i < recent.length - 1 ? "0.5px solid var(--border)" : "none",
              transition: "background 0.15s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--card2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {/* Description */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  background:
                    txn.type === "income"
                      ? "var(--accent-bg)"
                      : "var(--red-bg)",
                  color: txn.type === "income" ? accent : red,
                  boxShadow:
                    txn.type === "income"
                      ? `0 0 12px ${accent}22`
                      : `0 0 12px ${red}22`,
                }}
              >
                {txn.type === "income" ? "↑" : "↓"}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 500,
                }}
              >
                {txn.description}
              </span>
            </div>

            {/* Category */}
            <div>
              <CategoryBadge category={txn.category} />
            </div>

            {/* Date */}
            <div style={{ fontSize: 12, color: "var(--text3)" }}>
              {formatDate(txn.date)}
            </div>

            {/* Amount */}
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: txn.type === "income" ? accent : red,
                fontFamily: "Syne, sans-serif",
              }}
            >
              {txn.type === "income" ? "+" : "−"}
              {formatINR(txn.amount)}
            </div>
          </div>
        ))
      )}

      {/* Footer */}
      {recent.length > 0 && (
        <div
          style={{
            padding: "12px 22px",
            borderTop: "0.5px solid var(--border)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate("/transactions")}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 12,
              color: "var(--text3)",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
          >
            View all transactions →
          </button>
        </div>
      )}
    </div>
  );
}
