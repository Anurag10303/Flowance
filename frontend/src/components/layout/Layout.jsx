import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#080B14",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Header />
        <main
          key={location.pathname}
          className="page-enter"
          style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
