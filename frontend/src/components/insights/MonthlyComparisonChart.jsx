import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import { getMonthLabel, formatINR } from "../../utils/formatter";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const net = payload.length === 2 ? payload[0].value - payload[1].value : null;
  return (
    <div
      style={{
        background: "var(--card2)",
        border: "0.5px solid var(--border2)",
        borderRadius: 14,
        padding: "14px 18px",
        fontSize: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        minWidth: 160,
      }}
    >
      <div
        style={{
          color: "var(--text3)",
          marginBottom: 10,
          fontWeight: 600,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 28,
            marginBottom: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background:
                  p.name === "income" ? "var(--accent)" : "var(--red)",
                boxShadow:
                  p.name === "income"
                    ? "0 0 6px var(--accent)"
                    : "0 0 6px var(--red)",
              }}
            />
            <span
              style={{
                color: "var(--text3)",
                textTransform: "capitalize",
                fontSize: 12,
              }}
            >
              {p.name}
            </span>
          </div>
          <span
            style={{
              fontWeight: 600,
              color: p.name === "income" ? "var(--accent)" : "var(--red)",
              fontFamily: "Syne, sans-serif",
            }}
          >
            {formatINR(p.value)}
          </span>
        </div>
      ))}
      {net !== null && (
        <div
          style={{
            borderTop: "0.5px solid var(--border)",
            marginTop: 8,
            paddingTop: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 28,
          }}
        >
          <span style={{ color: "var(--text3)", fontSize: 12 }}>Net saved</span>
          <span
            style={{
              fontWeight: 700,
              color: net >= 0 ? "var(--accent)" : "var(--red)",
              fontFamily: "Syne, sans-serif",
            }}
          >
            {formatINR(Math.abs(net))}
          </span>
        </div>
      )}
    </div>
  );
}

function GradientDefs({ dark }) {
  const accentLight = dark ? "#6EE7B7" : "#059669";
  const accentDark = dark ? "#064E3B" : "#A7F3D0";
  const redLight = dark ? "#F87171" : "#DC2626";
  const redDark = dark ? "#7F1D1D" : "#FECACA";
  return (
    <defs>
      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={accentLight} stopOpacity={1} />
        <stop offset="100%" stopColor={accentDark} stopOpacity={0.6} />
      </linearGradient>
      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={redLight} stopOpacity={1} />
        <stop offset="100%" stopColor={redDark} stopOpacity={0.6} />
      </linearGradient>
      <filter id="incomeGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="expenseGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export default function MonthlyComparisonChart() {
  const { dark } = useTheme();
  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";

  const rawData = useFinanceStore().getMonthlySummary();
  const data = rawData.map(({ month, income, expense }) => ({
    label: getMonthLabel(month),
    income,
    expense,
  }));

  const savingsRates = data.map(({ income, expense }) =>
    income > 0 ? Math.round(((income - expense) / income) * 100) : 0,
  );

  return (
    <div
      style={{
        background: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: 18,
        padding: "22px 24px 18px",
        boxShadow: dark
          ? "0 4px 40px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
        alignSelf: "start", // ✅ "start" works in both grid AND flexbox (unlike "flex-start")
      }}
    >
      {dark && (
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 180,
            background: "rgba(110,231,183,0.03)",
            borderRadius: "50%",
            bottom: -60,
            right: -60,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
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
            Monthly Income vs Expenses
          </div>
          {data.length > 0 && (
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "var(--text)",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              {formatINR(data.reduce((s, d) => s + d.income, 0))}
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 400,
                  color: "var(--text3)",
                  marginLeft: 6,
                }}
              >
                total income
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-end",
          }}
        >
          {[
            { color: accent, label: "Income" },
            { color: red, label: "Expenses" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span style={{ fontSize: 11, color: "var(--text3)" }}>
                {label}
              </span>
              <div
                style={{
                  width: 24,
                  height: 4,
                  borderRadius: 2,
                  background: color,
                  boxShadow: `0 0 6px ${color}88`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={190}>
        <BarChart
          data={data}
          barCategoryGap="28%"
          barGap={5}
          margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
        >
          <GradientDefs dark={dark} />
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{
              fontSize: 11,
              fill: "var(--text3)",
              fontFamily: "DM Sans",
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text3)", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              radius: 8,
            }}
          />
          <Bar
            dataKey="income"
            fill="url(#incomeGradient)"
            radius={[6, 6, 0, 0]}
            filter="url(#incomeGlow)"
          />
          <Bar
            dataKey="expense"
            fill="url(#expenseGradient)"
            radius={[6, 6, 0, 0]}
            filter="url(#expenseGlow)"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Savings rate pills */}
      {data.length > 0 && (
        <div
          style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}
        >
          {data.map(({ label }, i) => {
            const rate = savingsRates[i];
            const positive = rate >= 0;
            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: positive
                    ? dark
                      ? "rgba(110,231,183,0.08)"
                      : "rgba(5,150,105,0.07)"
                    : dark
                      ? "rgba(248,113,113,0.08)"
                      : "rgba(220,38,38,0.07)",
                  border: `0.5px solid ${
                    positive
                      ? dark
                        ? "rgba(110,231,183,0.2)"
                        : "rgba(5,150,105,0.2)"
                      : dark
                        ? "rgba(248,113,113,0.2)"
                        : "rgba(220,38,38,0.2)"
                  }`,
                  borderRadius: 100,
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 600,
                  color: positive ? accent : red,
                }}
              >
                <span style={{ opacity: 0.6, fontWeight: 400 }}>{label}</span>
                <span>{rate}% saved</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
