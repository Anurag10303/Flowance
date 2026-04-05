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
            background: "var(--bg2)",
            border: "0.5px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
        {title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--text3)",
          maxWidth: 260,
          lineHeight: 1.5,
        }}
      >
        {message}
      </div>
    </div>
  );
}
