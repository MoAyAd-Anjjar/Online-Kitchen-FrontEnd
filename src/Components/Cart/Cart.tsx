import React, { useState, useEffect } from 'react';
import './Cart.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Add quantity property
}

const initialProducts: Product[] = [
  { id: 1, name: 'Beef Burger', price: 199.99, image: 'https://static01.nyt.com/images/2022/06/27/dining/kc-mushroom-beef-burgers/merlin_209008674_b3fa58fa-9bb1-4cfe-a08a-40b4dda0de78-superJumbo.jpg', quantity: 1 },
  { id: 2, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 3, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 4, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 5, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 6, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 7, name: 'Grilled Chicken', price: 999.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuC2DselGxx3dvaMGvjBRRtwUwtyE2awiMCQ&s', quantity: 1 },
  { id: 8, name: 'Cheese Pizza', price: 349.99, image: 'https://thestayathomechef.com/wp-content/uploads/2023/07/Easy-Cheese-Pizza_Square-1.jpg', quantity: 1 },
  { id: 9, name: 'Cheese Pizza', price: 349.99, image: 'https://thestayathomechef.com/wp-content/uploads/2023/07/Easy-Cheese-Pizza_Square-1.jpg', quantity: 1 },
  { id: 10, name: 'Cheese Pizza', price: 349.99, image: 'https://thestayathomechef.com/wp-content/uploads/2023/07/Easy-Cheese-Pizza_Square-1.jpg', quantity: 1 },
  { id: 11, name: 'Cheese Pizza', price: 349.99, image: 'https://thestayathomechef.com/wp-content/uploads/2023/07/Easy-Cheese-Pizza_Square-1.jpg', quantity: 1 },
];

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState<number>(0);

  // Call the updateTotal function whenever the cart changes
  useEffect(() => {
    updateTotal(cart);
  }, [cart]);

  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => {
  //     const newCart = [...prevCart, { ...product, quantity: 1 }];
  //     return newCart;
  //   });
  // };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      return newCart;
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + change } : item
      ).filter(item => item.quantity > 0); // Prevent negative quantity
      return newCart;
    });
  };

  const updateTotal = (cart: Product[]) => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Food List</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item-details">
                  <img src={product.image} alt={product.name} className="cart-item-image" />
                  <div>
                    <h2 className="cart-item-name">{product.name}</h2>
                    <p className="cart-item-price">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(product.id, -1)} className="quantity-button">-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, 1)} className="quantity-button">+</button>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="cart-item-remove">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-summary">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        )}

        <div className="cart-checkout">
          {cart.length > 0 &&
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="checkout-button"
            >
              Checkout
            </button>
          }</div>
      </div>
    </div>
  );
};

export default CartPage;
