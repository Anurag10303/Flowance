export function exportToCSV(
  transactions,
  filename = "flowance-transactions.csv",
) {
  const headers = ["Date", "Description", "Category", "Type", "Amount (INR)"];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
