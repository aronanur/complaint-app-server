import { verifyToken } from "../utils/JsonWebToken";
import createError from "http-errors";
import { NextFunction, Response } from "express";

export default async (req: any, _res: Response, next: NextFunction) => {
  try {
    const userAccessToken = req.headers.access_token;

    if (userAccessToken) {
      const user = verifyToken(userAccessToken);

      if (!!user) {
        req.user = user;
        next();
      } else {
        throw createError(403, {
          name: "AuthenticationFailed",
          message: "Anda tidak mempunyai akses!",
        });
      }
    } else {
      throw createError(403, {
        name: "AuthenticationFailed",
        message: "Proses otentikasi gagal!",
      });
    }
  } catch (error) {
    next(error);
  }
};
