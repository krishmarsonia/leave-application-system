export const getDateFromMilliSeconds = (milliseconds: number) => {
  const tempDate = new Date(milliseconds);
  const date =
    tempDate.getDate() +
    "/" +
    (tempDate.getMonth() + 1) +
    "/" +
    tempDate.getFullYear();
  return date;
};

export const getTimeFromMilliSeconds = (milliseconds: number) => {
  const tempDate = new Date(milliseconds);
  const date =
    tempDate.getHours() +
    ":" +
    (tempDate.getMinutes() < 10
      ? "0" + tempDate.getMinutes()
      : tempDate.getMinutes());
  return date;
};
