# Online Store API

A simple REST API for an online store, built with Node.js and Express. Data is stored in local JSON files.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file (you can copy `.env.example`):

   ```
   PORT=3000
   DB_PATH=./data
   STARTING_BALANCE=500
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/`                       | Welcome message          |
| GET    | `/health`                 | Health check             |
| GET    | `/products`               | List all products        |
| GET    | `/cart`                   | View the cart            |
| POST   | `/cart/items`             | Add an item to the cart  |
| DELETE | `/cart/items/:productId`  | Remove an item from cart |
| GET    | `/account/balance`        | Get account balance      |
| GET    | `/orders`                 | List orders              |
| POST   | `/orders/checkout`        | Check out the cart       |

