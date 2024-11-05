const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Get all products
router.get('/', async (req, res) => {
  try {
      console.log('Executing SQL Query: SELECT * FROM Products'); // Logging the SQL query execution
      const [products] = await db.query('SELECT * FROM Products');
      console.log('Products Retrieved:', products); // Logging the retrieved products
      res.json(products);
  } catch (error) {
      console.error('Error retrieving products:', error.message); // Logging the error details
      res.status(500).json({ error: 'Error retrieving products' });
  }
});


// Get a single product by ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [product] = await db.query('SELECT * FROM Products WHERE id = ?', [productId]);
        if (product.length === 0) return res.status(404).send('Product not found');
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving product' });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id } = req.body;

    // Validate request body
    if (!name || price === undefined || quantity === undefined || !gender) {
        return res.status(400).send('Name, price, quantity, and gender are required');
    }

    try {
        const result = await db.query('INSERT INTO Products (name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id]);
        
        const newProductId = result[0].insertId;
        const newProduct = { id: newProductId, name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id };
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id } = req.body;

    try {
        const [result] = await db.query('UPDATE Products SET name = ?, description = ?, price = ?, discount = ?, gender = ?, quantity = ?, category_id = ?, brand_id = ?, color_id = ?, size_id = ? WHERE id = ?', 
        [name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id, productId]);

        if (result.affectedRows === 0) return res.status(404).send('Product not found');
        
        const updatedProduct = { id: productId, name, description, price, discount, gender, quantity, category_id, brand_id, color_id, size_id };
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [result] = await db.query('DELETE FROM Products WHERE id = ?', [productId]);
        if (result.affectedRows === 0) return res.status(404).send('Product not found');
        
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Advanced Product Search (Finalized version)
router.get('/search', async (req, res) => {
    const { gender, category_id, brand_id, price_min, price_max } = req.query;
    let query = 'SELECT * FROM Products WHERE 1=1';
    const queryParams = [];

    if (gender) {
        query += ' AND gender = ?';
        queryParams.push(gender.trim());
    }
    if (category_id) {
        query += ' AND category_id = ?';
        queryParams.push(category_id);
    }
    if (brand_id) {
        query += ' AND brand_id = ?';
        queryParams.push(brand_id);
    }
    if (price_min) {
        query += ' AND price >= ?';
        queryParams.push(price_min);
    }
    if (price_max) {
        query += ' AND price <= ?';
        queryParams.push(price_max);
    }

    try {
        const [products] = await db.query(query, queryParams);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error searching products' });
    }
});

// Real-Time Product Quantity Tracking
router.get('/:id/quantity', async (req, res) => {
    const productId = req.params.id;
    try {
        const [result] = await db.query('SELECT quantity FROM Products WHERE id = ?', [productId]);
        if (result.length === 0) return res.status(404).send('Product not found');

        const productQuantity = result[0];
        res.json({ product_id: productId, current_quantity: productQuantity.quantity });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving product quantity' });
    }
});

module.exports = router;
