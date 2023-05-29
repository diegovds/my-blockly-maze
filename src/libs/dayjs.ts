import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

dayjs.locale(ptBr);

export const fullDateFormatting = (date: Date): string => {
  return dayjs(date).format("D[ de ]MMMM[ de ]YYYY");
};

export const compactDateFormatting = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};
