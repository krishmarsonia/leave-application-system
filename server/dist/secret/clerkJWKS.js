"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwks = void 0;
require("dotenv/config");
exports.jwks = {
    keys: [
        {
            use: process.env.JWKSUSE,
            kty: process.env.JWKSKTY,
            kid: process.env.JWKSKID,
            alg: process.env.JWKSALG,
            n: process.env.JWKSN,
            e: process.env.JWKSE,
        },
    ],
};
