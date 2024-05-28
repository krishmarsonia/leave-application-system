import { CustomError } from "../custom/CustomError";

const oneYear = 31556952000;
const oneMonth = 2629746000;
const oneDay = 86400000;
const oneHour = 3600000;
const oneMinute = 60000;
const oneSecond = 1000;
export const timeCalculations = (start: number, end: number) => {
  if (start > end) {
    throw new CustomError("start time is more than end time", 422);
  }
  const gap = end - start;
  if (gap === 0) {
    return "1 day";
  } else if (gap < oneDay) {
    const temp = Math.floor(gap / oneHour);
    return temp === 1 ? `${temp} hour` : `${temp} hours`;
  } else if (gap < oneMonth) {
    const temp = Math.floor(gap / oneDay);
    return `${temp} days`;
  } else {
    const temp = Math.floor(gap / oneMonth);
    return `${temp} months`;
  }
};

export const notificationTimeCalculation = (time: string): string => {
  const numberTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  if (currentTime < numberTime) {
    throw new CustomError("current time is smaller than the given time", 422);
  }
  const gap = currentTime - numberTime;
  if (gap < oneMinute) {
    const temp = Math.floor(gap / oneSecond);
    return temp === 1 ? `${temp} second ago` : `${temp} seconds ago`;
  } else if (gap < oneHour) {
    const temp = Math.floor(gap / oneMinute);
    return temp === 1 ? `${temp} minute ago` : `${temp} minutes ago`;
  } else if (gap < oneDay) {
    const temp = Math.floor(gap / oneHour);
    return temp === 1 ? `${temp} hour ago` : `${temp} hours ago`;
  } else if (gap < oneMonth) {
    const temp = Math.floor(gap / oneDay);
    return temp === 1 ? `${temp} day ago` : `${temp} days ago`;
  } else if (gap < oneYear) {
    const temp = Math.floor(gap / oneMonth);
    return temp === 1 ? `${temp} month ago` : `${temp} months ago`;
  } else {
    const temp = Math.floor(gap / oneYear);
    return temp === 1 ? `${temp} year ago` : `${temp} years ago`;
  }
};
