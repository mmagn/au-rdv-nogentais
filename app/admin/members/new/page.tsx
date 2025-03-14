import { createMember } from "@/actions/members";
import MemberForm from "@/components/MemberForm";
import TopNav from "@/components/TopNav";

export default function NewMemberPage() {
  return (
    <div className="mx-auto max-w-lg flex flex-col gap-y-6 mb-10 px-2">
      <TopNav />
      <h1 className="text-2xl font-bold">Nouvel adhérent</h1>
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
