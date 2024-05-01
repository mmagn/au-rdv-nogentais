"use client";

import React, { useState } from "react";
import FormattedPrice from "./FormattedPrice";

export type OrderFormProps = {};

export default function OrderForm({}: OrderFormProps) {
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

  const summaryItems = items.filter((item) => item.quantity > 0);

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
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg rounded"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="bg-green-500 text-white py-1 px-3 rounded-lg rounded"
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

      {/* Recap */}

      <div className="mx-auto mt-8 border-2 border-dashed border-gray-500 p-4 max-w-xs">
        <p className="font-bold text-xl mb-4">Récapitulatif de la commande</p>
        {summaryItems.length > 0 &&
          summaryItems.map((item) => (
            <div key={item.name} className="flex flex-1">
              <div className="flex flex-1 items-center gap-x-2">
                <span>
                  {item.quantity}&nbsp;x&nbsp;{item.name}
                </span>
                <span className="text-gray-400">
                  (<FormattedPrice value={item.price} />)
                </span>
              </div>
              <div className="flex flex-1 items-center justify-end font-bold">
                <FormattedPrice value={item.price * item.quantity} />
              </div>
            </div>
          ))}
        <div className="flex flex-1 justify-between font-bold py-4">
          <div className="flex-1">TOTAL</div>
          <div className="flex-1 text-right">
            <FormattedPrice value={totalPrice} />
          </div>
        </div>

        <div className="flex flex-1 font-bold py-4">
          <div className="grid grid-cols-2 gap-4">
            <button className="rounded-lg p-2 bg-yellow-500 text-black">
              Paiement en Espèces
            </button>
            <button className="rounded-lg p-2 bg-emerald-700">
              Paiement en CB
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
