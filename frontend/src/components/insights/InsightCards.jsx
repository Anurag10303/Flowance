import { useState } from "react";
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

/* Micro sparkline SVG */
function Sparkline({ color, up }) {
  const pts = up
    ? "0,28 10,22 20,25 30,16 40,18 50,10 60,6 70,2"
    : "0,2 10,8 20,5 30,14 40,12 50,20 60,22 70,28";
  return (
    <svg
      width="72"
      height="30"
      viewBox="0 0 72 30"
      style={{ display: "block" }}
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
      <polyline
        points={`0,30 ${pts} 70,30`}
        fill={color}
        opacity={0.08}
        stroke="none"
      />
    </svg>
  );
}

function KpiCard({ label, value, sub, accent, highlight, delay, trend }) {
  const [hov, setHov] = useState(false);
  const { dark } = useTheme();
  return (
    <div
      className={`animate-fade-up stagger-${delay}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `0.5px solid ${highlight ? accent : hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "22px 24px",
        transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov
          ? `var(--shadow-lg), 0 0 0 1px ${accent}22`
          : highlight
            ? `var(--shadow), 0 0 24px ${accent}18`
            : "var(--shadow)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob top-right */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: accent,
          opacity: 0.07,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        {trend !== undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              fontWeight: 600,
              color: trend ? "#34D399" : "#F87171",
              background: trend
                ? "rgba(52,211,153,0.1)"
                : "rgba(248,113,113,0.1)",
              padding: "3px 8px",
              borderRadius: 100,
            }}
          >
            {trend ? "▲" : "▼"} {trend ? "Up" : "Down"}
          </div>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(22px,2.5vw,30px)",
          color: accent,
          letterSpacing: "-0.5px",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {value}
      </div>

      {/* Sparkline */}
      {trend !== undefined && (
        <div style={{ marginBottom: 8 }}>
          <Sparkline color={accent} up={trend} />
        </div>
      )}

      {/* Sub */}
      <div
        style={{
          fontSize: 12,
          color: "var(--text2)",
          lineHeight: 1.55,
          borderTop: "0.5px solid var(--border)",
          paddingTop: 10,
          marginTop: 2,
        }}
      >
        {sub}
      </div>
    </div>
  );
}

export default function InsightCards() {
  const { getSummary, getMonthlySummary, getTopSpendingCategory } =
    useFinanceStore();
  const { dark } = useTheme();
  const { income, expense } = getSummary();
  const monthly = getMonthlySummary();
  const topCat = getTopSpendingCategory();
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
  const cur = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const expChange =
    prev && prev.expense > 0
      ? Math.round(((cur?.expense - prev.expense) / prev.expense) * 100)
      : null;

  const COLORS = dark ? DARK_COLORS : LIGHT_COLORS;
  const topColor = topCat
    ? COLORS[topCat.category] || "var(--accent)"
    : "var(--accent)";
  const accentGreen = dark ? "#6EE7B7" : "#059669";
  const accentRed = dark ? "#F87171" : "#DC2626";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 14,
        marginBottom: 16,
      }}
    >
      <KpiCard
        label="Top spending"
        value={topCat?.category || "—"}
        sub={
          topCat
            ? `${formatINR(topCat.amount)} · ${topCat.pct}% of total expenses`
            : "No expense data"
        }
        accent={topColor}
        highlight
        delay={1}
      />
      <KpiCard
        label="Savings rate"
        value={`${savingsRate}%`}
        sub={`Saved ${formatINR(income - expense)} of ${formatINR(income)}`}
        accent={
          savingsRate >= 20
            ? accentGreen
            : savingsRate >= 10
              ? "#FBBF24"
              : accentRed
        }
        trend={savingsRate >= 20}
        delay={2}
      />
      <KpiCard
        label="Expense change"
        value={
          expChange !== null ? `${expChange > 0 ? "+" : ""}${expChange}%` : "—"
        }
        sub={
          expChange !== null
            ? expChange > 0
              ? "Rose vs previous month"
              : expChange < 0
                ? "Fell vs previous month"
                : "Same as last month"
            : "Need 2+ months of data"
        }
        accent={
          expChange === null
            ? "var(--text2)"
            : expChange > 10
              ? accentRed
              : expChange > 0
                ? "#FBBF24"
                : accentGreen
        }
        trend={expChange !== null ? expChange <= 0 : undefined}
        delay={3}
      />
    </div>
  );
}
