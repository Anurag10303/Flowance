import { useState } from "react";
import useFinanceStore from "../../store/useFinanceStore";
import CategoryBadge from "../ui/CategoryBadge";
import Modal from "../ui/Modal";
import TransactionForm from "../ui/TransactionForm";
import EmptyState from "../ui/EmptyState";
import { formatINR, formatDate } from "../../utils/formatter";

function SortIcon({ col, currentCol, dir }) {
  const active = col === currentCol;
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{ marginLeft: 4, opacity: active ? 1 : 0.25 }}
    >
      <path
        d={dir === "asc" && active ? "M2 6.5L5 3L8 6.5" : "M2 3.5L5 7L8 3.5"}
        stroke={active ? "#6EE7B7" : "currentColor"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TransactionTable() {
  const {
    getFilteredTransactions,
    editTransaction,
    deleteTransaction,
    filters,
    setFilter,
    role,
  } = useFinanceStore();
  const [editingTxn, setEditingTxn] = useState(null);
  const [deletingTxn, setDeletingTxn] = useState(null);
  const txns = getFilteredTransactions();

  const handleSort = (col) => {
    if (filters.sortBy === col)
      setFilter("sortDir", filters.sortDir === "desc" ? "asc" : "desc");
    else {
      setFilter("sortBy", col);
      setFilter("sortDir", "desc");
    }
  };

  const colHdr = (label, col) => (
    <div
      onClick={() => handleSort(col)}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        color: filters.sortBy === col ? "#6EE7B7" : "rgba(232,234,240,0.3)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.7px",
      }}
    >
      {label}
      <SortIcon col={col} currentCol={filters.sortBy} dir={filters.sortDir} />
    </div>
  );

  const COL =
    role === "admin" ? "2.2fr 1.1fr 1fr 1fr 88px" : "2.2fr 1.1fr 1fr 1fr";

  return (
    <>
      <div
        style={{
          fontSize: 12,
          color: "rgba(232,234,240,0.3)",
          marginBottom: 10,
        }}
      >
        {txns.length} transaction{txns.length !== 1 ? "s" : ""}
        {filters.type !== "all" ||
        filters.category !== "all" ||
        filters.month !== "all" ||
        filters.search
          ? " matching filters"
          : " total"}
      </div>

      <div
        style={{
          background: "#0D1120",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: COL,
            padding: "10px 18px",
            background: "#111827",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          {colHdr("Description", "description")}
          <div
            style={{
              fontSize: 11,
              color: "rgba(232,234,240,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.7px",
            }}
          >
            Category
          </div>
          {colHdr("Date", "date")}
          {colHdr("Amount", "amount")}
          {role === "admin" && (
            <div
              style={{
                fontSize: 11,
                color: "rgba(232,234,240,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.7px",
              }}
            >
              Actions
            </div>
          )}
        </div>

        {txns.length === 0 ? (
          <EmptyState
            title="No transactions found"
            message="Try adjusting your filters or search query."
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="rgba(232,234,240,0.3)"
                  strokeWidth="1.5"
                />
                <path
                  d="M14 14L17 17"
                  stroke="rgba(232,234,240,0.3)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
        ) : (
          txns.map((txn, i) => (
            <div
              key={txn.id}
              style={{
                display: "grid",
                gridTemplateColumns: COL,
                padding: "11px 18px",
                alignItems: "center",
                borderBottom:
                  i < txns.length - 1
                    ? "0.5px solid rgba(255,255,255,0.04)"
                    : "none",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    background:
                      txn.type === "income"
                        ? "rgba(110,231,183,0.1)"
                        : "rgba(248,113,113,0.1)",
                    color: txn.type === "income" ? "#6EE7B7" : "#F87171",
                  }}
                >
                  {txn.type === "income" ? "↑" : "↓"}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "#E8EAF0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {txn.description}
                </span>
              </div>
              <div>
                <CategoryBadge category={txn.category} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(232,234,240,0.35)" }}>
                {formatDate(txn.date)}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: txn.type === "income" ? "#6EE7B7" : "#F87171",
                }}
              >
                {txn.type === "income" ? "+" : "−"}
                {formatINR(txn.amount)}
              </div>
              {role === "admin" && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => setEditingTxn(txn)}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: 12,
                      color: "rgba(232,234,240,0.3)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#6EE7B7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(232,234,240,0.3)")
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingTxn(txn)}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: 12,
                      color: "rgba(232,234,240,0.3)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F87171")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(232,234,240,0.3)")
                    }
                  >
                    Del
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {editingTxn && (
        <Modal title="Edit transaction" onClose={() => setEditingTxn(null)}>
          <TransactionForm
            initial={{ ...editingTxn, amount: String(editingTxn.amount) }}
            onSubmit={(data) => {
              editTransaction(editingTxn.id, data);
              setEditingTxn(null);
            }}
            onCancel={() => setEditingTxn(null)}
            submitLabel="Save changes"
          />
        </Modal>
      )}

      {deletingTxn && (
        <Modal
          title="Delete transaction"
          onClose={() => setDeletingTxn(null)}
          width={360}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(232,234,240,0.5)",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Are you sure you want to delete{" "}
            <span style={{ color: "#E8EAF0", fontWeight: 500 }}>
              "{deletingTxn.description}"
            </span>
            ? This cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setDeletingTxn(null)}
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
              onClick={() => {
                deleteTransaction(deletingTxn.id);
                setDeletingTxn(null);
              }}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 8,
                fontSize: 13,
                background: "rgba(248,113,113,0.1)",
                border: "0.5px solid rgba(248,113,113,0.3)",
                color: "#F87171",
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(248,113,113,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(248,113,113,0.1)")
              }
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
