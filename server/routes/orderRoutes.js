const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken } = require("../middleware/authmiddleware");

router.post("/", authenticateToken, async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided for the order." });
  }

  try {
    let total_price = 0;

    for (let item of items) {
      const { product_id, quantity } = item;

      const [product] = await db.query("SELECT price FROM products WHERE id = ?", [product_id]);
      if (product.length === 0) {
        return res.status(404).json({ message: `Product with ID ${product_id} not found.` });
      }

      total_price += product[0].price * quantity;
    }

    const [orderResult] = await db.query(
      "INSERT INTO orders (client_id, total_price, status) VALUES (?, ?, ?)",
      [userId, total_price, "Pending"]
    );

    const orderId = orderResult.insertId;

    for (let item of items) {
      const { product_id, quantity } = item;

      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, product_id, quantity]
      );
    }

    res.status(201).json({ message: "Order placed successfully.", orderId });
  } catch (err) {
    console.error("Error placing the order:", err.message);
    res.status(500).json({ message: "Failed to place the order.", error: err.message });
  }
});

module.exports = router;
