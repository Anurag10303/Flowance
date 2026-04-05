import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import { formatINR } from "../../utils/formatter";

const DARK_COLORS = {
  Food: "#FBBF24",
  Housing: "#818CF8",
  Travel: "#38BDF8",
  Shopping: "#F87171",
  Healthcare: "#34D399",
  Entertainment: "#A78BFA",
  Education: "#FB923C",
  Utilities: "#9CA3AF",
  Income: "#6EE7B7",
};
const LIGHT_COLORS = {
  Food: "#D97706",
  Housing: "#4338CA",
  Travel: "#0284C7",
  Shopping: "#DC2626",
  Healthcare: "#059669",
  Entertainment: "#7C3AED",
  Education: "#C2410C",
  Utilities: "#4B5563",
  Income: "#065F46",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      style={{
        background: "var(--card2)",
        border: "0.5px solid var(--border2)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ color: "var(--text)", marginBottom: 3, fontWeight: 600 }}>
        {d.category}
      </div>
      <div style={{ color: "var(--text3)" }}>
        {formatINR(d.amount)} ·{" "}
        <span style={{ color: "var(--text2)" }}>{d.pct}%</span>
      </div>
    </div>
  );
}

export default function SpendingBreakdownChart() {
  const { getCategoryBreakdown } = useFinanceStore();
  const { dark } = useTheme();
  const COLORS = dark ? DARK_COLORS : LIGHT_COLORS;
  const [hovered, setHovered] = useState(null);
  const top5 = getCategoryBreakdown().slice(0, 5);
  const total = top5.reduce((s, d) => s + d.amount, 0);

  if (!top5.length)
    return (
      <div
        style={{
          background: "var(--card)",
          border: "0.5px solid var(--border)",
          borderRadius: 18,
          padding: "22px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
        }}
      >
        <span style={{ color: "var(--text3)", fontSize: 13 }}>
          No expense data
        </span>
      </div>
    );

  return (
    <div
      style={{
        background: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: 18,
        padding: "22px 24px",
        boxShadow: dark
          ? "0 4px 40px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.9px",
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Spending breakdown
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--text)",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {formatINR(total)}
          <span
            style={{
              fontSize: 12,
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 400,
              color: "var(--text3)",
              marginLeft: 6,
            }}
          >
            top 5 categories
          </span>
        </div>
      </div>

      {/* Donut chart */}
      <div style={{ position: "relative", width: "100%", height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={top5}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={68}
              dataKey="amount"
              strokeWidth={0}
              paddingAngle={3}
              onMouseEnter={(_, i) => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {top5.map((e, i) => (
                <Cell
                  key={e.category}
                  fill={COLORS[e.category] || "#888"}
                  opacity={hovered === null || hovered === i ? 1 : 0.35}
                  style={{ transition: "opacity 0.2s", cursor: "pointer" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {hovered !== null ? (
            <>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: COLORS[top5[hovered]?.category] || "var(--text)",
                  lineHeight: 1.1,
                }}
              >
                {top5[hovered]?.pct}%
              </div>
              <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 1 }}>
                {top5[hovered]?.category}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.1,
                }}
              >
                {top5.length}
              </div>
              <div style={{ fontSize: 9, color: "var(--text3)", marginTop: 1 }}>
                categories
              </div>
            </>
          )}
        </div>
      </div>

      {/* Legend rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 14,
        }}
      >
        {top5.map((item, i) => {
          const color = COLORS[item.category] || "#888";
          const isHov = hovered === i;
          return (
            <div
              key={item.category}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 8px",
                borderRadius: 8,
                background: isHov
                  ? dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)"
                  : "transparent",
                transition: "background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 3,
                  background: color,
                  flexShrink: 0,
                  boxShadow: isHov ? `0 0 7px ${color}` : "none",
                  transition: "box-shadow 0.2s",
                }}
              />
              <span style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>
                {item.category}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text3)",
                  background: "var(--bg3)",
                  padding: "1px 7px",
                  borderRadius: 100,
                }}
              >
                {item.pct}%
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color,
                  fontFamily: "Syne, sans-serif",
                  minWidth: 60,
                  textAlign: "right",
                }}
              >
                {formatINR(item.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
