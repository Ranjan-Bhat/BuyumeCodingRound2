import React, { useState } from "react";
import "./ProductComponent.css";

const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 }
];
console.log("Products ", Products);

const ProductList = ({ addToCart }) => {
  return (
    <div>
      <h2> Product List </h2>
      <ul>
        {Products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// const ProductList = ({ addToCart, cartItems }) => {
//   const getCartItemQuantity = (productId) = {
//     const item = cartItems.find(item => item.product.id === product.id);
//     return item ? item.quantity : 0;
//   };

//   return (
//     <div className="box">
//       <h2>Product List</h2>
//       <ul>
//         {Products.map(product => (
//           <li key={product.id}>
//             <span>{product.name} - ${product.price}</span>
//             <div>
//               <button onClick={()=> addToCart(product)}>+</button>
//               <span>{getCartItemQuantity(product.id)}</span>
//               <button onClick={()=> addToCart(product, true)}>-</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const Cart = ({ cartItems, removeFromCart }) => {
  if (cartItems.length === 0) {
    return <p>No product added to the cart</p>;
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}>
            {item.product.name} - ${item.product.price} (Quanitity:
            {item.quantity})
            <button onClick={() => removeFromCart(item.product)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice(cartItems)}</p>
    </div>
  );
};

const calculateTotalPrice = (cartItems) => {
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });
  return totalPrice;
};

const ProductComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
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
      <div className="left-box">
        <ProductList addToCart={addToCart} />
      </div>
      <div className="right-box">
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default ProductComponent;
