"use client";

import React, { useState } from "react";
import FormattedPrice from "./FormattedPrice";
import { OrderItem } from "@prisma/client";
import { menu } from "@/data/menu";
import OrderItems from "./OrderItems";

export type OrderFormProps = {};

export type OrderItemForm = {
  name: string;
  price: number;
  quantity: number;
};

export default function OrderForm({}: OrderFormProps) {
  // Initialize state for items
  const [items, setItems] = useState<OrderItemForm[]>(menu);

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

  const selectedItems = items.filter((item) => item.quantity > 0);

  const handlePayment = (formData: FormData) => {
    console.log(JSON.stringify(formData.get("order")));
  };

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
      </div>

      {/* Recap */}

      <div className="mx-auto mt-8 border-2 border-dashed border-gray-500 p-4 max-w-xs">
        <p className="font-bold text-xl mb-4">Récapitulatif de la commande</p>

        <OrderItems items={selectedItems as OrderItem[]} />

        <div className="flex flex-1 font-bold py-4">
          <form action={handlePayment}>
            <input
              type="hidden"
              name="order"
              value={JSON.stringify(selectedItems)}
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={selectedItems.length < 1}
                type="submit"
                name="paymentMethod"
                value="cash"
                className="rounded-lg p-2 bg-yellow-400 disabled:bg-gray-300 disabled:border-gray-500 border-b-4 border-yellow-600 text-black"
              >
                Paiement en Espèces
              </button>
              <button
                disabled={selectedItems.length < 1}
                type="submit"
                name="paymentMethod"
                value="card"
                className="rounded-lg p-2 bg-emerald-700 disabled:text-black disabled:bg-gray-300 disabled:border-gray-500 border-b-4 border-emerald-900"
              >
                Paiement en CB
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
