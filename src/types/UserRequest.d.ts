import { UserResponse } from "./User";
import { HttpErrorCode } from "./Error";
import { Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserResponse;
  }
}

type RoleType = "admin" | "user";

type MessageType = "success" | "error";

type SortType = "asc" | "desc";

type SortByType = "fullName" | "ipUser" | "role" | "username" | "id";

interface ParamsDictionary {
  userId?: string;
}

interface ResponseBody {
  statusCode: HttpErrorCode;
  message: MessageType;
  data?: any;
  access_token?: string;
}

interface RequsetBody {
  fullName?: string;
  ipUser?: string;
  role?: RoleType;
  username?: string;
  password?: string;
}

interface RequestQuery {
  keyword?: string;
  totalRow?: number;
  page?: number;
  sort?: SortType;
  sortBy?: SortByType;
}

interface ListUserResponse {
  statusCode: HttpErrorCode;
  message: MessageType;
  data: {
    data: UserResponse[];
    page: number;
    totalRow: number;
    sort: SortType;
    totalData: number;
    keyword: string;
    sortBy: SortByType;
  };
}

export type UserRequest = Request<
  ParamsDictionary,
  ResponseBody,
  RequsetBody,
  RequestQuery
>;

export type BasicResponse = Response<ResponseBody>;

export type UserListResponse = Response<ListUserResponse>;
