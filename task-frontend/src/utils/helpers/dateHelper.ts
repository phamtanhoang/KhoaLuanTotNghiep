import moment from "moment";

const formatDateTime = (date: Date) => {
  return moment(date).format("HH:mm DD/MM/YYYY");
};
export const DateHelper = {
  formatDateTime,
};
