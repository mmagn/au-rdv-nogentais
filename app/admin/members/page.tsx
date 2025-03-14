import { PrismaClient } from "@prisma/client";
import MemberList from "@/components/MemberList";
import MemberSearch from "@/components/MemberSearch";

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
    <div className="mx-auto max-w-lg flex flex-col gap-y-10 mb-10 px-2">
      <h1 className="text-2xl font-bold">Liste des membres</h1>
      <MemberSearch />
      <MemberList members={members} />
    </div>
  );
}
