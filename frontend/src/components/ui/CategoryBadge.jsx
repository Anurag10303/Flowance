import { CATEGORY_COLORS } from "../../data/mockTransaction";

export default function CategoryBadge({ category }) {
  const colors = CATEGORY_COLORS[category] || {
    bg: "rgba(255,255,255,0.08)",
    text: "rgba(232,234,240,0.5)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 500,
        background: colors.bg,
        color: colors.text,
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
}
