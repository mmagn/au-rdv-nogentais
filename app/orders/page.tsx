import OrderForm from "@/components/OrderForm";
import { PrismaClient } from "@prisma/client";

export default async function OrdersPage() {
  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany();

  return (
    <div>
      <OrderForm />
      <div>
        <p>{orders.length} Orders</p>
        {orders.map((order) => (
          <p key={order.id}>{order.id}</p>
        ))}
      </div>
    </div>
  );
}
