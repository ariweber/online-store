import { Router } from "express";
import { getAccountBalance } from "../controllers/account.controller.js";

const router = Router();

router.get("/balance", getAccountBalance);

export default router;
