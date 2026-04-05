import { useState } from "react";
import FilterBar from "../components/transactions/FilterBar";
import TransactionTable from "../components/transactions/TransactionTable";
import Modal from "../components/ui/Modal";
import TransactionForm from "../components/ui/TransactionForm";
import useFinanceStore from "../store/useFinanceStore";
import { useTheme } from "../context/ThemeContext";
import { formatINR } from "../utils/formatter";

function StatPill({ label, value, color, bg, border }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: bg,
        border: `0.5px solid ${border}`,
        borderRadius: 12,
        padding: "10px 16px",
        flex: 1,
        minWidth: 130,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 10,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color,
            fontFamily: "Syne, sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { role, addTransaction, getFilteredTransactions } = useFinanceStore();
  const { dark } = useTheme();
  const [showAdd, setShowAdd] = useState(false);

  const txns = getFilteredTransactions();
  const totalIncome = txns
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = txns
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const net = totalIncome - totalExpense;

  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";
  const netColor = net >= 0 ? accent : red;

  return (
    <div
      style={{
        maxWidth: 1100,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* ── Page header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color: "var(--text3)",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              fontWeight: 500,
              marginBottom: 4,
            }}
          >
            Finance tracker
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--text)",
              letterSpacing: "-0.8px",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Transactions
          </h1>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setShowAdd(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: accent,
              color: "#080B14",
              border: "none",
              padding: "9px 18px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "DM Sans, sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: `0 0 20px ${accent}40`,
              transition: "all 0.2s",
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
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v12M1 7h12"
                stroke="#080B14"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add transaction
          </button>
        )}
      </div>

      {/* ── Summary pills ── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <StatPill
          label="Income"
          value={formatINR(totalIncome)}
          color={accent}
          bg={dark ? "rgba(110,231,183,0.06)" : "rgba(5,150,105,0.06)"}
          border={dark ? "rgba(110,231,183,0.15)" : "rgba(5,150,105,0.15)"}
        />
        <StatPill
          label="Expenses"
          value={formatINR(totalExpense)}
          color={red}
          bg={dark ? "rgba(248,113,113,0.06)" : "rgba(220,38,38,0.06)"}
          border={dark ? "rgba(248,113,113,0.15)" : "rgba(220,38,38,0.15)"}
        />
        <StatPill
          label={net >= 0 ? "Net saved" : "Net deficit"}
          value={formatINR(Math.abs(net))}
          color={netColor}
          bg={dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"}
          border="var(--border)"
        />
      </div>

      {/* ── Filter bar + table ── */}
      <div
        style={{
          background: "var(--card)",
          border: "0.5px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: dark
            ? "0 4px 40px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.05)"
            : "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Filter bar inside the card */}
        <div
          style={{
            padding: "14px 18px 0",
            borderBottom: "0.5px solid var(--border)",
            background: "var(--card2)",
          }}
        >
          <FilterBar />
        </div>

        {/* Table — rendered without its own outer card since we wrap it */}
        <div style={{ padding: "0" }}>
          <TransactionTable embedded />
        </div>
      </div>

      {showAdd && (
        <Modal title="Add transaction" onClose={() => setShowAdd(false)}>
          <TransactionForm
            onSubmit={(data) => {
              addTransaction(data);
              setShowAdd(false);
            }}
            onCancel={() => setShowAdd(false)}
          />
        </Modal>
      )}
    </div>
  );
}
