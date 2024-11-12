const connection = require('../server'); 

// Get all products
exports.getAllProducts = (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

// Add a new product
exports.addProduct = (req, res) => {
    const { name, price } = req.body; // Assuming product has a name and a price 
    connection.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: results.insertId, name, price });
    });
};

// Update a product
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    connection.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(204).send(); // No content to return
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(204).send(); // No content to return
    });
};
