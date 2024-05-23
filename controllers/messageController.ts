import { NextFunction, Request, Response } from "express";
import { messageSchema } from "../utils/validations/message.schema";
import { prisma } from "../utils/prismaClient";

export const sendMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = request.body;
    const data = await messageSchema.validate(body);
    const { to, from, message } = data;
    const getUser = (global as any).onlineUsers.get(to);
    const newMessage = await prisma.messages.create({
      data: {
        message,
        sender: {
          connect: {
            id: parseInt(from),
          },
        },
        reciever: {
          connect: {
            id: parseInt(to),
          },
        },
        messageStatus: getUser ? "delivered" : "sent",
      },
      include: {
        sender: true,
        reciever: true,
      },
    });
    return response
      .status(201)
      .json({ data: newMessage, message: "message sent" });
  } catch (error: any) {
    next();
    return response
      .status(500)
      .json({ type: error.name, message: error.message });
  }
};

export const getMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = request.params;
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            recieverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            recieverId: parseInt(from),
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (error: any) {
    next();
    return response
      .status(500)
      .json({ type: error.name, message: error.message });
  }
};
