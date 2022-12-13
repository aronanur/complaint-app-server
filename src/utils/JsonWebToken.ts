import jwt from "jsonwebtoken";
import { UserResponse } from "../types/User";

export const signToken = (payload: UserResponse) => {
  const stringPayload = JSON.stringify(payload);

  // @ts-ignore
  return jwt.sign(stringPayload, process.env.SECRET_KEY);
};

export const signTokenGuest = (payload: UserResponse) => {
  const stringPayload = JSON.stringify(payload);

  // @ts-ignore
  return jwt.sign(stringPayload, process.env.SECRET_KEY);
};

export const verifyToken = (token: any) => {
  // @ts-ignore
  return jwt.verify(token, process.env.SECRET_KEY);
};
