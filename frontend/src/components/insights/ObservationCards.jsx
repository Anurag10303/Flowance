import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import { formatINR, formatMonth } from "../../utils/formatter";

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

const OBS_META = {
  best: { icon: "🏆", label: "Best month" },
  bigexp: { icon: "💸", label: "Largest expense" },
  freq: { icon: "🔁", label: "Most frequent" },
  trend: { icon: "📈", label: "Savings trend" },
  low: { icon: "🧊", label: "Most frugal" },
  conc: { icon: "📊", label: "Concentration" },
};

function build({ transactions, monthly, breakdown, dark }) {
  const obs = [];
  if (!monthly.length) return obs;
  const green = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";
  const COL = dark ? DARK : LIGHT;

  const bestIncome = [...monthly].sort((a, b) => b.income - a.income)[0];
  if (bestIncome)
    obs.push({
      id: "best",
      title: "Best income month",
      desc: `${formatMonth(bestIncome.month)} was your top month at ${formatINR(bestIncome.income)}.`,
      accent: green,
    });

  const bigExp = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];
  if (bigExp)
    obs.push({
      id: "bigexp",
      title: "Largest single expense",
      desc: `"${bigExp.description}" — ${formatINR(bigExp.amount)}.`,
      accent: red,
    });

  const cf = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      cf[t.category] = (cf[t.category] || 0) + 1;
    });
  const mf = Object.entries(cf).sort(([, a], [, b]) => b - a)[0];
  if (mf)
    obs.push({
      id: "freq",
      title: `${mf[0]} — most frequent`,
      desc: `${mf[1]} transactions — more than any other category.`,
      accent: COL[mf[0]] || "#FBBF24",
    });

  if (monthly.length >= 2) {
    const cur = monthly[monthly.length - 1],
      prev = monthly[monthly.length - 2];
    const diff = cur.income - cur.expense - (prev.income - prev.expense);
    obs.push({
      id: "trend",
      title: diff >= 0 ? "Savings improved" : "Savings declined",
      desc:
        diff >= 0
          ? `Saved ${formatINR(Math.abs(diff))} more in ${formatMonth(cur.month)}.`
          : `Saved ${formatINR(Math.abs(diff))} less in ${formatMonth(cur.month)}.`,
      accent: diff >= 0 ? green : red,
    });
  }

  const low = [...monthly].sort((a, b) => a.expense - b.expense)[0];
  if (low && monthly.length > 1)
    obs.push({
      id: "low",
      title: "Most frugal month",
      desc: `${formatMonth(low.month)} — lowest expenses at ${formatINR(low.expense)}.`,
      accent: "#818CF8",
    });

  if (breakdown.length >= 2)
    obs.push({
      id: "conc",
      title: "Spending concentration",
      desc: `${breakdown[0].category} + ${breakdown[1].category} = ${breakdown[0].pct + breakdown[1].pct}% of total expenses.`,
      accent: "#FBBF24",
    });

  return obs;
}

export default function ObservationCards() {
  const { transactions, getMonthlySummary, getCategoryBreakdown } =
    useFinanceStore();
  const { dark } = useTheme();
  const monthly = getMonthlySummary();
  const breakdown = getCategoryBreakdown();
  const obs = build({ transactions, monthly, breakdown, dark });

  if (!obs.length)
    return (
      <div style={{ color: "var(--text3)", fontSize: 13, padding: "20px 0" }}>
        Add more transactions to generate insights.
      </div>
    );

  return (
    <div>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.9px",
            fontWeight: 500,
          }}
        >
          Observations
        </div>
        <div
          style={{ flex: 1, height: "0.5px", background: "var(--border)" }}
        />
        <div
          style={{
            fontSize: 11,
            color: "var(--text3)",
            background: "var(--card)",
            border: "0.5px solid var(--border)",
            borderRadius: 100,
            padding: "2px 10px",
          }}
        >
          {obs.length} insights
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 12,
        }}
      >
        {obs.map((o, i) => {
          const meta = OBS_META[o.id] || { icon: "💡", label: "Insight" };
          return (
            <div
              key={o.id}
              className={`animate-fade-up stagger-${(i % 4) + 1}`}
              style={{
                background: "var(--card)",
                border: "0.5px solid var(--border)",
                borderRadius: 14,
                padding: "18px 20px",
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "var(--shadow)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = o.accent + "55";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `var(--shadow-lg), 0 0 20px ${o.accent}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow)";
              }}
            >
              {/* Accent glow */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: o.accent,
                  opacity: 0.08,
                  filter: "blur(16px)",
                  pointerEvents: "none",
                }}
              />

              {/* Top row: icon badge + label chip */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: o.accent + "18",
                    border: `0.5px solid ${o.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {meta.icon}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: o.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    background: o.accent + "12",
                    border: `0.5px solid ${o.accent}25`,
                    borderRadius: 100,
                    padding: "2px 8px",
                  }}
                >
                  {meta.label}
                </div>
              </div>

              {/* Title + left accent bar */}
              <div style={{ display: "flex", gap: 10 }}>
                <div
                  style={{
                    width: 3,
                    borderRadius: 2,
                    background: o.accent,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    opacity: 0.7,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: 5,
                    }}
                  >
                    {o.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text2)",
                      lineHeight: 1.65,
                    }}
                  >
                    {o.desc}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
