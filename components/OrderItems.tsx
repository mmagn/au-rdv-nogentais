import { OrderItem } from "@prisma/client";
import React from "react";
import FormattedPrice from "./FormattedPrice";
import { total } from "@/lib/order";

export type OrderItemsProps = {
  items: OrderItem[];
};

export default function OrderItems({ items }: OrderItemsProps) {
  return (
    <>
      <div className="divide-y divide-gray-200">
        {items.length > 0 &&
          items.map((item) => (
            <div key={item.name} className="flex flex-1 py-4">
              <div className="flex flex-col flex-1 justify-center gap-x-2">
                <span>
                  {item.quantity}&nbsp;x&nbsp;{item.name}
                </span>
                <span className="text-gray-400">
                  (<FormattedPrice value={item.price} />)
                </span>
              </div>
              <div className="flex items-start justify-end font-bold">
                <FormattedPrice value={item.price * item.quantity} />
              </div>
            </div>
          ))}
        <div className="flex flex-1 justify-between font-bold py-4">
          <div className="flex-1">TOTAL</div>
          <div className="flex-1 text-right">
            <FormattedPrice value={total(items)} />
          </div>
        </div>
      </div>
    </>
  );
}
