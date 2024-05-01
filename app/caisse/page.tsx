"use client"; // Add this at the top of the file

import FormattedPrice from "@/components/FormattedPrice";
import { useState } from "react";

export default function Caisse() {
  // Initialize state for items
  const [items, setItems] = useState([
    { name: "Café", price: 0.5, quantity: 0 },
    { name: "Bière", price: 4, quantity: 0 },
  ]);

  // Handler to update quantity
  const updateQuantity = (index: number, amount: number) => {
    const newItems = [...items];
    // Increment or decrement quantity, ensuring it's not negative
    newItems[index].quantity = Math.max(newItems[index].quantity + amount, 0);
    setItems(newItems);
  };

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      <h1>Caisse</h1>

      {items.map((item, index) => (
        <div key={item.name}>
          <div className="flex gap-x-4">
            <div className="flex-1">{item.name}</div>
            <div className="flex-1">{item.price}</div>

            <div className="flex gap-x-2">
              <span>{item.quantity}</span>
              <div>
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="bg-green-500 text-white p-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex-1 text-right">
              <FormattedPrice value={item.price * item.quantity} />
            </div>
          </div>
        </div>
      ))}

      {/* TOTAL Line */}
      <div className="flex flex-1 justify-between font-bold mt-4">
        <div className="flex-1">TOTAL</div>
        <div className="flex-1 text-right">
          <FormattedPrice value={totalPrice} />
        </div>
      </div>
    </>
  );
}
