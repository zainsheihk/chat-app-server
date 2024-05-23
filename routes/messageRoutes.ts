import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/messageController";

const router = Router();

router.post("/sent-message", sendMessage);
router.post("/get-message/:from/:to", getMessage);
export default router;
