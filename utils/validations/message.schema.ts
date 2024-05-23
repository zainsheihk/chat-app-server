import { object, string, InferType } from "yup";

export const messageSchema = object({
  message: string().required(),
  to: string().required(),
  from: string().required(),
});
export type messageType = InferType<typeof messageSchema>;
