"use server";

import { total } from "@/lib/order";
import { PrismaClient } from "@prisma/client";

export const createOrder = async (
  paymentMethod: string,
  items: { quantity: number; price: number; name: string }[]
) => {
  const prisma = new PrismaClient();

  return await prisma.order.create({
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
};
