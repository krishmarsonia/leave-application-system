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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const clerkJWKS_1 = require("../secret/clerkJWKS");
const CustomError_1 = require("../custom/CustomError");
const clerk_1 = require("../clerk");
const auth = (req, res, next) => {
    try {
        const key = (0, crypto_1.createPublicKey)({
            key: clerkJWKS_1.jwks.keys[0],
            format: "jwk",
        });
        const exportedKey = key.export({ type: "pkcs1", format: "pem" }).toString();
        const sessionToken = req.cookies.__session;
        if (!sessionToken) {
            throw new CustomError_1.CustomError("sessionToken not found", 422);
        }
        jsonwebtoken_1.default.verify(sessionToken, exportedKey, { algorithms: ["RS256"], ignoreExpiration: true }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw new CustomError_1.CustomError("jwt verification failed", 422);
            }
            const responseUser = yield clerk_1.clerk.users.getUser(data === null || data === void 0 ? void 0 : data.sub);
            req.userId = responseUser.id;
            if (responseUser.publicMetadata.isAdmin) {
                req.isAdmin = true;
            }
            else {
                req.isAdmin = false;
            }
            return next();
        }));
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 422;
        }
        return next(error);
    }
};
exports.auth = auth;
