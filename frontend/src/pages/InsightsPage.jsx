import InsightCards from "../components/insights/InsightCards";
import MonthlyComparisonChart from "../components/insights/MonthlyComparisonChart";
import CategorySpendingBar from "../components/insights/CategorySpendingBar";
import ObservationCards from "../components/insights/ObservationCards";

export default function InsightsPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1100,
      }}
    >
      <InsightCards />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: 12,
          alignItems: "start", // ✅ stops grid from stretching children to equal height
        }}
      >
        <MonthlyComparisonChart />
        <CategorySpendingBar />
      </div>
      <ObservationCards />
    </div>
  );
}
