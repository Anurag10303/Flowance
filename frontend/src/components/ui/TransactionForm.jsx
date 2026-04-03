import { useState } from "react";
import { CATEGORIES } from "../../data/mockTransaction";

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

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Required";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, amount: parseFloat(form.amount) });
  };

  const label = {
    display: "block",
    fontSize: 11,
    color: "rgba(232,234,240,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: 6,
  };
  const input = (err) => ({
    width: "100%",
    background: "#161C2E",
    border: `0.5px solid ${err ? "#F87171" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    color: "#E8EAF0",
    fontFamily: "DM Sans, sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
  });
  const errMsg = (key) =>
    errors[key] ? (
      <span
        style={{
          fontSize: 11,
          color: "#F87171",
          marginTop: 4,
          display: "block",
        }}
      >
        {errors[key]}
      </span>
    ) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <label style={label}>Type</label>
        <div style={{ display: "flex", gap: 6 }}>
          {["income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => set("type", t)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                border:
                  form.type === t
                    ? t === "income"
                      ? "0.5px solid rgba(110,231,183,0.5)"
                      : "0.5px solid rgba(248,113,113,0.5)"
                    : "0.5px solid rgba(255,255,255,0.08)",
                background:
                  form.type === t
                    ? t === "income"
                      ? "rgba(110,231,183,0.1)"
                      : "rgba(248,113,113,0.1)"
                    : "transparent",
                color:
                  form.type === t
                    ? t === "income"
                      ? "#6EE7B7"
                      : "#F87171"
                    : "rgba(232,234,240,0.35)",
                textTransform: "capitalize",
                transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={label}>Description</label>
        <input
          style={input(errors.description)}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="e.g. Swiggy order"
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(110,231,183,0.4)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = errors.description
              ? "#F87171"
              : "rgba(255,255,255,0.1)")
          }
        />
        {errMsg("description")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label style={label}>Amount (₹)</label>
          <input
            style={input(errors.amount)}
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            placeholder="0"
            type="number"
            min="0"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(110,231,183,0.4)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = errors.amount
                ? "#F87171"
                : "rgba(255,255,255,0.1)")
            }
          />
          {errMsg("amount")}
        </div>
        <div>
          <label style={label}>Date</label>
          <input
            style={{ ...input(errors.date), colorScheme: "dark" }}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            type="date"
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(110,231,183,0.4)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = errors.date
                ? "#F87171"
                : "rgba(255,255,255,0.1)")
            }
          />
          {errMsg("date")}
        </div>
      </div>

      <div>
        <label style={label}>Category</label>
        <select
          style={{ ...input(false), cursor: "pointer" }}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(110,231,183,0.4)")
          }
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          {CATEGORIES.filter((c) => c !== "Income").map((c) => (
            <option key={c} value={c} style={{ background: "#161C2E" }}>
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
            borderRadius: 8,
            fontSize: 13,
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.1)",
            color: "rgba(232,234,240,0.4)",
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 8,
            fontSize: 13,
            background: "#6EE7B7",
            color: "#080B14",
            border: "none",
            fontWeight: 500,
            fontFamily: "DM Sans, sans-serif",
            cursor: "pointer",
          }}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
