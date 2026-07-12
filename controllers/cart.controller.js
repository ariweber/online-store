import {
  addToCart,
  getCart,
  removeFromCart,
} from "../services/customers.service.js";

export async function viewCart(req, res, next) {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is required" });
    }

    const result = await getCart(customerId);

    if (!result.ok) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, data: result.cart });
  } catch (err) {
    console.log(e);
  }
}

export async function addItemToCart(req, res, next) {
  try {
    const { customerId, productId, quantity } = req.body;

    if (!customerId || productId === undefined || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "customerId, productId and quantity are required",
      });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "quantity must be an integer greater than 0",
      });
    }

    const result = await addToCart(customerId, productId, quantity);

    if (!result.ok) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, data: result.cart });
  } catch (err) {
    console.log(e);
  }
}

export async function removeItemFromCart(req, res, next) {
  try {
    const { productId } = req.params;
    const { customerId } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is required" });
    }

    const result = await removeFromCart(customerId, productId);

    if (!result.ok) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, data: result.cart });
  } catch (err) {
    console.log(e);
  }
}
