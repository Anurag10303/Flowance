import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "../components/dashboard/SpendingBreakdownChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import useFinanceStore from "../store/useFinanceStore";
import { useTheme } from "../context/ThemeContext";
import { formatINR } from "../utils/formatter";

function GreetingBanner() {
  const { dark } = useTheme();
  const { transactions, getMonthlySummary } = useFinanceStore();
  const monthly = getMonthlySummary();
  const accent = dark ? "#6EE7B7" : "#059669";

  const totalIncome = monthly.reduce((s, m) => s + m.income, 0);
  const totalExpense = monthly.reduce((s, m) => s + m.expense, 0);
  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        padding: "28px 32px",
        background: dark
          ? "linear-gradient(135deg, #0d1f17 0%, #0a1628 60%, #111827 100%)"
          : "linear-gradient(135deg, #ecfdf5 0%, #eff6ff 60%, #f0fdf4 100%)",
        border: `0.5px solid ${dark ? "rgba(110,231,183,0.15)" : "rgba(5,150,105,0.15)"}`,
        boxShadow: dark
          ? "0 8px 60px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.05)"
          : "0 8px 40px rgba(5,150,105,0.08)",
      }}
    >
      {/* Decorative background blobs */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(110,231,183,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
          top: -120,
          right: -60,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: dark
            ? "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          bottom: -60,
          left: 200,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: dark ? "rgba(110,231,183,0.7)" : "#059669",
              fontWeight: 500,
              letterSpacing: "0.5px",
              marginBottom: 6,
            }}
          >
            {greeting} 👋
          </div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: "var(--text)",
              letterSpacing: "-0.6px",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 8,
            }}
          >
            Here's your financial overview
          </h2>
          <p style={{ fontSize: 13, color: "var(--text3)", margin: 0 }}>
            {transactions.length} transactions tracked across {monthly.length}{" "}
            month{monthly.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Savings rate badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: dark
              ? "rgba(110,231,183,0.08)"
              : "rgba(5,150,105,0.07)",
            border: `0.5px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.2)"}`,
            borderRadius: 16,
            padding: "16px 24px",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 32,
              color: accent,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            {savingsRate}%
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text3)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            savings rate
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { dark } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1100,
      }}
    >
      {/* Hero greeting banner */}
      <GreetingBanner />

      {/* Summary stat cards */}
      <SummaryCards />

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 12,
          alignItems: "start",
        }}
      >
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent transactions — full width */}
      <RecentTransactions />
    </div>
  );
}
