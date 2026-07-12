import { readFromJson, writeToJson } from "../storage/fileDB.js";
import { addToCartCheck } from "./products.servich.js";

const COLLECTION = "customers";

export async function getCustomerById(customerId) {
  const customers = await readFromJson(COLLECTION);
  return customers.find((c) => c.customerId === customerId) || null;
}

export async function saveCustomer(customer) {
  const customers = await readFromJson(COLLECTION);

  const index = customers.findIndex(
    (c) => c.customerId === customer.customerId,
  );
  if (index === -1) return;

  customers[index] = customer;

  await writeToJson(COLLECTION, customers);
}

export async function getCart(customerId) {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { ok: false, status: 404, message: "Customer not found" };
  }

  return { ok: true, cart: customer.cart };
}

export async function getBalance(customerId) {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { ok: false, status: 404, message: "Customer not found" };
  }

  return { ok: true, balance: customer.balance };
}

export async function addToCart(customerId, productId, quantity) {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { ok: false, status: 404, message: "Customer not found" };
  }

  const check = await addToCartCheck(productId, quantity);
  if (!check.ok) return check;

  const existing = customer.cart.find(
    (item) => item.productId === Number(productId),
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    customer.cart.push({ productId: Number(productId), quantity });
  }

  await saveCustomer(customer);

  return { ok: true, cart: customer.cart };
}

export async function removeFromCart(customerId, productId) {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    return { ok: false, status: 404, message: "Customer not found" };
  }

  const index = customer.cart.findIndex(
    (item) => item.productId === Number(productId),
  );
  if (index === -1) {
    return { ok: false, status: 404, message: "Product not found in cart" };
  }

  customer.cart.splice(index, 1);

  await saveCustomer(customer);

  return { ok: true, cart: customer.cart };
}
