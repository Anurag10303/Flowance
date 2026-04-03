import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/transactions"
        element={
          <Layout>
            <TransactionsPage />
          </Layout>
        }
      />
      <Route
        path="/insights"
        element={
          <Layout>
            <InsightsPage />
          </Layout>
        }
      />
    </Routes>
  );
}
