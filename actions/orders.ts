"use server";

import { total } from "@/lib/order";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrder = async (
  paymentMethod: string,
  items: { quantity: number; price: number; name: string }[]
) => {
  const prisma = new PrismaClient();

  const order = await prisma.order.create({
    data: {
      paymentMethod,
      total: total(items),
      items: {
        create: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  revalidatePath("/orders");

  return order;
};
