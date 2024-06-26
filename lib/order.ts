export const total = (items: { quantity: number; price: number }[]) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const paymentMethodHumanized = (method: string) => {
  return {
    cash: "Espèces 🪙",
    card: "Carte bancaire 💳",
    check: "Chèque 📄",
  }[method];
};
