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
exports.findPunch = exports.updatePunches = exports.deletePunches = exports.getPunches = exports.createPunch = void 0;
const CustomError_1 = require("../custom/CustomError");
const Punch_1 = __importDefault(require("../model/Punch"));
const createPunch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            throw new CustomError_1.CustomError("no data provided in parameters", 422);
        }
        const result = yield Punch_1.default.create(data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.createPunch = createPunch;
const getPunches = (_a) => __awaiter(void 0, [_a], void 0, function* ({ query, sort, limit, skip, populate, }) {
    try {
        let result;
        result = Punch_1.default.find();
        if (query) {
            result = Punch_1.default.find(query);
        }
        if (sort) {
            result = result.sort(sort);
        }
        if (skip) {
            result = result.skip(skip);
        }
        if (limit) {
            result = result.limit(limit);
        }
        if (populate) {
            result = result.populate(populate);
        }
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.getPunches = getPunches;
const deletePunches = (deleteAll, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (query) {
            result = yield Punch_1.default.deleteMany(query);
        }
        else {
            if (deleteAll === true) {
                result = yield Punch_1.default.deleteMany();
            }
            else {
                throw new CustomError_1.CustomError("Trying to delete all punches without deleteAll Flag", 422);
            }
        }
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.deletePunches = deletePunches;
const updatePunches = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query || !data) {
            throw new CustomError_1.CustomError("query or data not passed in the parameters", 422);
        }
        const result = yield Punch_1.default.updateMany(query, data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.updatePunches = updatePunches;
const findPunch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query) {
            throw new CustomError_1.CustomError("query is not provided in the parameters", 422);
        }
        const result = yield Punch_1.default.findOne(query);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findPunch = findPunch;
