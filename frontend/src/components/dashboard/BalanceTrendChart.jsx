import {
  AreaChart,
  Area,
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
      <div style={{ color: "rgba(232,234,240,0.4)", marginBottom: 6 }}>
        {label}
      </div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name === "net"
            ? "Net"
            : p.name === "income"
              ? "Income"
              : "Expenses"}
          : {formatINR(p.value)}
        </div>
      ))}
    </div>
  );
}

export default function BalanceTrendChart() {
  const { getMonthlySummary } = useFinanceStore();
  const data = getMonthlySummary().map(({ month, income, expense }) => ({
    label: getMonthLabel(month),
    income,
    expense,
    net: income - expense,
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
          marginBottom: 18,
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
          Balance trend
        </span>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            { color: "#6EE7B7", label: "Income" },
            { color: "#F87171", label: "Expenses" },
            { color: "#818CF8", label: "Net" },
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
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            {[
              ["gIncome", "#6EE7B7"],
              ["gExpense", "#F87171"],
              ["gNet", "#818CF8"],
            ].map(([id, color]) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
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
            cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#6EE7B7"
            strokeWidth={1.5}
            fill="url(#gIncome)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#F87171"
            strokeWidth={1.5}
            fill="url(#gExpense)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="net"
            stroke="#818CF8"
            strokeWidth={1.5}
            fill="url(#gNet)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
