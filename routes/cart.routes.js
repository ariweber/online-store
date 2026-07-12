import { Router } from "express";
import {
  viewCart,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", viewCart);
router.post("/items", addItemToCart);
router.delete("/items/:productId", removeItemFromCart);

export default router;
