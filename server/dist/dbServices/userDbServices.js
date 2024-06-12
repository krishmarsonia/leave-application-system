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
exports.findUsers = exports.createOneUser = exports.findOneUser = void 0;
const CustomError_1 = require("../custom/CustomError");
const User_1 = __importDefault(require("../model/User"));
const findOneUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!query) {
            throw new CustomError_1.CustomError("query not passed", 422);
        }
        const result = yield User_1.default.findOne(query);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findOneUser = findOneUser;
const createOneUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            throw new CustomError_1.CustomError("data not passed", 422);
        }
        const result = yield User_1.default.create(data);
        return result;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.createOneUser = createOneUser;
const findUsers = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = props === null || props === void 0 ? void 0 : props.query;
        const gte = props === null || props === void 0 ? void 0 : props.gte;
        const gteWhere = props === null || props === void 0 ? void 0 : props.gteWhere;
        const lte = props === null || props === void 0 ? void 0 : props.lte;
        const lteWhere = props === null || props === void 0 ? void 0 : props.lteWhere;
        const select = props === null || props === void 0 ? void 0 : props.select;
        let users;
        users = User_1.default.find();
        if (query) {
            console.log("there is a query");
            users = User_1.default.find(query);
        }
        if (gte && gteWhere) {
            users = users.where(gteWhere).gte(gte);
        }
        if (lte && lteWhere) {
            users = users.where(lteWhere).lte(lte);
        }
        if (select) {
            users = users.select(select);
        }
        console.log(users.getQuery());
        return yield users;
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        throw error;
    }
});
exports.findUsers = findUsers;
