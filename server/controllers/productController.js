const db = require('../db');

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
      const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      if (!product || product.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
      }

      //if nto empty this is returned 
      res.json(product[0]);
  } catch (err) {
      console.error('Error fetching product:', err.message);
      res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price, description, quantity, category_id, brand_id, color_id, size_id, image } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, description, quantity, category_id, brand_id, color_id, size_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, price, description, quantity, category_id, brand_id, color_id, size_id, image]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, category_id, brand_id, color_id, size_id, image } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE products SET name = ?, price = ?, description = ?, quantity = ?, category_id = ?, brand_id = ?, color_id = ?, size_id = ?, image = ? WHERE id = ?',
      [name, price, description, quantity, category_id, brand_id, color_id, size_id, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
