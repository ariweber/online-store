import { checkout, getOrders } from "../services/orders.service.js";

export async function checkoutOrder(req, res, next) {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is required" });
    }

    const result = await checkout(customerId);

    if (!result.ok) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, data: result.order });
  } catch (err) {
    console.log(e);
    ;
  }
}

export async function listOrders(req, res, next) {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is required" });
    }

    const orders = await getOrders(customerId);
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.log(e);
    ;
  }
}
