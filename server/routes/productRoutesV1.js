const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/authmiddleware');  

const { getProductById, getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');


//Describes the GET request to retrieve all products in the store.
//automatically generate interactive API documentation based on the routes
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch a list of all products in the store
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
router.get('/', getAllProducts);  

/**
 * @swagger
 * /api/v1/products/search:
 *   get:
 *     summary: Search for products by name
 *     description: Search products by name
 *     parameters:
 *       - name: query
 *         in: query
 *         description: The search query for the product name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products that match the search query
 *       404:
 *         description: No products found
 */


//Search Products by Name
router.get('/search', async (req, res) => {
  const { query } = req.query;
  console.log('Received search query:', query);
  
  try {
    const [products] = await db.query('SELECT * FROM products WHERE name LIKE CONCAT("%", ?, "%") LIMIT 10', [query]);
    console.log('Found products:', products);
    res.json(products);
  } catch (err) {
    console.error('Error searching products:', err.message);
    res.status(500).json({ message: 'Error searching products', error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Add a new product
 *     description: Create a new product in the store
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               image:
 *                 type: string
 *               discount:
 *                 type: string
 *               gender:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *               color_id:
 *                 type: integer
 *               size_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Invalid input data
 */


// Add a New Product only admin can add products
router.post('/', authenticateToken, authorizeRole(1), async (req, res) => {
  const { name, description, price, image, discount, gender, quantity, category_id, brand_id, color_id, size_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO products (name, description, price, image, discount, gender, quantity, category_id, brand_id, color_id, size_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, image, discount, gender, quantity, category_id, brand_id, color_id, size_id]
    );
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(400).json({ message: 'Invalid input data', error: err.message });
  }
});
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/v1/products/admin/products:
 *   get:
 *     summary: Get all products for admin dashboard
 *     description: Fetch all products for the admin to manage
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */


//Get All Products for Admin

router.get('/admin/products', authenticateToken, authorizeRole(1), async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send({ error: 'Failed to fetch products' });
  }
});


//Get Random Recommended Products
router.get('/recommended', async (req, res) => {
  try {
    const [recommendedProducts] = await db.query(
      `SELECT id, name, price, image FROM products ORDER BY RAND() LIMIT 4`
    );
    res.json(recommendedProducts);
  } catch (err) {
    console.error('Error fetching recommended products:', err.message);
    res.status(500).json({ message: 'Failed to fetch recommended products' });
  }
});

router.put('/:id', authenticateToken, authorizeRole(1), updateProduct);
router.delete('/:id', authenticateToken, authorizeRole(1), deleteProduct);

module.exports = router;
