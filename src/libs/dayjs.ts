import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.locale(ptBr);
dayjs.extend(utc);
dayjs.extend(timezone);

export const fullDateFormatting = (date: Date): string => {
  return dayjs
    .utc(date)
    .tz("America/Sao_Paulo")
    .format("D[ de ]MMMM[ de ]YYYY");
};

export const compactDateFormatting = (date: Date): string => {
  return dayjs.utc(date).tz("America/Sao_Paulo").format("DD/MM/YYYY");
};
