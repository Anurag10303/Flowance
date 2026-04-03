import useFinanceStore from "../../store/useFinanceStore";
import { formatINR } from "../../utils/formatter";
import { CATEGORY_COLORS } from "../../data/mockTransaction";

function KpiCard({ label, value, sub, accent, highlight }) {
  return (
    <div
      style={{
        background: "#0D1120",
        border: `0.5px solid ${highlight ? "rgba(110,231,183,0.2)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12,
        padding: "18px 20px",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = highlight
          ? "rgba(110,231,183,0.35)"
          : "rgba(255,255,255,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = highlight
          ? "rgba(110,231,183,0.2)"
          : "rgba(255,255,255,0.08)")
      }
    >
      <div
        style={{
          fontSize: 11,
          color: "rgba(232,234,240,0.35)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: accent || "#fff",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(232,234,240,0.35)",
          lineHeight: 1.5,
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
  const { income, expense } = getSummary();
  const monthly = getMonthlySummary();
  const topCat = getTopSpendingCategory();
  const savingsRate =
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
  const cur = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const expenseChange =
    prev && prev.expense > 0
      ? Math.round(((cur?.expense - prev.expense) / prev.expense) * 100)
      : null;
  const topColor = topCat
    ? CATEGORY_COLORS[topCat.category]?.text || "#6EE7B7"
    : "#6EE7B7";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <KpiCard
        label="Top spending category"
        value={topCat?.category || "—"}
        sub={
          topCat
            ? `${formatINR(topCat.amount)} · ${topCat.pct}% of all expenses`
            : "No expense data yet"
        }
        accent={topColor}
        highlight
      />
      <KpiCard
        label="Overall savings rate"
        value={`${savingsRate}%`}
        sub={`You saved ${formatINR(income - expense)} out of ${formatINR(income)} total income`}
        accent={
          savingsRate >= 20
            ? "#6EE7B7"
            : savingsRate >= 10
              ? "#FBBF24"
              : "#F87171"
        }
      />
      <KpiCard
        label="Expense change"
        value={
          expenseChange !== null
            ? `${expenseChange > 0 ? "+" : ""}${expenseChange}%`
            : "—"
        }
        sub={
          expenseChange !== null
            ? expenseChange > 0
              ? "Expenses rose vs previous month"
              : expenseChange < 0
                ? "Expenses fell vs previous month"
                : "Same as previous month"
            : "Need 2+ months of data"
        }
        accent={
          expenseChange === null
            ? "rgba(232,234,240,0.4)"
            : expenseChange > 10
              ? "#F87171"
              : expenseChange > 0
                ? "#FBBF24"
                : "#6EE7B7"
        }
      />
    </div>
  );
}
