import FormattedPrice from "@/components/FormattedPrice";
import OrderItems from "@/components/OrderItems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { paymentMethodHumanized } from "@/lib/order";
import { Prisma } from "@prisma/client";

import DeleteOrderButton from "./DeleteOrderButton";
import { hoursHumanized } from "@/lib/dayjs";

export type OrderListProps = {
  orders: Prisma.OrderGetPayload<{
    include: {
      items: true;
    };
  }>[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="flex flex-col divide-y divide-gray-500">
      <div className="flex flex-row font-bold mb-2">
        <div className="flex-1">Heure</div>
        <div className="flex-1 text-right">Total</div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {orders.map((order) => (
          <AccordionItem value={order.id} key={order.id}>
            <AccordionTrigger>
              <div
                key={order.id}
                className={`flex-1 flex flex-row pt-1 mb-1 mr-2 ${
                  order.deletedAt ? "text-gray-400" : ""
                }`}
              >
                <div
                  className={`flex-1 font-mono text-left ${
                    order.deletedAt ? "line-through" : ""
                  }`}
                  title={order.createdAt.toJSON()}
                >
                  {hoursHumanized(order.createdAt)}
                </div>
                <div className="flex-1 flex flex-col text-right">
                  {order.deletedAt ? (
                    <span>Commande supprimée</span>
                  ) : (
                    <>
                      <FormattedPrice value={order.total} />
                      <span>{paymentMethodHumanized(order.paymentMethod)}</span>
                    </>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <OrderItems items={order.items} />
              <div className="flex justify-center">
                <DeleteOrderButton order={order} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
