import { useEffect } from "react";

export default function Modal({ title, onClose, children, width = 420 }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
    >
      <div
        className="animate-pop"
        style={{
          background: "#0D1120",
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          padding: 24,
          width: "100%",
          maxWidth: width,
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
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 16,
              color: "#fff",
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(232,234,240,0.3)",
              fontSize: 20,
              lineHeight: 1,
              cursor: "pointer",
              padding: "0 4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8EAF0")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(232,234,240,0.3)")
            }
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
