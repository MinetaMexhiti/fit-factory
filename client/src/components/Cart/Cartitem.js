const CartItem = ({ item }) => {
  const productPrice = parseFloat(item.product_price) || 0; 

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img
          src={item.image || "/placeholder.jpg"} 
          alt={item.product_name || "Unknown Product"}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <div>
          <h3 className="font-semibold">{item.product_name || "Unknown Product"}</h3>
          <p>${productPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p>Quantity: {item.quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;