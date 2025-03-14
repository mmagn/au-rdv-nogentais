import { Member } from "@prisma/client";
import Link from "next/link";

export type MemberListProps = {
  members: Member[];
};

export default function MemberList({ members }: MemberListProps) {
  if (members.length === 0) {
    return <div className="text-center py-8">Aucun membre trouvé</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {members.map((member) => (
        <div key={member.id} className="py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">
                {member.lastName.toUpperCase()} {member.firstName}
              </h3>
              <div className="text-sm text-gray-500">
                {member.email && <div>Email: {member.email}</div>}
                {member.phone && <div>Téléphone: {member.phone}</div>}
                {member.address && (
                  <div>
                    {member.address}, {member.zip} {member.city}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono">
                N° {member.memberNumber.toString().padStart(4, "0")}
              </div>
              <div className="text-xs text-gray-500">
                Inscrit le{" "}
                {new Date(member.lastRegisteredAt).toLocaleDateString("fr-FR")}
              </div>
              {member.isLessThan14YearsOld && (
                <div className="text-xs text-red-500">Moins de 14 ans</div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <Link
              href={`/admin/members/${member.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              Voir les détails
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
