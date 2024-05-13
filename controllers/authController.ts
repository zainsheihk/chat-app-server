import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User  found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};
