import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

export const TIMEZONE = "Europe/Paris";

export const dateHumanized = (date: Date) => {
  return dayjs(date).locale("fr").tz(TIMEZONE).format("DD/MM/YYYY");
};
export const hoursHumanized = (date: Date) => {
  return dayjs(date).locale("fr").tz(TIMEZONE).format("HH:mm");
};

export const localDayjs = dayjs;
