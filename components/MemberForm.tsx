"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type MemberFormProps = {
  member?: {
    id?: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    zip?: string;
    city?: string;
    address?: string;
    isLessThan14YearsOld: boolean;
  };
  onSubmit: (
    formData: FormData
  ) => Promise<{ success: boolean; message?: string }>;
};

export default function MemberForm({ member, onSubmit }: MemberFormProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    try {
      const result = await onSubmit(formData);

      if (result.success) {
        toast({
          description: member?.id
            ? "✅ Adhérent mis à jour"
            : "✅ Adhérent créé",
        });
        router.push("/admin/members");
        router.refresh();
      } else {
        toast({
          description: result.message || "❌ Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "❌ Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              Prénom *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              defaultValue={member?.firstName || ""}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Nom *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              defaultValue={member?.lastName || ""}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={member?.email || ""}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={member?.phone || ""}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Adresse
          </label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={member?.address || ""}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zip" className="block text-sm font-medium mb-1">
              Code postal
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              defaultValue={member?.zip || ""}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              Ville
            </label>
            <input
              id="city"
              name="city"
              type="text"
              defaultValue={member?.city || ""}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="isLessThan14YearsOld"
            name="isLessThan14YearsOld"
            type="checkbox"
            defaultChecked={member?.isLessThan14YearsOld || false}
            className="h-4 w-4 mr-2"
          />
          <label htmlFor="isLessThan14YearsOld" className="text-sm font-medium">
            Moins de 14 ans
          </label>
        </div>

        {member?.id && <input type="hidden" name="id" value={member.id} />}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/members")}
          disabled={isPending}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : member?.id
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </div>
    </form>
  );
}
