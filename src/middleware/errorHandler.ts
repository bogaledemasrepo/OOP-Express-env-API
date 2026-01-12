import { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { ValidateError } from "tsoa";

export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  // Inside your errorHandler function in src/app.ts
if (err instanceof Error && err.message === "No token provided") {
  return res.status(401).json({ message: "Unauthorized" });
}

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields, // This contains exactly which field failed and why
    });
  }
  
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}