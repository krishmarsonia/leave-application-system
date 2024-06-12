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
exports.findLeave = exports.updateLeave = exports.findLeaves = exports.createLeave = void 0;
const CustomError_1 = require("../custom/CustomError");
const Leave_1 = __importDefault(require("../model/Leave"));
const createLeave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            throw new CustomError_1.CustomError("data not passed", 422);
        }
        const result = yield Leave_1.default.create(data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
            throw error;
        }
    }
});
exports.createLeave = createLeave;
const findLeaves = (props) => {
    try {
        const { query, populate } = props;
        let result;
        if (query) {
            result = Leave_1.default.find(query);
        }
        else {
            result = Leave_1.default.find();
        }
        if (populate) {
            return result.populate(populate);
        }
        else {
            return result;
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
};
exports.findLeaves = findLeaves;
const updateLeave = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Leave_1.default.findOneAndUpdate(query, data, { new: true });
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.updateLeave = updateLeave;
const findLeave = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query) {
            throw new CustomError_1.CustomError("query was not passed in the parameters", 422);
        }
        const result = yield Leave_1.default.findOne(query);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findLeave = findLeave;
