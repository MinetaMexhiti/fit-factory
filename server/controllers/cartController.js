const db = require('../db'); 

exports.getCartItems = async (req, res) => {
  const userId = req.user.id; 

  try {
    const [cartItems] = await db.query(
      `SELECT c.id AS cart_id, p.id AS product_id, p.name AS product_name, 
              p.image AS product_image, p.price AS product_price, c.quantity 
       FROM carts c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );

    console.log('Fetched Cart Items:', cartItems);

    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'No items in cart.' });
    }

    res.status(200).json(cartItems); 
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;  

  console.log('Received data:', { productId, quantity });

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity' });
  }

  try {
    const [productExists] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

    console.log('Product exists:', productExists);
    
    if (productExists.length === 0) {
      return res.status(400).json({ message: 'Product does not exist.' });
    }

    const [existingItem] = await db.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [userId, productId]);

    console.log('Existing cart item:', existingItem);
    
    if (existingItem.length > 0) {
      await db.query('UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
    } else {
      await db.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }

    console.log('Item added to cart:', { userId, productId, quantity });
    res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (err) {
    console.error('Error adding item to cart:', err.message);
    res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const userId = req.user.id;
  const cartId = req.params.id;

  try {
    const [result] = await db.query(
      `UPDATE carts SET quantity = ? WHERE id = ? AND user_id = ?`,
      [quantity, cartId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    console.log('Cart item updated:', { cartId, userId, quantity });
    res.status(200).json({ message: 'Cart item updated successfully.' });
  } catch (err) {
    console.error('Error updating cart item:', err.message);
    res.status(500).json({ message: 'Failed to update cart item', error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;

  try {
    const [result] = await db.query(
      `DELETE FROM carts WHERE id = ? AND user_id = ?`,
      [cartId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    console.log('Cart item removed:', { cartId, userId });
    res.status(200).json({ message: 'Item removed from cart successfully.' });
  } catch (err) {
    console.error('Error removing cart item:', err.message);
    res.status(500).json({ message: 'Failed to remove cart item', error: err.message });
  }
};
