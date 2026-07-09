import {
  getFilteredProducts,
  getProductById,
} from "../services/products.servich.js";

export async function getProducts(req, res) {
  const products = await getFilteredProducts(req.query);
  res.json(products);
}
