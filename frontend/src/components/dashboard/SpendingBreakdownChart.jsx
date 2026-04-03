import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useFinanceStore from "../../store/useFinanceStore";
import { formatINR } from "../../utils/formatter";
import { CATEGORY_COLORS } from "../../data/mockTransaction";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "#161C2E",
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
      }}
    >
      <div style={{ color: "#E8EAF0", marginBottom: 2 }}>{d.category}</div>
      <div style={{ color: "rgba(232,234,240,0.5)" }}>
        {formatINR(d.amount)} · {d.pct}%
      </div>
    </div>
  );
}

export default function SpendingBreakdownChart() {
  const { getCategoryBreakdown } = useFinanceStore();
  const top5 = getCategoryBreakdown().slice(0, 5);
  const getColor = (cat) => CATEGORY_COLORS[cat]?.text || "#888";

  if (!top5.length)
    return (
      <div
        style={{
          background: "#0D1120",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
        }}
      >
        <span style={{ color: "rgba(232,234,240,0.25)", fontSize: 13 }}>
          No expense data
        </span>
      </div>
    );

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
          marginBottom: 16,
        }}
      >
        Spending breakdown
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={top5}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={50}
                dataKey="amount"
                strokeWidth={0}
                paddingAngle={2}
              >
                {top5.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={getColor(entry.category)}
                    opacity={0.85}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}
        >
          {top5.map((item) => (
            <div
              key={item.category}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  flexShrink: 0,
                  background: getColor(item.category),
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(232,234,240,0.6)",
                  flex: 1,
                }}
              >
                {item.category}
              </span>
              <span style={{ fontSize: 12, color: "rgba(232,234,240,0.3)" }}>
                {item.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
