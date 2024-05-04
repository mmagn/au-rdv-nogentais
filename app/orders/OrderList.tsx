import FormattedPrice from "@/components/FormattedPrice";
import {
  dateHumanized,
  hoursHumanized,
  paymentMethodHumanized,
} from "@/lib/order";
import React from "react";
import ShowOrderButton from "./ShowOrderButton";
import { Order, Prisma } from "@prisma/client";
import OrderItems from "@/components/OrderItems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type OrderListProps = {
  orders: Prisma.OrderGetPayload<{
    include: {
      items: true;
    };
  }>[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Commandes précédentes</h1>
      <div className="flex flex-col divide-y divide-gray-500">
        <div className="flex flex-row font-bold mb-2">
          <div className="flex-1">Date</div>
          <div className="flex-1 text-right">Total</div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {orders.map((order) => (
            <AccordionItem value={order.id} key={order.id}>
              <AccordionTrigger>
                <div key={order.id} className="flex-1 flex flex-row pt-1 mb-1">
                  <div className="flex-1 font-mono text-left">
                    {hoursHumanized(order.createdAt)}
                  </div>
                  <div className="flex-1 flex flex-col text-right">
                    <FormattedPrice value={order.total} />
                    <span>{paymentMethodHumanized(order.paymentMethod)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <OrderItems items={order.items} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
