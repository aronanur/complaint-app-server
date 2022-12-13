import db from "../models";
import { NextFunction, Response } from "express";
import { comparePassword } from "../utils/Encrypt";
import { UserResponse } from "../types/User";
import { signToken } from "../utils/JsonWebToken";
import createError from "http-errors";
import {
  BasicResponse,
  UserListResponse,
  UserRequest,
} from "../types/UserRequest";
import { selectFormat } from "../utils/RawQuerySelect";

export const LoginUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const checkUser = await db.User.findOne({ where: { username } });
    const isUserExist = !!checkUser;

    if (isUserExist) {
      const dataUser: UserResponse = checkUser?.dataValues;

      if (comparePassword(password ?? "", dataUser?.password ?? "")) {
        const encryptedData = {
          id: dataUser?.id,
          fullName: dataUser?.fullName,
          ipUser: dataUser?.ipUser,
          role: dataUser?.role,
          username: dataUser?.username,
        };

        const signUserToken = signToken(encryptedData);

        res.status(200).json({
          statusCode: 200,
          message: "success",
          data: {
            user: encryptedData,
            accessToken: signUserToken,
          },
        });
      } else {
        throw createError(404, {
          name: "NotFound",
          message: "Password atau Username salah!",
        });
      }
    } else {
      throw createError(404, {
        name: "NotFound",
        message: "User tidak terdaftar!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const AuthenticationUser = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  try {
    const checkUser = db.User.findOne({ where: { id: userId } });
    const isUserExist = !!checkUser;

    if (isUserExist) {
      return res.status(200).json({
        statusCode: 200,
        message: "success",
      });
    }

    throw createError(404, {
      name: "NotFound",
      message: "User tidak terdaftar!",
    });
  } catch (error) {
    next(error);
  }
};

export const ListUser = async (
  req: UserRequest,
  res: UserListResponse,
  next: NextFunction
) => {
  const { keyword, page, totalRow, sort, sortBy } = req.query;

  const keywordQuery = keyword ?? "";
  const totalRowQuery = totalRow ?? 10;
  const offsetQuery = page ? page - 1 : 0;

  try {
    const queryString = `
      SELECT id, fullName, role, ipUser, username
        FROM Users
        WHERE 
        (
          fullName LIKE '%${keywordQuery}%'
          OR
          role LIKE '%${keywordQuery}%'
          OR
          ipUser LIKE '%${keywordQuery}%'
          OR
          username LIKE '%${keywordQuery}%'
        )
        AND role = 'user'
        ${
          sort
            ? `ORDER BY ${sortBy ?? "id"} ${sort ?? "DESC"}`
            : "ORDER BY id DESC"
        }
        LIMIT ${totalRowQuery}
        OFFSET ${totalRowQuery * offsetQuery}
    `;

    const listUser = await db.sequelize.query(
      queryString,
      selectFormat({}, db.sequelize.User)
    );

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: {
        data: listUser,
        page: page ?? 1,
        totalRow: totalRowQuery,
        sort: sort ?? "desc",
        totalData: listUser.length,
        keyword: keywordQuery,
        sortBy: sortBy ?? "id",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const ListAdmin = async (
  req: UserRequest,
  res: UserListResponse,
  next: NextFunction
) => {
  const { keyword, page, totalRow, sort, sortBy } = req.query;

  const keywordQuery = keyword ?? "";
  const totalRowQuery = totalRow ?? 10;
  const offsetQuery = page ? page - 1 : 0;

  try {
    const queryString = `
      SELECT id, fullName, role, ipUser, username
        FROM Users
        WHERE 
        (
          fullName LIKE '%${keywordQuery}%'
          OR
          role LIKE '%${keywordQuery}%'
          OR
          ipUser LIKE '%${keywordQuery}%'
          OR
          username LIKE '%${keywordQuery}%'
        )
        AND role = 'admin'
        ${
          sort
            ? `ORDER BY ${sortBy ?? "id"} ${sort ?? "DESC"}`
            : "ORDER BY id DESC"
        }
        LIMIT ${totalRowQuery}
        OFFSET ${totalRowQuery * offsetQuery}
    `;

    const listUser = await db.sequelize.query(
      queryString,
      selectFormat({}, db.sequelize.User)
    );

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: {
        data: listUser,
        page: page ?? 1,
        totalRow: totalRowQuery,
        sort: sort ?? "desc",
        totalData: listUser.length,
        keyword: keywordQuery,
        sortBy: sortBy ?? "id",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const CreateUser = async (
  req: UserRequest,
  res: BasicResponse,
  next: NextFunction
) => {
  const { fullName, username, ipUser, password } = req.body;

  try {
    const createUser = await db.User.create({
      fullName,
      username,
      ipUser,
      role: "user",
      password,
    });

    if (createUser) {
      res.status(200).json({
        statusCode: 200,
        message: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const CreateAdmin = async (
  req: UserRequest,
  res: BasicResponse,
  next: NextFunction
) => {
  const { fullName, username, ipUser, password } = req.body;

  try {
    const createUser = await db.User.create({
      fullName,
      username,
      ipUser,
      role: "admin",
      password,
    });

    if (createUser) {
      res.status(200).json({
        statusCode: 200,
        message: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (
  req: UserRequest,
  res: BasicResponse,
  next: NextFunction
) => {
  const { userId: id } = req.params;
  const { ipUser, fullName, username } = req.body;

  try {
    const updateUser = await db.User.update(
      {
        ipUser,
        fullName,
        username,
      },
      { where: { id } }
    );

    if (!!updateUser[0]) {
      res.status(200).json({
        statusCode: 200,
        message: "success",
      });
    } else {
      throw createError(404, {
        name: "NotFound",
        message: "User tidak terdaftar",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (
  req: UserRequest,
  res: BasicResponse,
  next: NextFunction
) => {
  const { userId: id } = req.params;

  try {
    const deleteUser = await db.User.destroy({ where: { id } });

    if (deleteUser) {
      res.status(200).json({
        statusCode: 200,
        message: "success",
      });
    }
  } catch (error) {
    next(error);
  }
};
