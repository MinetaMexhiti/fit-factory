const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming your database connection is in the db module

// Advanced product search route
router.get('/search', async (req, res) => {
    // Destructure query parameters from the request
    const { gender, category_id, brand_id, price_min, price_max } = req.query;

    // Start query with a base condition (1=1 ensures all records are selected initially)
    let query = 'SELECT * FROM Products WHERE 1=1';
    const queryParams = [];

    // Apply filters based on the query parameters
    if (gender) {
        query += ' AND gender = ?'; // Add gender filter
        queryParams.push(gender.trim()); // Add gender to query parameters
    }
    if (category_id) {
        query += ' AND category_id = ?'; // Add category filter
        queryParams.push(category_id); // Add category_id to query parameters
    }
    if (brand_id) {
        query += ' AND brand_id = ?'; // Add brand filter
        queryParams.push(brand_id); // Add brand_id to query parameters
    }
    if (price_min) {
        query += ' AND price >= ?'; // Add minimum price filter
        queryParams.push(price_min); // Add min price to query parameters
    }
    if (price_max) {
        query += ' AND price <= ?'; // Add maximum price filter
        queryParams.push(price_max); // Add max price to query parameters
    }

    try {
        // Run the query with parameters
        const [products] = await db.query(query, queryParams);
        res.json(products); // Send filtered products as response
    } catch (error) {
        // Handle any errors with a 500 status code and an error message
        res.status(500).json({ error: 'Error searching products' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM Products');
        res.json(products); // Return all products
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query('SELECT * FROM Products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product[0]); // Return the product details
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving product' });
    }
});

module.exports = router;
