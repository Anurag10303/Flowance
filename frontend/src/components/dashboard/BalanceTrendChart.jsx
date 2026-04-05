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
import { useTheme } from "../../context/ThemeContext";
import { getMonthLabel, formatINR } from "../../utils/formatter";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--card2)",
        border: "0.5px solid var(--border2)",
        borderRadius: 14,
        padding: "12px 16px",
        fontSize: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        minWidth: 150,
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
      {payload.map((p) => {
        const name =
          p.name === "net"
            ? "Net"
            : p.name === "income"
              ? "Income"
              : "Expenses";
        return (
          <div
            key={p.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              marginBottom: 5,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 2,
                  background: p.color,
                  boxShadow: `0 0 5px ${p.color}`,
                }}
              />
              <span style={{ color: "var(--text3)", fontSize: 12 }}>
                {name}
              </span>
            </div>
            <span
              style={{
                fontWeight: 600,
                color: p.color,
                fontFamily: "Syne, sans-serif",
                fontSize: 12,
              }}
            >
              {formatINR(p.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function BalanceTrendChart() {
  const { getMonthlySummary } = useFinanceStore();
  const { dark } = useTheme();
  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";
  const purple = dark ? "#A78BFA" : "#7C3AED";

  const data = getMonthlySummary().map(({ month, income, expense }) => ({
    label: getMonthLabel(month),
    income,
    expense,
    net: income - expense,
  }));

  const totalNet = data.reduce((s, d) => s + d.net, 0);

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
      }}
    >
      {/* Background glow */}
      {dark && (
        <div
          style={{
            position: "absolute",
            width: 250,
            height: 150,
            background: "rgba(167,139,250,0.04)",
            borderRadius: "50%",
            bottom: -40,
            right: -40,
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
            Balance trend
          </div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: totalNet >= 0 ? accent : red,
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            {totalNet >= 0 ? "+" : "−"}
            {formatINR(Math.abs(totalNet))}
            <span
              style={{
                fontSize: 12,
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
                color: "var(--text3)",
                marginLeft: 6,
              }}
            >
              net saved
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {[
            { color: accent, label: "Income" },
            { color: red, label: "Expenses" },
            { color: purple, label: "Net" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 20,
                  height: 3,
                  borderRadius: 2,
                  background: color,
                  boxShadow: `0 0 5px ${color}88`,
                }}
              />
              <span style={{ fontSize: 11, color: "var(--text3)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={175}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            {[
              ["g1", accent],
              ["g2", red],
              ["g3", purple],
            ].map(([id, color]) => (
              <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color}
                  stopOpacity={dark ? 0.2 : 0.12}
                />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--text3)", fontFamily: "DM Sans" }}
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
              stroke: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
              strokeWidth: 1,
            }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke={accent}
            strokeWidth={2}
            fill="url(#g1)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke={red}
            strokeWidth={2}
            fill="url(#g2)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="net"
            stroke={purple}
            strokeWidth={2}
            fill="url(#g3)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
