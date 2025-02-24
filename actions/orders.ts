"use server";

import { total } from "@/lib/order";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createOrder = async (
  paymentMethod: string,
  items: { quantity: number; price: number; name: string }[],
  userAgent: string
) => {
  const order = await prisma.order.create({
    data: {
      paymentMethod,
      total: total(items),
      userAgent,
      items: {
        create: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  revalidatePath("/admin/orders");

  return order;
};

export const updateOrder = async (id: string, deleted: boolean) => {
  const updatedOrder = await prisma.order.update({
    where: {
      id,
    },
    data: {
      deletedAt: deleted ? new Date() : null,
    },
  });

  revalidatePath("/admin/orders");

  return updatedOrder;
};
