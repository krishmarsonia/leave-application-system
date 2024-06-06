import "dotenv/config";
export const jwks = {
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
