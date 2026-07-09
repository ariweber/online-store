import { readFromJson } from "../storage/fileDB.js";

const COLLECTION = "products";

export async function getFilteredProducts({ inStock, maxPrice, search } = {}) {
  let products = await readFromJson(COLLECTION);

  if (inStock) {
    products = products.filter((p) => p.stock > 0);
  }

  if (maxPrice !== undefined) {
    products = products.filter((p) => p.price <= maxPrice);
  }

  if (search) {
    const term = search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(term));
  }

  return products;
}

export async function getProductById(id) {
  const products = await readFromJson(COLLECTION);
  return products.find((p) => p.id === Number(id)) || null;
}

export async function addToCartCheck(id, quantity) {
  const product = await getProductById(id);

  if (!product) {
    return { ok: false, message: "Product not found" };
  }

  if (product.stock < quantity) {
    return { ok: false, message: `Only ${product.stock} left in stock` };
  }

  return { ok: true, product };
}
