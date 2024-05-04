import dayjs from "dayjs";
import "dayjs/locale/fr";

export const total = (items: { quantity: number; price: number }[]) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const paymentMethodHumanized = (method: string) => {
  return method === "cash" ? "Espèces 🪙" : "Carte bancaire 💳";
};

export const dateHumanized = (date: Date) => {
  // dd/mm/yyyy hh:mm
  return dayjs(date).locale("fr").format("HH:mm DD/MM/YYYY");
};
export const hoursHumanized = (date: Date) => {
  // hh:mm
  return dayjs(date).locale("fr").format("HH:mm");
};
