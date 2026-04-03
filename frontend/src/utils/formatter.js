export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMonth(monthStr) {
  const [year, month] = monthStr.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export function getMonthLabel(monthStr) {
  const [year, month] = monthStr.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-IN", {
    month: "short",
  });
}
