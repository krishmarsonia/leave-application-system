"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.punchCRONJobService = exports.weeklyPunchServices = exports.punchDisplayServices = exports.punchServices = void 0;
const fs_1 = __importDefault(require("fs"));
const CustomError_1 = require("../custom/CustomError");
const leaveDBServices_1 = require("../dbServices/leaveDBServices");
const userDbServices_1 = require("../dbServices/userDbServices");
const punchHistoryDBServices_1 = require("../dbServices/punchHistoryDBServices");
const punchDBServices_1 = require("../dbServices/punchDBServices");
const punchServices = (mode, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mode === "punch-in" || mode === "punch-out") {
            const user = yield (0, userDbServices_1.findOneUser)({ externalId: userId });
            if (!user) {
                throw new CustomError_1.CustomError("no user found with this ID", 404);
            }
            const punches = yield (0, punchDBServices_1.getPunches)({
                query: { userId: user._id.toString() },
            });
            if (mode === "punch-in") {
                if (punches.length < 3) {
                    const didntPunchedOut = punches.find((ps) => ps.punchOutTime === 0);
                    if (didntPunchedOut) {
                        throw new CustomError_1.CustomError("You haven't punch-out in the last punch please punch-out first to punch-in.", 422);
                    }
                    yield (0, punchDBServices_1.createPunch)({
                        userId: user._id.toString(),
                        punchInTime: Date.now(),
                    });
                    return "Noted! you are punched-in. You may start your work.";
                }
                else {
                    throw new CustomError_1.CustomError("You have already punched-out 3 times. You are not allowed to punch more than 3 times in a day", 422);
                }
            }
            else {
                if (punches.length === 0) {
                    throw new CustomError_1.CustomError("no punch found with this punchId", 422);
                }
                const punchedInPunch = punches.find((ps) => ps.punchOutTime === 0);
                if (!punchedInPunch) {
                    throw new CustomError_1.CustomError("You have already punched-out or you didn't punched-in in the first place.", 422);
                }
                if (!punchedInPunch.punchInTime || punchedInPunch.punchInTime === 0) {
                    throw new CustomError_1.CustomError("please first punch-in to punch-out", 422);
                }
                if (punchedInPunch.punchOutTime !== 0) {
                    throw new CustomError_1.CustomError("you already punched-out!", 422);
                }
                punchedInPunch.punchOutTime = Date.now();
                yield punchedInPunch.save();
                return "Noted! you are punched-out. You can enjoy rest of the day.";
            }
        }
        else {
            throw new CustomError_1.CustomError("appropriate mode of punch is not provided", 422);
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.punchServices = punchServices;
const punchDisplayServices = (pageParams) => __awaiter(void 0, void 0, void 0, function* () {
    const numberOfData = 10;
    if (pageParams < 10000000) {
        let tempData = [];
        const data = yield (0, punchDBServices_1.getPunches)({
            sort: { _id: "asc" },
            limit: numberOfData,
            skip: pageParams,
            populate: "userId",
        });
        data.map((da) => {
            da.set("isOnLeave", false, { strict: false });
            da.set("date", Date.now(), { strict: false });
            return da;
        });
        if (data.length < numberOfData) {
            const historyData = yield (0, punchHistoryDBServices_1.findPunchHistories)({
                sort: { _id: "asc" },
                limit: numberOfData - data.length,
                skip: 0,
                select: {
                    _id: 1,
                    punchInTime: 1,
                    punchOutTime: 1,
                    userId: 1,
                    isOnLeave: 1,
                    date: 1,
                },
                populate: "userId",
            });
            tempData = [...data, ...historyData];
            return {
                data: tempData,
                currentPage: pageParams,
                nextPage: 10000000 + pageParams + numberOfData - data.length,
            };
        }
        return {
            data,
            currentPage: pageParams,
            nextPage: pageParams + numberOfData,
        };
    }
    else {
        console.log(116, pageParams);
        const data = yield (0, punchHistoryDBServices_1.findPunchHistories)({
            sort: { _id: "asc" },
            limit: numberOfData,
            skip: pageParams - 10000000,
            select: {
                _id: 1,
                punchInTime: 1,
                punchOutTime: 1,
            },
            populate: "userId",
        });
        return {
            data,
            currentPage: pageParams,
            nextPage: data.length !== 0 ? pageParams + numberOfData : null,
        };
    }
});
exports.punchDisplayServices = punchDisplayServices;
const weeklyPunchServices = (weekStart, weekEnd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const punchHistories = yield (0, punchHistoryDBServices_1.findPunchHistories)({
            gte: weekStart,
            lte: weekEnd,
            gteWhere: "punchInTime",
            lteWhere: "punchOutTime",
        });
        const users = yield (0, userDbServices_1.findUsers)();
        const finalArr = [];
        users.map((user) => {
            let leaveCount = 0;
            let totalHours = 0;
            punchHistories.map((uph) => {
                if (uph.userId.toString() === user._id.toString()) {
                    if (uph.isOnLeave === true) {
                        leaveCount++;
                    }
                    else {
                        const timeDifference = uph.punchOutTime - uph.punchInTime;
                        console.log(uph._id);
                        if (timeDifference > 0) {
                            const hours = timeDifference / 3600000;
                            totalHours = totalHours + hours;
                        }
                    }
                }
            });
            if (!(totalHours === 0 && leaveCount === 0)) {
                finalArr.push({
                    userId: user._id.toString(),
                    userName: user.name,
                    leaveDays: leaveCount,
                    workHours: Math.ceil(totalHours),
                });
            }
        });
        return finalArr;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.weeklyPunchServices = weeklyPunchServices;
const punchCRONJobService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield (0, userDbServices_1.findUsers)();
        const punches = yield (0, punchDBServices_1.getPunches)({});
        const tempEndPunchTime = new Date();
        const punchTransferDate = new Date();
        punchTransferDate.setHours(12, 0, 0, 0);
        tempEndPunchTime.setHours(18, 0, 0, 0);
        let tempPunchCount = 0;
        let punchesTransfer = [];
        punches.map((pun) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            users = users.filter((user) => { var _a; return user._id.toString() !== ((_a = pun.userId) === null || _a === void 0 ? void 0 : _a.toString()); });
            punchesTransfer.push({
                userId: (_a = pun.userId) === null || _a === void 0 ? void 0 : _a.toString(),
                punchInTime: pun.punchInTime,
                punchOutTime: pun.punchOutTime,
                isOnLeave: false,
                date: punchTransferDate.getTime(),
            });
        }));
        yield (0, punchHistoryDBServices_1.createPunchHistory)(punchesTransfer);
        punchesTransfer = [];
        console.log(109, users);
        yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const leaveResult = yield (0, leaveDBServices_1.findLeave)({
                employeeId: user._id.toString(),
                leaveType: { $in: ["fullDay", "SeveralDays"] },
                startDate: { $lt: punchTransferDate.getTime() },
                endDate: { $gt: punchTransferDate.getTime() },
            });
            console.log(leaveResult);
            if (leaveResult) {
                punchesTransfer.push({
                    userId: user._id.toString(),
                    date: punchTransferDate.getTime(),
                    isOnLeave: true,
                    punchInTime: 0,
                    punchOutTime: 0,
                });
            }
            else {
                console.log("127, running");
                punchesTransfer.push({
                    userId: user._id.toString(),
                    date: punchTransferDate.getTime(),
                    isOnLeave: false,
                    punchInTime: 0,
                    punchOutTime: 0,
                });
            }
            tempPunchCount++;
        })));
        console.log(134, punchesTransfer);
        yield (0, punchHistoryDBServices_1.createPunchHistory)(punchesTransfer);
        yield (0, punchDBServices_1.deletePunches)(true);
    }
    catch (error) {
        console.log(error);
        const content = new Date() +
            "\r\n" +
            (error.stack ? error.stack : error.message) +
            "\r\n" +
            "\r\n";
        fs_1.default.appendFileSync(process.cwd() + "/src/logs/scheduleError.txt", content);
    }
});
exports.punchCRONJobService = punchCRONJobService;
