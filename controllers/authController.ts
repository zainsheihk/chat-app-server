import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { UserType, userSchema } from "../utils/validation.schema";
import jwt from "jsonwebtoken";

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
      return res.json({ message: "User not found", status: false });
    } else {
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      return res.json({
        message: "User found",
        status: true,
        data: { user, token },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as UserType;
    const checkUserExists = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!checkUserExists) {
      const data = await userSchema.validate(body);
      const newUser = await prisma.user.create({
        data: { ...data },
      });
      return res.json({ message: "User created", status: true, data: newUser });
    } else {
      return res.status(409).json({
        message: "Email is Already used, Please create with new Email.",
        status: true,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
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
      return res
        .status(401)
        .json({
          status: false,
          message: "You are not logged in, please provide token to gain access",
        });
    }
  } catch (error: any) {
    next();
    return res.status(500).json({ type: error.name, message: error.message });
  }
};
