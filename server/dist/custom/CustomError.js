"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
    }
}
exports.CustomError = CustomError;
