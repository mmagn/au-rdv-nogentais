import dayjs from "dayjs";
import "dayjs/locale/fr";

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

export const dateHumanized = (date: Date) => {
  return dayjs(date).locale("fr").format("DD/MM/YYYY");
};
export const hoursHumanized = (date: Date) => {
  return dayjs(date).locale("fr").format("HH:mm");
};
