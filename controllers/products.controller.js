import { getFilteredProducts } from "../services/products.servich.js";

export async function getProducts(req, res, next) {
  try {
    const products = await getFilteredProducts(req.query);
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log(e);
    ;
  }
}
