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
import { getMonthLabel, formatINR } from "../../utils/formatter";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#161C2E",
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12,
      }}
    >
      <div
        style={{
          color: "rgba(232,234,240,0.4)",
          marginBottom: 8,
          fontWeight: 500,
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
            gap: 24,
            color: p.name === "income" ? "#6EE7B7" : "#F87171",
            marginBottom: 3,
          }}
        >
          <span style={{ textTransform: "capitalize" }}>{p.name}</span>
          <span style={{ fontWeight: 500 }}>{formatINR(p.value)}</span>
        </div>
      ))}
      {payload.length === 2 && (
        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            marginTop: 6,
            paddingTop: 6,
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            color:
              payload[0].value - payload[1].value >= 0 ? "#6EE7B7" : "#F87171",
          }}
        >
          <span>Net</span>
          <span style={{ fontWeight: 500 }}>
            {formatINR(payload[0].value - payload[1].value)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MonthlyComparisonChart() {
  const data = useFinanceStore()
    .getMonthlySummary()
    .map(({ month, income, expense }) => ({
      label: getMonthLabel(month),
      income,
      expense,
    }));

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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
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
          Monthly income vs expenses
        </span>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            { color: "#6EE7B7", label: "Income" },
            { color: "#F87171", label: "Expenses" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: color,
                }}
              />
              <span style={{ fontSize: 11, color: "rgba(232,234,240,0.35)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          barCategoryGap="30%"
          barGap={4}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{
              fontSize: 11,
              fill: "rgba(232,234,240,0.3)",
              fontFamily: "DM Sans",
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: 11,
              fill: "rgba(232,234,240,0.3)",
              fontFamily: "DM Sans",
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey="income"
            fill="#6EE7B7"
            opacity={0.8}
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#F87171"
            opacity={0.8}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
