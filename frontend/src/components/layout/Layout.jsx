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
        background: "var(--bg)",
        overflow: "hidden",
        transition: "background 0.3s",
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
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "22px 26px",
            background: "var(--bg)",
            transition: "background 0.3s",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
