import { Router } from "express";
import {
  getAllUserExceptCurrent,
  getUser,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/get-user", verifyToken, getUser);
router.get("/get-all-user", verifyToken, getAllUserExceptCurrent);

export default router;
