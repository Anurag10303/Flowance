import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "../components/dashboard/SpendingBreakdownChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function DashboardPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1100,
      }}
    >
      <SummaryCards />
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12 }}>
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      <RecentTransactions />
    </div>
  );
}
