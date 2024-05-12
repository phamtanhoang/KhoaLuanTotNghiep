import moment from "moment";
import { format, parse, startOfMonth, endOfMonth } from "date-fns";

const formatDateTime = (date?: Date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};
const formatDate = (date?: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
function convertDate(date?: string | null): string {
  if (!date) {
    return "";
  }

  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}
function getFirstDayOfMonth(): string {
  const firstDayOfMonth = startOfMonth(new Date());
  const formattedDate = format(firstDayOfMonth, "yyyy-MM-01");

  return formattedDate;
}

function getLastDayOfMonth(): string {
  const lastDayOfMonth = endOfMonth(new Date());
  const formattedDate = format(lastDayOfMonth, "yyyy-MM-dd");

  return formattedDate;
}

function convertDateFormat(dateString: string): string {
  const parsedDate = parse(
    dateString,
    "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX",
    new Date()
  );

  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  return formattedDate;
}
export const DateHelper = {
  formatDateTime,
  formatDate,
  convertDate,
  convertDateFormat,
  getFirstDayOfMonth,
  getLastDayOfMonth,
};
