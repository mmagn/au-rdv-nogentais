import { PrismaClient } from "@prisma/client";
import { localDayjs } from "@/lib/dayjs";

export const fetchCache = "force-no-store";
export const revalidate = 3600;

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  return Response.json({
    status: "ok",
    date: localDayjs(new Date()).toISOString(),
    count: await prisma.orderItem.count(),
  });
}
