"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationTimeCalculation = exports.timeCalculations = exports.oneSecond = exports.oneMinute = exports.oneHour = exports.oneDay = exports.oneMonth = exports.oneYear = void 0;
const CustomError_1 = require("../custom/CustomError");
exports.oneYear = 31556952000;
exports.oneMonth = 2629746000;
exports.oneDay = 86400000 - 1;
exports.oneHour = 3600000;
exports.oneMinute = 60000;
exports.oneSecond = 1000;
const timeCalculations = (start, end) => {
    if (start > end) {
        throw new CustomError_1.CustomError("start time is more than end time", 422);
    }
    const gap = end - start;
    if (gap === exports.oneDay) {
        return "1 day";
    }
    else if (gap < exports.oneDay) {
        const temp = Math.floor(gap / exports.oneHour);
        return temp === 1 ? `${temp} hour` : `${temp} hours`;
    }
    else if (gap < exports.oneMonth) {
        const temp = Math.floor(gap / exports.oneDay);
        return `${temp} days`;
    }
    else {
        const temp = Math.floor(gap / exports.oneMonth);
        return `${temp} months`;
    }
};
exports.timeCalculations = timeCalculations;
const notificationTimeCalculation = (time) => {
    const numberTime = new Date(time).getTime();
    const currentTime = new Date().getTime();
    if (currentTime < numberTime) {
        throw new CustomError_1.CustomError("current time is smaller than the given time", 422);
    }
    const gap = currentTime - numberTime;
    if (gap < exports.oneMinute) {
        const temp = Math.floor(gap / exports.oneSecond);
        return temp === 1 ? `${temp} second ago` : `${temp} seconds ago`;
    }
    else if (gap < exports.oneHour) {
        const temp = Math.floor(gap / exports.oneMinute);
        return temp === 1 ? `${temp} minute ago` : `${temp} minutes ago`;
    }
    else if (gap < exports.oneDay) {
        const temp = Math.floor(gap / exports.oneHour);
        return temp === 1 ? `${temp} hour ago` : `${temp} hours ago`;
    }
    else if (gap < exports.oneMonth) {
        const temp = Math.floor(gap / exports.oneDay);
        return temp === 1 ? `${temp} day ago` : `${temp} days ago`;
    }
    else if (gap < exports.oneYear) {
        const temp = Math.floor(gap / exports.oneMonth);
        return temp === 1 ? `${temp} month ago` : `${temp} months ago`;
    }
    else {
        const temp = Math.floor(gap / exports.oneYear);
        return temp === 1 ? `${temp} year ago` : `${temp} years ago`;
    }
};
exports.notificationTimeCalculation = notificationTimeCalculation;
