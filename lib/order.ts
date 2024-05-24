import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = "Europe/Paris";

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
  return dayjs(date).locale("fr").tz(TIMEZONE).format("DD/MM/YYYY");
};
export const hoursHumanized = (date: Date) => {
  return dayjs(date).locale("fr").tz(TIMEZONE).format("HH:mm");
};
