import useFinanceStore from "../../store/useFinanceStore";
import { formatINR } from "../../utils/formatter";
import { CATEGORY_COLORS } from "../../data/mockTransaction";
import EmptyState from "../ui/EmptyState";

export default function CategorySpendingBar() {
  const breakdown = useFinanceStore().getCategoryBreakdown();
  if (!breakdown.length)
    return (
      <div
        style={{
          background: "#0D1120",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "18px 20px",
        }}
      >
        <EmptyState
          title="No expense data"
          message="Add some expenses to see the breakdown."
        />
      </div>
    );

  const max = breakdown[0].amount;
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
          fontSize: 11,
          color: "rgba(232,234,240,0.35)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 18,
        }}
      >
        Expense categories
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {breakdown.map(({ category, amount, pct }) => {
          const color = CATEGORY_COLORS[category]?.text || "#888";
          return (
            <div key={category}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#E8EAF0" }}>
                    {category}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span
                    style={{ fontSize: 12, color: "rgba(232,234,240,0.35)" }}
                  >
                    {pct}%
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color }}>
                    {formatINR(amount)}
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 5,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 100,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(amount / max) * 100}%`,
                    background: color,
                    borderRadius: 100,
                    opacity: 0.7,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
