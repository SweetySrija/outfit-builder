import React from "react";
import { useStore } from "../store/useStore";

export default function Cart() {
  const cartItems = useStore((state) => state.cartItems);
  const removeAllFromCart = useStore((state) => state.removeAllFromCart);
  const updateCartItemCount = useStore((state) => state.updateCartItemCount);


  const itemCounts = cartItems.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { ...item, count: 1 };
    } else {
      acc[item.name].count += 1;
    }
    return acc;
  }, {});

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {Object.keys(itemCounts).length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {Object.values(itemCounts).map((item, index) => (
              <li key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  style={{ marginRight: "10px" }}
                />
                <strong>{item.name}</strong> × {item.count}
                <button onClick={() => updateCartItemCount(item.name, +1)} style={{ marginLeft: "10px" }}>
                  +
                </button>
                <button onClick={() => updateCartItemCount(item.name, -1)} style={{ marginLeft: "5px" }}>
                  –
                </button>
              </li>
            ))}
          </ul>
          <button onClick={removeAllFromCart} style={{
            marginTop: "15px",
            padding: "8px 16px",
            backgroundColor: "#444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
            Remove All Items
          </button>
        </>
      )}
    </div>
  );
}