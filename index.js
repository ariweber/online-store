import express from "express";
import {writeToJson} from "./storage/fileDB.js"
import productsRouter from "./routes/products.routes.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the online clothing store");
});

app.use("/products", productsRouter)

app.listen(PORT, () => {
  console.log("server raninig...");
});


