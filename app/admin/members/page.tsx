import { PrismaClient } from "@prisma/client";
import MemberList from "@/components/MemberList";
import MemberSearch from "@/components/MemberSearch";
import TopNav from "@/components/TopNav";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const prisma = new PrismaClient();

  const search = searchParams["search"] as string | undefined;

  const members = await prisma.member.findMany({
    orderBy: [
      {
        lastName: "asc",
      },
      {
        firstName: "asc",
      },
    ],
    where: search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
  });

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-6 mb-10 px-2">
      <TopNav />
      <h1 className="text-2xl font-bold">Liste des adhérents</h1>
      <MemberSearch />
      <MemberList members={members} />
    </div>
  );
}
