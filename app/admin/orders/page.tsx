import OrderForm from "@/components/OrderForm";
import OrderList from "@/components/OrderList";
import OrdersTotal from "@/components/OrdersTotal";
import TopNav from "@/components/TopNav";
import { dateHumanized, localDayjs } from "@/lib/dayjs";
import { PrismaClient } from "@prisma/client";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const prisma = new PrismaClient();

  const date = searchParams["date"];

  let today = new Date();
  if (date) {
    today = localDayjs(date as string, "DD-MM-YYYY").toDate();
  }

  const gteDate = new Date(today.setHours(0, 0, 0, 0));

  const orders = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: {
      createdAt: {
        gte: gteDate,
        lt: localDayjs(gteDate).add(1, "day").toDate(),
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
    <div className="mx-auto max-w-lg flex flex-col gap-y-6 mb-10 px-2">
      <TopNav />
      <OrderForm />
      <h3 className="text-2xl font-bold">
        Commandes du {dateHumanized(today)}
      </h3>
      <OrdersTotal
        totalCash={totalCash}
        totalCard={totalCard}
        totalCheck={totalCheck}
      />
      <OrderList orders={orders} />
    </div>
  );
}
