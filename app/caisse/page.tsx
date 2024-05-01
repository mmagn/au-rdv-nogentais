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

      <div className="flex flex-col divide-y divide-gray-500">
        {items.map((item, index) => (
          <div key={item.name} className="py-4">
            <div className="flex gap-x-4 ">
              <div className="flex flex-1 items-center">
                <span>{item.name}</span>
              </div>
              <div className="flex flex-1 items-center">
                <FormattedPrice value={item.price} />
              </div>

              <div className="flex gap-x-2 items-center bg-gray-500 rounded-lg p-2">
                <span>{item.quantity}</span>
                <div>
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="bg-red-500 text-white py-1 px-3 rounded-full rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="bg-green-500 text-white py-1 px-3 rounded-full rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end">
                <FormattedPrice value={item.price * item.quantity} />
              </div>
            </div>
          </div>
        ))}

        {/* TOTAL Line */}
        <div className="flex flex-1 justify-between font-bold py-4">
          <div className="flex-1">TOTAL</div>
          <div className="flex-1 text-right">
            <FormattedPrice value={totalPrice} />
          </div>
        </div>
      </div>
    </>
  );
}
