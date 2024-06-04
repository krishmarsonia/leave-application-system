import { CustomError } from "../custom/CustomError";
import { oneDay, oneHour } from "./timeCalculations";

export const leaveCalculation = (startTime: number, endTime: number) => {
  if (startTime > endTime) {
    throw new CustomError("startTime is more than endTime", 422);
  }
  const gap = endTime - startTime;
  if (gap === oneDay) {
    return 1;
  } else if (gap < oneDay) {
    const temp = Math.floor(gap / oneHour);
    return temp * 0.125;
  } else {
    const fullDay = oneDay;
    return Math.floor(gap / fullDay);
  }
};
