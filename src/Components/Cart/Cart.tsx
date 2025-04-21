import React, { useState, useEffect } from "react";
import "./Cart.css";
import { CartState, useCartContext } from "../../Provider/CartProvider";
import { useUserContext } from "../../Provider/UserProvider";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const [Cart, setCart] = useState<CartState>();
  const [total, setTotal] = useState<number>(0);
  const {SetAmount}=useUserContext()
  const nav=useNavigate()
  const { cart, removeFromCart, HandelDecares, HandelIncases,clearCart } = useCartContext();

  useEffect(() => {
    setCart(cart);
  }, [cart]);
  useEffect(() => {
    UpdateTotal();
  }, [Cart]);


  const UpdateTotal = () => {
    if (Cart?.userList) {
      const newTotal = Cart.userList.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      setTotal(newTotal);
      SetAmount(newTotal)
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Food List</h1>

        {Cart?.userList.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {Cart?.userList.map((Food) => (
              <div key={Food.id} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={Food.image}
                    alt={Food.name}
                    className="cart-item-image"
                  />
                  <div>
                    <h2 className="cart-item-name">{Food.name}</h2>
                    <p className="cart-item-price">${Food.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => HandelDecares(Food.id)}
                  >
                    -
                  </button>
                  <span>{Food.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => HandelIncases(Food.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(Food.id)}
                  className="cart-item-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.userList.length > 0 && (
          <div className="cart-summary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        )}

        <div className="cart-checkout">
          {cart.userList.length > 0 && (
            <div>

            <button
              onClick={()=>nav("/Payment")}
              className="checkout-button"
              >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="checkout-button"
              >
              Clear List
            </button>
              </div>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
