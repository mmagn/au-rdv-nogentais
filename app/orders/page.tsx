import OrderForm from "@/components/OrderForm";
import { PrismaClient } from "@prisma/client";
import OrderList from "./OrderList";

export default async function OrdersPage() {
  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    include: {
      items: true,
    },
  });

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-10 mb-10 px-2">
      <OrderForm />
      <OrderList orders={orders} />
    </div>
  );
}
