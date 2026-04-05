import { useState, useEffect } from "react";
import useFinanceStore from "../../store/useFinanceStore";
import { useTheme } from "../../context/ThemeContext";
import CategoryBadge from "../ui/CategoryBadge";
import Modal from "../ui/Modal";
import TransactionForm from "../ui/TransactionForm";
import EmptyState from "../ui/EmptyState";
import { formatINR, formatDate } from "../../utils/formatter";

const PAGE_SIZE = 20;

function SortIcon({ col, currentCol, dir }) {
  const active = col === currentCol;
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      style={{ marginLeft: 4, opacity: active ? 1 : 0.3 }}
    >
      <path
        d={dir === "asc" && active ? "M2 6.5L5 3L8 6.5" : "M2 3.5L5 7L8 3.5"}
        stroke={active ? "var(--accent)" : "currentColor"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaginationButton({ onClick, disabled, active, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 32,
        height: 32,
        borderRadius: 8,
        border: active
          ? "0.5px solid var(--accent)"
          : "0.5px solid var(--border)",
        background: active ? "var(--accent-bg)" : "transparent",
        color: active
          ? "var(--accent)"
          : disabled
            ? "var(--text3)"
            : "var(--text2)",
        fontSize: 12,
        fontFamily: "DM Sans, sans-serif",
        fontWeight: active ? 600 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.15s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 6px",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !active)
          e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        if (!disabled && !active)
          e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {children}
    </button>
  );
}

/* ── Mobile card row ────────────────────────────────────────────── */
function MobileTransactionCard({ txn, onEdit, onDelete, role }) {
  const { dark } = useTheme();
  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";
  const isIncome = txn.type === "income";

  return (
    <div
      style={{
        padding: "14px 16px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          background: isIncome ? "var(--accent-bg)" : "var(--red-bg)",
          color: isIncome ? accent : red,
        }}
      >
        {isIncome ? "↑" : "↓"}
      </div>

      {/* Description + category */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            color: "var(--text)",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 4,
          }}
        >
          {txn.description}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CategoryBadge category={txn.category} />
          <span style={{ fontSize: 11, color: "var(--text3)" }}>
            {formatDate(txn.date)}
          </span>
        </div>
      </div>

      {/* Amount + actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: isIncome ? accent : red,
          }}
        >
          {isIncome ? "+" : "−"}
          {formatINR(txn.amount)}
        </div>
        {role === "admin" && (
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onEdit(txn)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 12,
                color: "var(--text3)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(txn)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 12,
                color: "var(--text3)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Del
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionTable({ embedded = false }) {
  const {
    getFilteredTransactions,
    editTransaction,
    deleteTransaction,
    filters,
    setFilter,
    role,
  } = useFinanceStore();
  const { dark } = useTheme();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [page, setPage] = useState(1);

  const txns = getFilteredTransactions();
  const totalPages = Math.max(1, Math.ceil(txns.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [
    filters.type,
    filters.category,
    filters.month,
    filters.search,
    filters.sortBy,
    filters.sortDir,
  ]);

  const paginated = txns.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = txns.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, txns.length);

  const handleSort = (col) => {
    if (filters.sortBy === col)
      setFilter("sortDir", filters.sortDir === "desc" ? "asc" : "desc");
    else {
      setFilter("sortBy", col);
      setFilter("sortDir", "desc");
    }
  };

  const accent = dark ? "#6EE7B7" : "#059669";
  const red = dark ? "#F87171" : "#DC2626";
  const COL =
    role === "admin" ? "2.2fr 1.1fr 1fr 1fr 80px" : "2.2fr 1.1fr 1fr 1fr";

  const colHdr = (label, col) => (
    <div
      onClick={() => handleSort(col)}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        color: filters.sortBy === col ? "var(--accent)" : "var(--text3)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.7px",
        transition: "opacity 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {label}
      <SortIcon col={col} currentCol={filters.sortBy} dir={filters.sortDir} />
    </div>
  );

  const getPageNumbers = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (page >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const countLabel = (
    <div
      style={{
        fontSize: 12,
        color: "var(--text3)",
        padding: embedded ? "10px 18px 0" : "10px 18px",
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
  );

  /* Desktop table header */
  const tableHeader = (
    <div
      className="txn-table-header"
      style={{
        display: "grid",
        gridTemplateColumns: COL,
        padding: "10px 18px",
        background: embedded ? "transparent" : "var(--card2)",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      {colHdr("Description", "description")}
      <div
        style={{
          fontSize: 11,
          color: "var(--text3)",
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
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.7px",
          }}
        >
          Actions
        </div>
      )}
    </div>
  );

  /* Desktop table rows */
  const desktopRows = (
    <div className="txn-table-body">
      {txns.length === 0 ? (
        <EmptyState
          title="No transactions found"
          message="Try adjusting your filters or search."
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="var(--text3)"
                strokeWidth="1.5"
              />
              <path
                d="M14 14L17 17"
                stroke="var(--text3)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      ) : (
        paginated.map((txn, i) => (
          <div
            key={txn.id}
            style={{
              display: "grid",
              gridTemplateColumns: COL,
              padding: "11px 18px",
              alignItems: "center",
              borderBottom:
                i < paginated.length - 1 ? "0.5px solid var(--border)" : "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--card2)")
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
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  background:
                    txn.type === "income"
                      ? "var(--accent-bg)"
                      : "var(--red-bg)",
                  color: txn.type === "income" ? accent : red,
                }}
              >
                {txn.type === "income" ? "↑" : "↓"}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--text)",
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
            <div style={{ fontSize: 12, color: "var(--text2)" }}>
              {formatDate(txn.date)}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: txn.type === "income" ? accent : red,
              }}
            >
              {txn.type === "income" ? "+" : "−"}
              {formatINR(txn.amount)}
            </div>
            {role === "admin" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setEditing(txn)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: 12,
                    color: "var(--text3)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text3)")
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleting(txn)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: 12,
                    color: "var(--text3)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = red)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text3)")
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
  );

  /* Mobile card list */
  const mobileRows = (
    <div className="txn-mobile-body">
      {txns.length === 0 ? (
        <EmptyState
          title="No transactions found"
          message="Try adjusting your filters or search."
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="var(--text3)"
                strokeWidth="1.5"
              />
              <path
                d="M14 14L17 17"
                stroke="var(--text3)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      ) : (
        paginated.map((txn) => (
          <MobileTransactionCard
            key={txn.id}
            txn={txn}
            role={role}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        ))
      )}
    </div>
  );

  const pagination = totalPages > 1 && (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
        borderTop: "0.5px solid var(--border)",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{ fontSize: 12, color: "var(--text3)", whiteSpace: "nowrap" }}
      >
        Showing{" "}
        <span style={{ color: "var(--text2)", fontWeight: 500 }}>
          {start}–{end}
        </span>{" "}
        of{" "}
        <span style={{ color: "var(--text2)", fontWeight: 500 }}>
          {txns.length}
        </span>
      </span>

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <PaginationButton
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.5 2L4 6l3.5 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PaginationButton>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              style={{ fontSize: 12, color: "var(--text3)", padding: "0 2px" }}
            >
              …
            </span>
          ) : (
            <PaginationButton
              key={p}
              onClick={() => setPage(p)}
              active={p === page}
            >
              {p}
            </PaginationButton>
          ),
        )}

        <PaginationButton
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.5 2L8 6l-3.5 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PaginationButton>
      </div>
    </div>
  );

  const inner = (
    <>
      {countLabel}
      {tableHeader}
      {desktopRows}
      {mobileRows}
      {pagination}
    </>
  );

  return (
    <>
      {embedded ? (
        inner
      ) : (
        <div
          style={{
            background: "var(--card)",
            border: "0.5px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "var(--shadow)",
            transition: "all 0.3s",
          }}
        >
          {inner}
        </div>
      )}

      {editing && (
        <Modal title="Edit transaction" onClose={() => setEditing(null)}>
          <TransactionForm
            initial={{ ...editing, amount: String(editing.amount) }}
            onSubmit={(d) => {
              editTransaction(editing.id, d);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
            submitLabel="Save changes"
          />
        </Modal>
      )}

      {deleting && (
        <Modal
          title="Delete transaction"
          onClose={() => setDeleting(null)}
          width={360}
        >
          <p
            style={{
              fontSize: 13,
              color: "var(--text2)",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Are you sure you want to delete{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>
              "{deleting.description}"
            </span>
            ? This cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setDeleting(null)}
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
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteTransaction(deleting.id);
                setDeleting(null);
              }}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 9,
                fontSize: 13,
                background: "var(--red-bg)",
                border: `0.5px solid ${red}`,
                color: red,
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
