import useFinanceStore from "../../store/useFinanceStore";
import { formatINR } from "../../utils/formatter";

function Card({ label, value, sub, valueColor, icon }) {
  return (
    <div
      style={{
        background: "#0D1120",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
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
          {label}
        </span>
        <span style={{ fontSize: 18, opacity: 0.6 }}>{icon}</span>
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 24,
          color: valueColor || "#fff",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{ fontSize: 12, color: "rgba(232,234,240,0.3)", marginTop: 4 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default function SummaryCards() {
  const { getSummary, getMonthlySummary } = useFinanceStore();
  const { balance, income, expense } = getSummary();
  const monthly = getMonthlySummary();
  const cur = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
  const expenseChange =
    prev && prev.expense > 0
      ? Math.round(((cur?.expense - prev.expense) / prev.expense) * 100)
      : null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <Card
        label="Total balance"
        value={formatINR(balance)}
        sub={`Savings rate: ${savingsRate}%`}
        icon="◈"
      />
      <Card
        label="Total income"
        value={formatINR(income)}
        valueColor="#6EE7B7"
        sub={`${monthly.length} months tracked`}
        icon="↑"
      />
      <Card
        label="Total expenses"
        value={formatINR(expense)}
        valueColor="#F87171"
        sub={
          expenseChange !== null
            ? expenseChange > 0
              ? `↑ ${expenseChange}% vs last month`
              : `↓ ${Math.abs(expenseChange)}% vs last month`
            : "Across all categories"
        }
        icon="↓"
      />
    </div>
  );
}
