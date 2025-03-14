import { updateMember } from "@/actions/members";
import MemberForm from "@/components/MemberForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const prisma = new PrismaClient();
  const { id } = params;

  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-10 mb-10 px-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Détails du membre</h1>
        <div className="text-sm font-mono">
          N° {member.memberNumber.toString().padStart(4, "0")}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <div>
          Inscrit le{" "}
          {new Date(member.lastRegisteredAt).toLocaleDateString("fr-FR")}
        </div>
        <div>
          Créé le {new Date(member.createdAt).toLocaleDateString("fr-FR")}
        </div>
        <div>
          Dernière mise à jour le{" "}
          {new Date(member.updatedAt).toLocaleDateString("fr-FR")}
        </div>
      </div>

      <MemberForm
        onSubmit={updateMember}
        member={{
          id: member.id,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email || "",
          phone: member.phone || "",
          zip: member.zip || "",
          city: member.city || "",
          address: member.address || "",
          isLessThan14YearsOld: member.isLessThan14YearsOld,
        }}
      />
    </div>
  );
}
