"use client";
import { Prisma } from "@prisma/client";

export type ShowOrderButtonProps = {
  order: Prisma.OrderGetPayload<{
    include: {
      items: true;
    };
  }>;
};

export default function ShowOrderButton({ order }: ShowOrderButtonProps) {
  return <button onClick={() => alert(JSON.stringify(order))}>ooo</button>;
}
