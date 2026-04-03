import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockTransactions } from "../data/mockTransaction";
import { v4 as uuidv4 } from "uuid";

const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: "admin",
      filters: {
        type: "all",
        category: "all",
        month: "all",
        search: "",
        sortBy: "date",
        sortDir: "desc",
      },

      setRole: (role) => set({ role }),

      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),

      resetFilters: () =>
        set({
          filters: {
            type: "all",
            category: "all",
            month: "all",
            search: "",
            sortBy: "date",
            sortDir: "desc",
          },
        }),

      addTransaction: (data) =>
        set((state) => ({
          transactions: [{ ...data, id: uuidv4() }, ...state.transactions],
        })),

      editTransaction: (id, data) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];
        if (filters.type !== "all")
          result = result.filter((t) => t.type === filters.type);
        if (filters.category !== "all")
          result = result.filter((t) => t.category === filters.category);
        if (filters.month !== "all")
          result = result.filter((t) => t.date.startsWith(filters.month));
        if (filters.search.trim())
          result = result.filter(
            (t) =>
              t.description
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
              t.category.toLowerCase().includes(filters.search.toLowerCase()),
          );
        result.sort((a, b) => {
          if (filters.sortBy === "amount")
            return filters.sortDir === "desc"
              ? b.amount - a.amount
              : a.amount - b.amount;
          return filters.sortDir === "desc"
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        });
        return result;
      },

      getSummary: () => {
        const { transactions } = get();
        const income = transactions
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0);
        const expense = transactions
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0);
        return { balance: income - expense, income, expense };
      },

      getMonthlySummary: () => {
        const { transactions } = get();
        const months = {};
        transactions.forEach((t) => {
          const m = t.date.slice(0, 7);
          if (!months[m]) months[m] = { income: 0, expense: 0 };
          if (t.type === "income") months[m].income += t.amount;
          else months[m].expense += t.amount;
        });
        return Object.entries(months)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([month, data]) => ({ month, ...data }));
      },

      getCategoryBreakdown: () => {
        const { transactions } = get();
        const expenses = transactions.filter((t) => t.type === "expense");
        const total = expenses.reduce((s, t) => s + t.amount, 0);
        const cats = {};
        expenses.forEach((t) => {
          cats[t.category] = (cats[t.category] || 0) + t.amount;
        });
        return Object.entries(cats)
          .sort(([, a], [, b]) => b - a)
          .map(([category, amount]) => ({
            category,
            amount,
            pct: total > 0 ? Math.round((amount / total) * 100) : 0,
          }));
      },

      getTopSpendingCategory: () => {
        const breakdown = get().getCategoryBreakdown();
        return breakdown[0] || null;
      },

      getAvailableMonths: () => {
        const { transactions } = get();
        const months = [
          ...new Set(transactions.map((t) => t.date.slice(0, 7))),
        ];
        return months.sort((a, b) => b.localeCompare(a));
      },
    }),
    {
      name: "flowance-storage",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    },
  ),
);

export default useFinanceStore;
