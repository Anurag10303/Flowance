import { useState } from "react";
import { CATEGORIES } from "../../data/mockTransactions";

const EMPTY = {
  description: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Food",
  type: "expense",
};

export default function TransactionForm({
  initial = {},
  onSubmit,
  onCancel,
  submitLabel = "Save transaction",
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Required";
    return e;
  };
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit({ ...form, amount: parseFloat(form.amount) });
  };

  const lbl = {
    display: "block",
    fontSize: 11,
    color: "var(--text3)",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: 6,
  };
  const inp = (err) => ({
    width: "100%",
    background: "var(--card2)",
    border: `0.5px solid ${err ? "var(--red)" : "var(--border2)"}`,
    borderRadius: 9,
    padding: "9px 12px",
    fontSize: 13,
    color: "var(--text)",
    outline: "none",
    transition: "all 0.15s",
    fontFamily: "DM Sans, sans-serif",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={lbl}>Type</label>
        <div style={{ display: "flex", gap: 6 }}>
          {["income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => set("type", t)}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 9,
                fontSize: 13,
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
                textTransform: "capitalize",
                fontWeight: form.type === t ? 500 : 400,
                border:
                  form.type === t
                    ? t === "income"
                      ? "0.5px solid var(--accent)"
                      : "0.5px solid var(--red)"
                    : "0.5px solid var(--border)",
                background:
                  form.type === t
                    ? t === "income"
                      ? "var(--accent-bg)"
                      : "var(--red-bg)"
                    : "transparent",
                color:
                  form.type === t
                    ? t === "income"
                      ? "var(--accent)"
                      : "var(--red)"
                    : "var(--text2)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={lbl}>Description</label>
        <input
          style={inp(errors.description)}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="e.g. Swiggy order"
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px var(--accent-bg)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.description
              ? "var(--red)"
              : "var(--border2)";
            e.target.style.boxShadow = "none";
          }}
        />
        {errors.description && (
          <span
            style={{
              fontSize: 11,
              color: "var(--red)",
              marginTop: 4,
              display: "block",
            }}
          >
            {errors.description}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label style={lbl}>Amount (₹)</label>
          <input
            style={inp(errors.amount)}
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            placeholder="0"
            type="number"
            min="0"
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent)";
              e.target.style.boxShadow = "0 0 0 3px var(--accent-bg)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.amount
                ? "var(--red)"
                : "var(--border2)";
              e.target.style.boxShadow = "none";
            }}
          />
          {errors.amount && (
            <span
              style={{
                fontSize: 11,
                color: "var(--red)",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.amount}
            </span>
          )}
        </div>
        <div>
          <label style={lbl}>Date</label>
          <input
            style={{ ...inp(errors.date), colorScheme: "light dark" }}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            type="date"
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent)";
              e.target.style.boxShadow = "0 0 0 3px var(--accent-bg)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.date
                ? "var(--red)"
                : "var(--border2)";
              e.target.style.boxShadow = "none";
            }}
          />
          {errors.date && (
            <span
              style={{
                fontSize: 11,
                color: "var(--red)",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.date}
            </span>
          )}
        </div>
      </div>

      <div>
        <label style={lbl}>Category</label>
        <select
          style={{ ...inp(false), cursor: "pointer" }}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px var(--accent-bg)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border2)";
            e.target.style.boxShadow = "none";
          }}
        >
          {CATEGORIES.filter((c) => c !== "Income").map((c) => (
            <option key={c} value={c} style={{ background: "var(--card2)" }}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 9,
            fontSize: 13,
            background: "transparent",
            border: "0.5px solid var(--border)",
            color: "var(--text2)",
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border2)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text2)";
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 9,
            fontSize: 13,
            background: "var(--accent)",
            color: "var(--bg)",
            border: "none",
            fontWeight: 600,
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.88";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
