import { getBalance } from "../services/customers.service.js";

export async function getAccountBalance(req, res, next) {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is required" });
    }

    const result = await getBalance(customerId);

    if (!result.ok) {
      return res
        .status(result.status)
        .json({ success: false, message: result.message });
    }

    return res
      .status(200)
      .json({ success: true, data: { balance: result.balance } });
  } catch (err) {
    console.log(e);
    ;
  }
}
