import { readFromJson, writeToJson } from "../storage/fileDB.js";
import { getCustomerById, saveCustomer } from "./customers.service.js";

const COLLECTION = "orders";
const PRODUCTS = "products";

export async function checkout(customerId) {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { ok: false, status: 404, message: "Customer not found" };
  }

  if (!customer.cart || customer.cart.length === 0) {
    return { ok: false, status: 400, message: "Cart is empty" };
  }

  const products = await readFromJson(PRODUCTS);
  const items = [];
  let total = 0;

  for (const cartItem of customer.cart) {
    const product = products.find((p) => p.id === Number(cartItem.productId));

    if (!product) {
      return {
        ok: false,
        status: 400,
        message: `Product ${cartItem.productId} no longer exists`,
      };
    }

    if (product.stock < cartItem.quantity) {
      return {
        ok: false,
        status: 400,
        message: `Not enough stock for "${product.name}"`,
      };
    }

    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
    });
    total += product.price * cartItem.quantity;
  }

  if (customer.balance < total) {
    return { ok: false, status: 400, message: "Insufficient balance" };
  }


  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    product.stock -= item.quantity;
  }
  await writeToJson(PRODUCTS, products);

t
  customer.balance -= total;
  customer.cart = [];
  await saveCustomer(customer);


  const orders = await readFromJson(COLLECTION);
  const newId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
  const order = {
    id: newId,
    customerId,
    items,
    total,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  orders.push(order);
  await writeToJson(COLLECTION, orders);

  return { ok: true, order };
}

export async function getOrders(customerId) {
  const orders = await readFromJson(COLLECTION);
  return orders.filter((o) => o.customerId === customerId);
}
