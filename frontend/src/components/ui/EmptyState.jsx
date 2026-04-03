export default function EmptyState({
  title = "No data",
  message = "Nothing to show here yet.",
  icon,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        gap: 12,
        textAlign: "center",
      }}
    >
      {icon && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ fontSize: 14, fontWeight: 500, color: "#E8EAF0" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(232,234,240,0.35)",
          maxWidth: 260,
          lineHeight: 1.5,
        }}
      >
        {message}
      </div>
    </div>
  );
}
