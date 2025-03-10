import { Request, NextFunction, Response } from "express";
import CustomError from "../classes/CustomError";

// types
import ErrorResponse from "../types/ErrorResponse";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(` 🔍 Not Found: ${req.originalUrl} `, 404);
  next(error);
};

const errorHandler = (
  error: unknown, // Accept any error type
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction // Required for Express middleware
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let stack: string | undefined;

  if (error instanceof CustomError) {
    statusCode = error.status || 500;
    message = error.message;
    stack = process.env.NODE_ENV === "production" ? undefined : error.stack;
  } else if (error instanceof Error) {
    message = error.message;
    stack = process.env.NODE_ENV === "production" ? undefined : error.stack;
  }

  res.status(statusCode).json({
    error: { message },
  });
};

export { notFound, errorHandler };
