import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cart/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();

  // ✅ Always fallback to [] if state.cart.items is undefined
  const cartItems = useSelector((state) => state.cart.items) || [];

  // Calculate totals safely
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total Items: {totalQuantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button
              className="checkout-btn"
              onClick={() => dispatch(clearCart())}
            >
              ✅ Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
