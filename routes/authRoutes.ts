import { Router } from "express";
import { checkUser, createUser, getUser } from "../controllers/authController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/check-user", checkUser);
router.post("/create-user", createUser);
router.get("/get-user", verifyToken, getUser);

export default router;
