import { useTheme } from "../../context/ThemeContext";

const DARK = {
  Food: "#FBBF24",
  Housing: "#818CF8",
  Travel: "#38BDF8",
  Shopping: "#F87171",
  Healthcare: "#34D399",
  Entertainment: "#A78BFA",
  Education: "#FB923C",
  Utilities: "#9CA3AF",
  Income: "#6EE7B7",
};
const LIGHT = {
  Food: "#92690A",
  Housing: "#4338CA",
  Travel: "#0369A1",
  Shopping: "#B91C1C",
  Healthcare: "#065F46",
  Entertainment: "#6D28D9",
  Education: "#C2410C",
  Utilities: "#374151",
  Income: "#065F46",
};

export default function CategoryBadge({ category }) {
  const { dark } = useTheme();
  const color = dark ? DARK[category] || "#888" : LIGHT[category] || "#555";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 500,
        background: color + "18",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
}
