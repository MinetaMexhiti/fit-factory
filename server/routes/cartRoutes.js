const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authmiddleware');  
const { addToCart, updateCartItem, removeCartItem, getCartItems } = require('../controllers/cartController');

router.get('/', authenticateToken, getCartItems); 
router.post('/', authenticateToken, addToCart);  
router.put('/:id', authenticateToken, updateCartItem);  
router.delete('/:id', authenticateToken, removeCartItem);  

module.exports = router;
