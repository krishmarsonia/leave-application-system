"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveCalculation = void 0;
const CustomError_1 = require("../custom/CustomError");
const timeCalculations_1 = require("./timeCalculations");
const leaveCalculation = (startTime, endTime) => {
    if (startTime > endTime) {
        throw new CustomError_1.CustomError("startTime is more than endTime", 422);
    }
    const gap = endTime - startTime;
    if (gap === timeCalculations_1.oneDay) {
        return 1;
    }
    else if (gap < timeCalculations_1.oneDay) {
        const temp = Math.floor(gap / timeCalculations_1.oneHour);
        return temp * 0.125;
    }
    else {
        const fullDay = timeCalculations_1.oneDay;
        return Math.floor(gap / fullDay);
    }
};
exports.leaveCalculation = leaveCalculation;
