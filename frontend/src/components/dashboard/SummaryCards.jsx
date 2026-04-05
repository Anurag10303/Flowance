import { useEffect, useRef, useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const diff = value - from;
    const duration = 700;
    const start = performance.now();
    const frame = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + diff * ease));
      if (p < 1) requestAnimationFrame(frame);
      else prev.current = value;
    };
    requestAnimationFrame(frame);
  }, [value]);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(display);
}

function Card({ label, value, sub, accent, icon, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`animate-fade-up stagger-${delay} summary-card`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `0.5px solid ${hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 14,
        padding: "20px 22px",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 20, opacity: 0.5 }}>{icon}</span>
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: accent || "var(--text)",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        <AnimatedNumber value={value} />
      </div>
      {sub && <div style={{ fontSize: 12, color: "var(--text3)" }}>{sub}</div>}
    </div>
  );
}

export default function SummaryCards() {
  const { getSummary, getMonthlySummary } = useFinanceStore();
  const { dark } = useTheme();
  const { balance, income, expense } = getSummary();
  const monthly = getMonthlySummary();
  const cur = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
  const expChange =
    prev && prev.expense > 0
      ? Math.round(((cur?.expense - prev.expense) / prev.expense) * 100)
      : null;

  return (
    <div className="summary-cards-grid">
      <Card
        label="Total balance"
        value={balance}
        sub={`Savings rate: ${savingsRate}%`}
        icon="◈"
        delay={1}
      />
      <Card
        label="Total income"
        value={income}
        sub={`${monthly.length} months tracked`}
        accent={dark ? "#6EE7B7" : "#059669"}
        icon="↑"
        delay={2}
      />
      <Card
        label="Total expenses"
        value={expense}
        sub={
          expChange !== null
            ? expChange > 0
              ? `↑ ${expChange}% vs last month`
              : `↓ ${Math.abs(expChange)}% vs last month`
            : "Across all categories"
        }
        accent={dark ? "#F87171" : "#DC2626"}
        icon="↓"
        delay={3}
      />
    </div>
  );
}
