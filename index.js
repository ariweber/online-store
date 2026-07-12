import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import accountRouter from "./routes/account.routes.js";
import ordersRouter from "./routes/orders.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: { message: "Welcome to the online store API" },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/account", accountRouter);
app.use("/orders", ordersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ err });
});

app.listen(PORT, () => {
  console.log(`server running...`);
});
