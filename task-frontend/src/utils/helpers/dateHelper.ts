import moment from "moment";

const formatDateTime = (date?: Date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};
const formatDate = (date?: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
export const DateHelper = {
  formatDateTime,
  formatDate,
};
