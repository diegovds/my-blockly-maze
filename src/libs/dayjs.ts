import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

dayjs.locale(ptBr);

export const dateFormatting = (date: Date): string => {
  return dayjs(date).format("D[ de ]MMMM[ de ]YYYY");
};
