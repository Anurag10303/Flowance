import { useNavigate } from "react-router-dom";
import useFinanceStore from "../../store/useFinanceStore";
import CategoryBadge from "../ui/CategoryBadge";
import EmptyState from "../ui/EmptyState";
import { formatINR, formatDate } from "../../utils/formatter";

export default function RecentTransactions() {
  const { transactions } = useFinanceStore();
  const navigate = useNavigate();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div
      style={{
        background: "#0D1120",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(232,234,240,0.35)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          Recent transactions
        </span>
        <button
          onClick={() => navigate("/transactions")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 12,
            color: "#6EE7B7",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          See all →
        </button>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          message="Add your first transaction to get started."
        />
      ) : (
        <div>
          {recent.map((txn, i) => (
            <div
              key={txn.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "9px 0",
                borderBottom:
                  i < recent.length - 1
                    ? "0.5px solid rgba(255,255,255,0.04)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  background:
                    txn.type === "income"
                      ? "rgba(110,231,183,0.1)"
                      : "rgba(248,113,113,0.1)",
                  color: txn.type === "income" ? "#6EE7B7" : "#F87171",
                }}
              >
                {txn.type === "income" ? "↑" : "↓"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#E8EAF0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {txn.description}
                </div>
                <div style={{ marginTop: 2 }}>
                  <CategoryBadge category={txn.category} />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: txn.type === "income" ? "#6EE7B7" : "#F87171",
                  }}
                >
                  {txn.type === "income" ? "+" : "−"}
                  {formatINR(txn.amount)}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(232,234,240,0.25)",
                    marginTop: 2,
                  }}
                >
                  {formatDate(txn.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
