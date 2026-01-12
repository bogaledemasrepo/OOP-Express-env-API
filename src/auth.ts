import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.headers["authorization"]?.split(" ")[1];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      
      jwt.verify(token!, "YOUR_SECRET_KEY", (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          // Check if the user has the required scopes/roles
          if (scopes && scopes.length > 0) {
            // Logic to check if decoded.role matches scopes
          }
          resolve(decoded);
        }
      });
    });
  }
  return Promise.reject(new Error("Security name not found"));
}