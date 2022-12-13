export type ErrorName =
  | "AuthenticationFailed"
  | "JsonWebTokenError"
  | "Unauthorized"
  | "NotFound"
  | "ManualValidationError"
  | "CustomValidation"
  | "SequelizeValidationError";

export type HttpErrorCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;
