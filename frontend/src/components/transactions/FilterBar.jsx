import useFinanceStore from "../../store/useFinanceStore";
import { CATEGORIES } from "../../data/mockTransaction";
import { formatMonth } from "../../utils/formatter";

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px",
        borderRadius: 100,
        fontSize: 12,
        fontFamily: "DM Sans, sans-serif",
        cursor: "pointer",
        border: active
          ? "0.5px solid rgba(110,231,183,0.45)"
          : "0.5px solid rgba(255,255,255,0.08)",
        background: active ? "rgba(110,231,183,0.08)" : "#0D1120",
        color: active ? "#6EE7B7" : "rgba(232,234,240,0.4)",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "#0D1120",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 100,
        padding: "5px 28px 5px 14px",
        fontSize: 12,
        color: value !== "all" ? "#6EE7B7" : "rgba(232,234,240,0.4)",
        fontFamily: "DM Sans, sans-serif",
        cursor: "pointer",
        outline: "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='rgba(232,234,240,0.3)' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
      onFocus={(e) => (e.target.style.borderColor = "rgba(110,231,183,0.4)")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      {children}
    </select>
  );
}

export default function FilterBar() {
  const { filters, setFilter, resetFilters, getAvailableMonths } =
    useFinanceStore();
  const months = getAvailableMonths();
  const hasActiveFilters =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.month !== "all";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 14,
      }}
    >
      <Chip
        label="All"
        active={filters.type === "all"}
        onClick={() => setFilter("type", "all")}
      />
      <Chip
        label="Income"
        active={filters.type === "income"}
        onClick={() => setFilter("type", "income")}
      />
      <Chip
        label="Expense"
        active={filters.type === "expense"}
        onClick={() => setFilter("type", "expense")}
      />
      <div
        style={{
          width: "0.5px",
          height: 18,
          background: "rgba(255,255,255,0.08)",
          margin: "0 2px",
        }}
      />
      <Select
        value={filters.category}
        onChange={(v) => setFilter("category", v)}
      >
        <option value="all" style={{ background: "#161C2E" }}>
          All categories
        </option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} style={{ background: "#161C2E" }}>
            {c}
          </option>
        ))}
      </Select>
      <Select value={filters.month} onChange={(v) => setFilter("month", v)}>
        <option value="all" style={{ background: "#161C2E" }}>
          All months
        </option>
        {months.map((m) => (
          <option key={m} value={m} style={{ background: "#161C2E" }}>
            {formatMonth(m)}
          </option>
        ))}
      </Select>
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 12,
            color: "rgba(232,234,240,0.3)",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            padding: "5px 8px",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(232,234,240,0.3)")
          }
        >
          Clear filters ×
        </button>
      )}
    </div>
  );
}
