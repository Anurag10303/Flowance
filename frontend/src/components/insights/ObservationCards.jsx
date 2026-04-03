import useFinanceStore from "../../store/useFinanceStore";
import { formatINR, formatMonth } from "../../utils/formatter";
import { CATEGORY_COLORS } from "../../data/mockTransaction";

function buildObservations({ transactions, monthly, breakdown }) {
  const obs = [];
  if (!monthly.length) return obs;

  const bestIncome = [...monthly].sort((a, b) => b.income - a.income)[0];
  if (bestIncome)
    obs.push({
      id: "best-income",
      title: "Best income month",
      desc: `${formatMonth(bestIncome.month)} was your highest-earning month at ${formatINR(bestIncome.income)}.`,
      accent: "#6EE7B7",
    });

  const biggestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];
  if (biggestExpense)
    obs.push({
      id: "biggest-txn",
      title: "Largest single expense",
      desc: `"${biggestExpense.description}" was your biggest expense at ${formatINR(biggestExpense.amount)}.`,
      accent: "#F87171",
    });

  const catFreq = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      catFreq[t.category] = (catFreq[t.category] || 0) + 1;
    });
  const mostFreq = Object.entries(catFreq).sort(([, a], [, b]) => b - a)[0];
  if (mostFreq)
    obs.push({
      id: "most-freq",
      title: `${mostFreq[0]} — most frequent`,
      desc: `You made ${mostFreq[1]} ${mostFreq[0].toLowerCase()} transactions — more than any other category.`,
      accent: CATEGORY_COLORS[mostFreq[0]]?.text || "#FBBF24",
    });

  if (monthly.length >= 2) {
    const cur = monthly[monthly.length - 1],
      prev = monthly[monthly.length - 2];
    const diff = cur.income - cur.expense - (prev.income - prev.expense);
    obs.push({
      id: "savings-trend",
      title: diff >= 0 ? "Savings improved" : "Savings declined",
      desc:
        diff >= 0
          ? `You saved ${formatINR(Math.abs(diff))} more in ${formatMonth(cur.month)} than the previous month.`
          : `You saved ${formatINR(Math.abs(diff))} less in ${formatMonth(cur.month)} than the previous month.`,
      accent: diff >= 0 ? "#6EE7B7" : "#F87171",
    });
  }

  const lowestExpense = [...monthly].sort((a, b) => a.expense - b.expense)[0];
  if (lowestExpense && monthly.length > 1)
    obs.push({
      id: "lowest-spend",
      title: "Most frugal month",
      desc: `${formatMonth(lowestExpense.month)} had your lowest expenses at ${formatINR(lowestExpense.expense)} — great discipline.`,
      accent: "#818CF8",
    });

  if (breakdown.length >= 2)
    obs.push({
      id: "top2-share",
      title: "Spending concentration",
      desc: `${breakdown[0].category} and ${breakdown[1].category} together make up ${breakdown[0].pct + breakdown[1].pct}% of your total expenses.`,
      accent: "#FBBF24",
    });

  return obs;
}

export default function ObservationCards() {
  const { transactions, getMonthlySummary, getCategoryBreakdown } =
    useFinanceStore();
  const monthly = getMonthlySummary();
  const breakdown = getCategoryBreakdown();
  const observations = buildObservations({ transactions, monthly, breakdown });

  if (!observations.length)
    return (
      <div
        style={{
          color: "rgba(232,234,240,0.3)",
          fontSize: 13,
          padding: "20px 0",
        }}
      >
        Add more transactions to generate insights.
      </div>
    );

  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(232,234,240,0.35)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 12,
        }}
      >
        Observations
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {observations.map((obs) => (
          <div
            key={obs.id}
            style={{
              background: "#0D1120",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "16px 18px",
              display: "flex",
              gap: 14,
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
                width: 3,
                borderRadius: 2,
                background: obs.accent,
                flexShrink: 0,
                alignSelf: "stretch",
                opacity: 0.7,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#E8EAF0",
                  marginBottom: 5,
                }}
              >
                {obs.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(232,234,240,0.4)",
                  lineHeight: 1.6,
                }}
              >
                {obs.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
