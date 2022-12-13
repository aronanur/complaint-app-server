import {
  customValidationFormat,
  validationErrorFormat,
} from "../utils/FormatValue";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorName, HttpErrorCode } from "../types/Error";

/** Declare Error Type  */
interface ErrorProps {
  name: ErrorName;
  message: string;
  statusCode: HttpErrorCode;
  errors: any;
}

const errorHandler: ErrorRequestHandler = (
  err: ErrorProps,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    switch (err.name) {
      case "AuthenticationFailed":
        res.json({
          statusCode: 403,
          message: err.message,
        });
        break;

      case "JsonWebTokenError":
        res.json({
          statusCode: 403,
          message: "Authentication Failed",
        });
        break;

      case "Unauthorized":
        res.json({
          statusCode: 401,
          message: err.message,
        });
        break;

      case "NotFound":
        res.json({
          statusCode: 404,
          message: err.message,
        });
        break;

      case "ManualValidationError":
        res.json({
          statusCode: 400,
          message: err.message,
        });
        break;

      case "CustomValidation":
        res.json({
          statusCode: 400,
          message: customValidationFormat(err.message),
        });
        break;

      case "SequelizeValidationError":
        res.json({
          statusCode: 400,
          message: validationErrorFormat(err.errors),
        });
        break;

      default:
        res.status(500).json({
          statusCode: 500,
          message: err,
        });
        break;
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export default errorHandler;
