import moment from "moment";

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
export const DateHelper = {
  formatDateTime,
  formatDate,
  convertDate,
};
