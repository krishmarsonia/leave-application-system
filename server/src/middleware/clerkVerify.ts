import jwt from "jsonwebtoken";
import { createPublicKey } from "crypto";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

import { jwks } from "../secret/clerkJWKS";
import { CustomError } from "../custom/CustomError";
import { clerk } from "../clerk";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = createPublicKey({
      key: jwks.keys[0],
      format: "jwk",
    });
    const exportedKey = key.export({ type: "pkcs1", format: "pem" }).toString();
    const sessionToken = req.cookies.__session;
    if (!sessionToken) {
      throw new CustomError("sessionToken not found", 422);
    }
    jwt.verify(
      sessionToken,
      exportedKey,
      { algorithms: ["RS256"], ignoreExpiration: true },
      async (err, data) => {
        if (err) {
          throw new CustomError("jwt verification failed", 422);
        }
        const responseUser = await clerk.users.getUser(
          data?.sub as unknown as any
        );
        // console.log(responseUser);
        req.userId = responseUser.id;
        if (responseUser.publicMetadata.isAdmin) {
          req.isAdmin = true;
        } else {
          req.isAdmin = false;
        }
        return next();
      }
    );
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
