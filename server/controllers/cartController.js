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
       //userId is passed as a parameter to ensure we fetch only the cart items for the current user
      [userId]
    );
//By logging the cart items, you can see what data was fetched from the database before the rest of the logic is executed.
    console.log('Fetched Cart Items:', cartItems);
    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'No items in cart.' });
    }
//If cart items are found, we respond with a 200 status and send the cart items as a JSON response.
    res.status(200).json(cartItems); 
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    res.status(500).json({ message: 'Failed to fetch cart items', error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  //we extract product id and quantity fro mreq body andget user id 
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  //validation: We ensure that productId and quantity are valid. received fro mfrontedn
  console.log('Received data from frontend:', { productId, quantity });  // Log received productId and quantity
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity' });
  }

  try {
    // Check if product exists in the database
    const [productExists] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
    console.log('Product exists in DB:', productExists);  // Log the result of the query
    if (productExists.length === 0) {
      return res.status(400).json({ message: 'Product does not exist.' });
    }

    // Check if the product is already in the user's cart
    const [existingItem] = await db.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [userId, productId]);
    console.log('Existing cart item:', existingItem);  // Log the result of the existing cart item query

    // If the product is already in the cart
    if (existingItem.length > 0) {
      await db.query('UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
    } else {   //If Not in Cart: We insert the new product into the cart for the user. 
      await db.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
    }

    res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (err) {
    console.error('Error adding item to cart:', err.message);
    res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
  }
};
 


//ok
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

    //else updateed
    console.log('Cart item updated:', { cartId, userId, quantity });
    res.status(200).json({ message: 'Cart item updated successfully.' });
  } catch (err) {
    console.error('Error updating cart item:', err.message);
    res.status(500).json({ message: 'Failed to update cart item', error: err.message });
  }
};


//ok
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
