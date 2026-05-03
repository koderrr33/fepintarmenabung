export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getCategoryIcon = (category) => {
  const icons = {
    food: '🍽️',
    transport: '🚗',
    utilities: '⚡',
    entertainment: '🎬',
    health: '💊',
    shopping: '🛍️',
    salary: '💰',
    investment: '📈',
    pet: '🐾',
    education: '📚',
    other: '📦',
    income: '💵',
    expense: '💸'
  };
  return icons[category] || '📦';
}

export const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export const hslFromIndex = (i) =>
  `hsl(${(i * 53 + 145) % 360}, 40%, 88%)`;