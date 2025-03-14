"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function MemberSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    if (search) {
      router.push(`/admin/members?search=${encodeURIComponent(search)}`);
    } else {
      router.push("/admin/members");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          name="search"
          placeholder="Rechercher un membre..."
          defaultValue={search}
          className="flex-1 p-2 border rounded-md"
        />
        <Button type="submit">Rechercher</Button>
      </form>
      <div className="flex justify-end">
        <Button onClick={() => router.push("/admin/members/new")}>
          Nouveau membre
        </Button>
      </div>
    </div>
  );
}
