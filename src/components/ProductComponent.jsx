import React, { useState } from "react";
import "./ProductComponent.css";

const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 }
];
console.log("Products ", Products);

let item = 0;

const ProductList = ({ addToCart, cartItems }) => {
  const getCartItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="box">
      <h2>Product List</h2>
      <ul>
        {Products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <div>
              <button onClick={() => addToCart(product)}>+</button>
              <span>{getCartItemQuantity(product.id)}</span>
              <button onClick={() => addToCart(product, true)}>-</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = ({ cartItems, removeFromCart }) => {
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };

  if (cartItems.length === 0) {
    return (
      <div className="box">
        <h2>Cart</h2>
        <p>No Product added to the cart</p>
      </div>
    );
  }

  return (
    <div className="box">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}>
            <span>
              {item.product.name} - ${item.product.price}
            </span>
            <div>
              <button onClick={() => removeFromCart(item.product)}>
                Remove
              </button>
              <span>Quantity: {item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
    </div>
  );
};

const ProductComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, decrement = false) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          const updatedQuantity = decrement
            ? item.quantity - 1
            : item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      const newItem = { product: product, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeFromCart = (product) => {
    const updatedItems = cartItems.filter(
      (item) => item.product.id !== product.id
    );
    setCartItems(updatedItems);
  };
  return (
    <div className="container">
      <ProductList addToCart={addToCart} cartItems={cartItems} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductComponent;
