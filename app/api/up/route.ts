import { PrismaClient } from "@prisma/client";
import { localDayjs } from "@/lib/dayjs";

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  return Response.json({
    status: "ok",
    date: localDayjs(new Date()).toISOString(),
    count: await prisma.orderItem.count(),
  });
}
