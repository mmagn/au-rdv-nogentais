import { createMember } from "@/actions/members";
import MemberForm from "@/components/MemberForm";

export default function NewMemberPage() {
  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-10 mb-10 px-2">
      <h1 className="text-2xl font-bold">Nouveau membre</h1>
      <MemberForm
        onSubmit={createMember}
        member={{
          firstName: "",
          lastName: "",
          isLessThan14YearsOld: false,
        }}
      />
    </div>
  );
}
