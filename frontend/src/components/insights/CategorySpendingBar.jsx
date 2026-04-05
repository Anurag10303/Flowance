import { useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import { formatINR } from "../../utils/formatter";
import EmptyState from "../ui/EmptyState";

const DARK = {
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
const LIGHT = {
  Food: "#92690A",
  Housing: "#4338CA",
  Travel: "#0369A1",
  Shopping: "#B91C1C",
  Healthcare: "#065F46",
  Entertainment: "#6D28D9",
  Education: "#C2410C",
  Utilities: "#374151",
  Income: "#065F46",
};

export default function CategorySpendingBar() {
  const { dark } = useTheme();
  const breakdown = useFinanceStore().getCategoryBreakdown();
  const COLORS = dark ? DARK : LIGHT;
  const [hovered, setHovered] = useState(null);

  if (!breakdown.length)
    return (
      <div
        style={{
          background: "var(--card)",
          border: "0.5px solid var(--border)",
          borderRadius: 16,
          padding: "18px 20px",
          boxShadow: "var(--shadow)",
        }}
      >
        <EmptyState
          title="No expense data"
          message="Add some expenses to see the breakdown."
        />
      </div>
    );

  const max = breakdown[0].amount;
  const total = breakdown.reduce((s, d) => s + d.amount, 0);

  return (
    <div
      style={{
        background: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: 16,
        padding: "20px 22px",
        boxShadow: "var(--shadow)",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      {dark && (
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 120,
            background: "rgba(129,140,248,0.04)",
            borderRadius: "50%",
            bottom: -30,
            right: -30,
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color: "var(--text3)",
              textTransform: "uppercase",
              letterSpacing: "0.9px",
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            Expense categories
          </div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "var(--text)",
              letterSpacing: "-0.3px",
              lineHeight: 1,
            }}
          >
            {formatINR(total)}
            <span
              style={{
                fontSize: 11,
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
                color: "var(--text3)",
                marginLeft: 6,
              }}
            >
              total spent
            </span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)" }}>
          {breakdown.length} categories
        </div>
      </div>

      {/* Stacked mini bar */}
      <div
        style={{
          display: "flex",
          height: 6,
          borderRadius: 100,
          overflow: "hidden",
          marginBottom: 20,
          gap: 1,
        }}
      >
        {breakdown.map(({ category, pct }) => {
          const color = COLORS[category] || "#888";
          return (
            <div
              key={category}
              style={{
                flex: pct,
                background: color,
                opacity:
                  hovered === null ? 0.85 : hovered === category ? 1 : 0.3,
                transition: "opacity 0.2s",
                minWidth: pct > 0 ? 1 : 0,
              }}
            />
          );
        })}
      </div>

      {/* Row list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {breakdown.map(({ category, amount, pct }) => {
          const color = COLORS[category] || "#888";
          const isHov = hovered === category;
          return (
            <div
              key={category}
              onMouseEnter={() => setHovered(category)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 10,
                padding: "10px 12px",
                background: isHov
                  ? dark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.025)"
                  : "transparent",
                transition: "background 0.15s",
                cursor: "default",
              }}
            >
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 7,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Color dot with glow on hover */}
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: color,
                      flexShrink: 0,
                      boxShadow: isHov ? `0 0 8px ${color}88` : "none",
                      transition: "box-shadow 0.2s",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: isHov ? "var(--text)" : "var(--text)",
                      fontWeight: isHov ? 500 : 400,
                      transition: "font-weight 0.15s",
                    }}
                  >
                    {category}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text3)",
                      background: "var(--bg3)",
                      padding: "2px 7px",
                      borderRadius: 100,
                    }}
                  >
                    {pct}%
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {formatINR(amount)}
                  </span>
                </div>
              </div>

              {/* Progress bar — thicker on hover */}
              <div
                style={{
                  height: isHov ? 7 : 5,
                  background: "var(--bg3)",
                  borderRadius: 100,
                  overflow: "hidden",
                  transition: "height 0.2s",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(amount / max) * 100}%`,
                    background: `linear-gradient(to right, ${color}99, ${color})`,
                    borderRadius: 100,
                    boxShadow: isHov ? `0 0 8px ${color}60` : "none",
                    transition:
                      "width 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s",
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
