const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', cartSchema);
