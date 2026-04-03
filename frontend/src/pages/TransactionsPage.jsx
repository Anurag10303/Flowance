import { useState } from "react";
import FilterBar from "../components/transactions/FilterBar";
import TransactionTable from "../components/transactions/TransactionTable";
import Modal from "../components/ui/Modal";
import TransactionForm from "../components/ui/TransactionForm";
import useFinanceStore from "../store/useFinanceStore";

export default function TransactionsPage() {
  const { role, addTransaction } = useFinanceStore();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div style={{ maxWidth: 1100 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 4,
          flexWrap: "wrap",
        }}
      >
        <FilterBar />
        {role === "admin" && (
          <button
            onClick={() => setShowAdd(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#6EE7B7",
              color: "#080B14",
              border: "none",
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "DM Sans, sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add
            transaction
          </button>
        )}
      </div>
      <TransactionTable />
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
