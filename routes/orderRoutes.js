const express = require('express');
const router = express.Router();
const db = require('../db');

// Place a New Order
router.post('/', async (req, res) => {
    const { client_id, products, shipping_address, billing_address } = req.body;

    // Basic validation
    if (!client_id || !products || !products.length || !shipping_address || !billing_address) {
        return res.status(400).json({ error: 'Client ID, Products, Shipping Address, and Billing Address are required' });
    }

    try {
        let total_price = 0;

        for (let item of products) {
            const { product_id, quantity } = item;

            const [productResult] = await db.query('SELECT price FROM Products WHERE id = ?', [product_id]);
            if (productResult.length === 0) {
                return res.status(404).json({ error: `Product with ID ${product_id} not found` });
            }

            const productPrice = productResult[0].price;
            total_price += productPrice * quantity;
        }

        const [orderResult] = await db.query(
            'INSERT INTO Orders (client_id, total_price, status, shipping_address, billing_address) VALUES (?, ?, ?, ?, ?)',
            [client_id, total_price, 'Pending', shipping_address, billing_address]
        );

        const newOrderId = orderResult.insertId;

        for (let item of products) {
            const { product_id, quantity } = item;

            const [productResult] = await db.query('SELECT price FROM Products WHERE id = ?', [product_id]);
            const productPrice = productResult[0].price;

            await db.query(
                'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [newOrderId, product_id, quantity, productPrice]
            );
        }

        res.status(201).json({
            message: 'Order placed successfully',
            order: {
                id: newOrderId,
                client_id,
                products,
                total_price,
                status: 'Pending',
                shipping_address,
                billing_address
            }
        });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: 'Error placing order', details: error.message });
    }
});

module.exports = router;
