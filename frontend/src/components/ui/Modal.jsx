import { useEffect } from "react";

export default function Modal({ title, onClose, children, width = 420 }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
    >
      <div
        className="animate-scale-in"
        style={{
          background: "var(--card)",
          border: "0.5px solid var(--border2)",
          borderRadius: 18,
          padding: 24,
          width: "100%",
          maxWidth: width,
          boxShadow: "var(--shadow-lg)",
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
              color: "var(--text)",
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text3)",
              fontSize: 22,
              lineHeight: 1,
              cursor: "pointer",
              padding: "0 4px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
