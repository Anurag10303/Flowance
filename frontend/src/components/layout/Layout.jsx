import { useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Desktop sidebar */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className="sidebar-mobile"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 100,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main
          key={location.pathname}
          className="page-enter"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "22px 26px",
            background: "var(--bg)",
            transition: "background 0.3s",
            /* bottom padding for mobile bottom nav */
            paddingBottom: "calc(22px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
