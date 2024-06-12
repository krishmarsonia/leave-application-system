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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePunchController = exports.createPunchController = void 0;
const punchDBServices_1 = require("../dbServices/punchDBServices");
const createPunchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const punches = [
        {
            userId: "6645a4441810b1b8159752ef",
            punchInTime: 123456789,
        },
        {
            userId: "664ed640442c3dc6a0921cad",
            punchInTime: 123456789,
        },
    ];
    yield (0, punchDBServices_1.createPunch)(punches);
    return res.json("success");
});
exports.createPunchController = createPunchController;
const updatePunchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIds = ["6645a4441810b1b8159752ef", "664ed640442c3dc6a0921cad"];
        const query = { userId: { $in: userIds } };
        const data = { punchOutTime: 456987 };
        yield (0, punchDBServices_1.updatePunches)(query, data);
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.updatePunchController = updatePunchController;
