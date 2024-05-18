import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request?.header("Authorization");

  if (token === "undefined") {
    response.status(401).json({ type: "authError", message: "Access denied" });
  } else if (token) {
    try {
      const decoded: DecodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
      request.userId = decoded.userId;
      next();
    } catch (error) {
      response
        .status(401)
        .json({ type: "authError", message: "Invalid Token" });
    }
  }
};
