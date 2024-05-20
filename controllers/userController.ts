import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (userId) {
      const currentUser = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });
      return res.json({ status: true, data: currentUser });
    } else {
      return res.status(401).json({
        status: false,
        message: "You are not logged in, please provide token to gain access",
      });
    }
  } catch (error: any) {
    next();
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
export const getAllUserExceptCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (userId) {
      const getAllUsers = await prisma.user.findMany({
        where: {
          id: {
            not: Number(userId),
          },
        },
      });
      return res.json({ status: true, data: getAllUsers });
    } else {
      return res.status(401).json({
        status: false,
        message: "You are not logged in, please provide token to gain access",
      });
    }
  } catch (error: any) {
    next();
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
