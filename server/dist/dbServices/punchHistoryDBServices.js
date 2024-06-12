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
exports.findPunchHistories = exports.findOnePunchHistory = exports.createPunchHistory = void 0;
const CustomError_1 = require("../custom/CustomError");
const punchHistory_1 = __importDefault(require("../model/punchHistory"));
const createPunchHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            throw new CustomError_1.CustomError("data not provided", 422);
        }
        const result = yield punchHistory_1.default.create(data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.createPunchHistory = createPunchHistory;
const findOnePunchHistory = (_a) => __awaiter(void 0, [_a], void 0, function* ({ query, sort, }) {
    try {
        const result = yield punchHistory_1.default.findOne(query).sort(sort);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findOnePunchHistory = findOnePunchHistory;
const findPunchHistories = (_b) => __awaiter(void 0, [_b], void 0, function* ({ query, sort, limit, skip, select, populate, gte, lte, gteWhere, lteWhere }) {
    try {
        let data;
        data = punchHistory_1.default.find();
        if (query) {
            data = punchHistory_1.default.find(query);
        }
        if (gte && gteWhere) {
            data = data.where(gteWhere).gte(gte);
        }
        if (lte && lteWhere) {
            data = data.where(lteWhere).lte(lte);
        }
        if (sort) {
            data = data.sort(sort);
        }
        if (skip) {
            data = data.skip(skip);
        }
        if (limit) {
            data = data.limit(limit);
        }
        if (select) {
            data = data.select(select);
        }
        if (populate) {
            data = data.populate(populate);
        }
        return yield data;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findPunchHistories = findPunchHistories;
