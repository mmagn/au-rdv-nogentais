import OrderForm from "@/components/OrderForm";
import { PrismaClient } from "@prisma/client";
import OrderList from "@/components/OrderList";
import OrdersTotal from "@/components/OrdersTotal";
import { dateHumanized } from "@/lib/order";

export default async function OrdersPage() {
  const prisma = new PrismaClient();

  const today = new Date();

  const orders = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: {
      createdAt: {
        gte: new Date(today.setHours(0, 0, 0, 0)),
      },
    },
    include: {
      items: true,
    },
  });

  const nonDeletedOrders = orders.filter((o) => !o.deletedAt);

  const totalCash = nonDeletedOrders
    .filter((o) => o.paymentMethod === "cash")
    .reduce((acc, order) => acc + order.total, 0);
  const totalCard = nonDeletedOrders
    .filter((o) => o.paymentMethod === "card")
    .reduce((acc, order) => acc + order.total, 0);
  const totalCheck = nonDeletedOrders
    .filter((o) => o.paymentMethod === "check")
    .reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-10 mb-10 px-2">
      <OrderForm />
      <h3 className="text-2xl font-bold">
        Commandes du {dateHumanized(today)}
      </h3>
      <OrderList orders={orders} />
      <OrdersTotal
        totalCash={totalCash}
        totalCard={totalCard}
        totalCheck={totalCheck}
      />
    </div>
  );
}
