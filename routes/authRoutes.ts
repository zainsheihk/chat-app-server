import { Router } from "express";
import { checkUser, createUser } from "../controllers/authController";

const router = Router();

router.post("/check-user", checkUser);
router.post("/create-user", createUser);

export default router;
