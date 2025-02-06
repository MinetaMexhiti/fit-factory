const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/authmiddleware');

const { getProductById, getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

/**
 * @swagger
 * /api/v2/products:
 *   get:
 *     summary: Get all products with pagination
 *     description: Fetch a paginated list of products
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: The number of products to retrieve per page
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: string
 *                   image:
 *                     type: string
 *                   discount:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   brand_id:
 *                     type: integer
 *                   color_id:
 *                     type: integer
 *                   size_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [products] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

/**
 * @swagger
 * /api/v2/products/search:
 *   get:
 *     summary: Search for products with pagination and price filtering
 *     description: Search products by name with optional pagination and price range filtering
 *     parameters:
 *       - name: query
 *         in: query
 *         description: The search query for the product name
 *         required: true
 *         schema:
 *           type: string
 *       - name: priceRange
 *         in: query
 *         description: The price range for filtering products (e.g. "20-50")
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: The number of products to retrieve per page
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: A list of products that match the search query and filters
 *       404:
 *         description: No products found
 */
router.get('/search', async (req, res) => {
  const { query, page = 1, priceRange } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM products WHERE name LIKE ?';
  let params = [`%${query}%`];

  if (priceRange) {
    sql += ' AND price BETWEEN ? AND ?';
    const [min, max] = priceRange.split('-');
    params.push(min, max);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  try {
    const [products] = await db.query(sql, params);
    res.json(products);
  } catch (err) {
    console.error('Error searching products:', err.message);
    res.status(500).json({ message: 'Error searching products', error: err.message });
  }
});

router.post('/', authenticateToken, authorizeRole(1), addProduct);

router.put('/:id', authenticateToken, authorizeRole(1), updateProduct);

router.delete('/:id', authenticateToken, authorizeRole(1), deleteProduct);

module.exports = router;
