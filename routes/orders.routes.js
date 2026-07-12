import { Router } from "express";
import { checkoutOrder, listOrders } from "../controllers/orders.controller.js";

const router = Router();

router.get("/", listOrders);
router.post("/checkout", checkoutOrder);

export default router;
