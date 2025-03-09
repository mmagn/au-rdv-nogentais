"use client";

import { createOrder } from "@/actions/orders";
import { getMenu } from "@/data/menu";
import { OrderItem } from "@prisma/client";
import { useState } from "react";
import FormattedPrice from "./FormattedPrice";
import OrderItems from "./OrderItems";
import OrderSubmitButton from "./OrderSubmitButton";
import { useToast } from "./ui/use-toast";

export type OrderFormProps = {};

export type OrderItemForm = {
  name: string;
  price: number;
  quantity: number;
};

export default function OrderForm({}: OrderFormProps) {
  // Initialize state for items
  const [items, setItems] = useState<OrderItemForm[]>(getMenu());

  // Handler to update quantity
  const updateQuantity = (index: number, amount: number) => {
    const newItems = [...items];
    // Increment or decrement quantity, ensuring it's not negative
    newItems[index].quantity = Math.max(newItems[index].quantity + amount, 0);
    setItems(newItems);
  };

  const selectedItems = items.filter((item) => item.quantity > 0);

  const { toast } = useToast();

  const handlePayment = async (formData: FormData) => {
    const items = JSON.parse(formData.get("items") as string);

    await createOrder(
      formData.get("paymentMethod") as string,
      items,
      navigator.userAgent
    );

    // reset items
    setItems(() => getMenu());

    toast({
      description: "✅ Commande enregistrée",
    });
  };

  return (
    <div>
      <div className="flex flex-col divide-y divide-gray-500">
        {items.map((item, index) => (
          <div key={item.name} className="flex items-center gap-x-4 py-4">
            <div className="flex flex-1 items-center">
              <span>{item.name}</span>
            </div>
            <div className="flex items-center">
              <FormattedPrice value={item.price} />
            </div>

            <div className="flex gap-x-2 items-center bg-gray-200 rounded-lg p-2">
              <div className="flex items-center gap-x-2 font-bold font-mono">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className={`text-white py-1 px-3 rounded-lg ${
                    item.quantity === 0 ? "bg-gray-400" : "bg-red-500"
                  }`}
                >
                  -
                </button>
                <span className="text-xl ">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="bg-green-500 text-white py-1 px-3 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            {/* <div className="flex flex-1 items-center justify-end">
              <FormattedPrice value={item.price * item.quantity} />
            </div> */}
          </div>
        ))}
      </div>

      {/* Recap */}

      <div className="mx-auto mt-4 border-2 border-dashed border-gray-500 p-4 max-w-xs">
        <p className="font-bold text-xl mb-4">Récapitulatif de la commande</p>

        <OrderItems items={selectedItems as OrderItem[]} />

        <div className="flex flex-1 font-bold py-4">
          <form className="flex flex-1" action={handlePayment}>
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(selectedItems)}
            />
            <div className="flex flex-col mx-auto gap-4">
              <OrderSubmitButton
                text="Paiement en Espèces 🪙"
                value="cash"
                disabled={selectedItems.length < 1}
                className="bg-yellow-400 border-yellow-600 text-black"
              />
              <OrderSubmitButton
                text="Paiement en CB 💳"
                value="card"
                disabled={selectedItems.length < 1}
                className="bg-emerald-500 border-emerald-700"
              />
              <OrderSubmitButton
                text="Paiement en Chèque 📄"
                value="check"
                disabled={selectedItems.length < 1}
                className="bg-red-400 border-red-600 text-black"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
