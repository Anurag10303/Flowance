import useFinanceStore from "../../store/useFinanceStore";
import { CATEGORIES } from "../../data/mockTransactions";
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
        whiteSpace: "nowrap",
        transition: "all 0.2s",
        fontWeight: active ? 500 : 400,
        border: active
          ? "0.5px solid var(--accent)"
          : "0.5px solid transparent",
        background: active ? "var(--accent-bg)" : "transparent",
        color: active ? "var(--accent)" : "var(--text2)",
      }}
    >
      {label}
    </button>
  );
}

function Sel({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "transparent",
        border:
          value !== "all"
            ? "0.5px solid var(--accent)"
            : "0.5px solid var(--border)",
        borderRadius: 100,
        padding: "5px 28px 5px 14px",
        fontSize: 12,
        color: value !== "all" ? "var(--accent)" : "var(--text2)",
        fontFamily: "DM Sans, sans-serif",
        cursor: "pointer",
        outline: "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23888' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        fontWeight: value !== "all" ? 500 : 400,
        transition: "all 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
      onBlur={(e) =>
        (e.target.style.borderColor =
          value !== "all" ? "var(--accent)" : "var(--border)")
      }
    >
      {children}
    </select>
  );
}

export default function FilterBar() {
  const { filters, setFilter, resetFilters, getAvailableMonths } =
    useFinanceStore();
  const months = getAvailableMonths();
  const hasActive =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.month !== "all";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
        paddingBottom: 14,
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
          background: "var(--border)",
          margin: "0 4px",
        }}
      />

      <Sel value={filters.category} onChange={(v) => setFilter("category", v)}>
        <option value="all" style={{ background: "var(--card2)" }}>
          All categories
        </option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} style={{ background: "var(--card2)" }}>
            {c}
          </option>
        ))}
      </Sel>

      <Sel value={filters.month} onChange={(v) => setFilter("month", v)}>
        <option value="all" style={{ background: "var(--card2)" }}>
          All months
        </option>
        {months.map((m) => (
          <option key={m} value={m} style={{ background: "var(--card2)" }}>
            {formatMonth(m)}
          </option>
        ))}
      </Sel>

      {hasActive && (
        <button
          onClick={resetFilters}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 12,
            color: "var(--text3)",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            padding: "5px 8px",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
        >
          Clear ×
        </button>
      )}
    </div>
  );
}
