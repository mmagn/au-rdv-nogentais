"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Extract common validation function
const validateMemberData = (
  memberData: { firstName: string; lastName: string },
  id?: string
) => {
  if (!memberData.firstName || !memberData.lastName) {
    return {
      success: false,
      message: id
        ? "ID, prénom et nom sont obligatoires"
        : "Le prénom et le nom sont obligatoires",
    };
  }
  return null;
};

// Extract common data preparation function
const prepareMemberData = (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = (formData.get("email") as string) || null;
  const phone = (formData.get("phone") as string) || null;
  const zip = (formData.get("zip") as string) || null;
  const city = (formData.get("city") as string) || null;
  const address = (formData.get("address") as string) || null;
  const isLessThan14YearsOld = formData.get("isLessThan14YearsOld") === "on";

  return {
    firstName,
    lastName,
    email,
    phone,
    zip,
    city,
    address,
    isLessThan14YearsOld,
  };
};

export const createMember = async (formData: FormData) => {
  try {
    const memberData = prepareMemberData(formData);

    // Validate required fields
    const validationError = validateMemberData(memberData);
    if (validationError) return validationError;

    const member = await prisma.member.create({
      data: {
        ...memberData,
        lastRegisteredAt: new Date(),
      },
    });

    revalidatePath("/admin/members");

    return {
      success: true,
      member,
    };
  } catch (error) {
    console.error("Error creating member:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la création de l'adhérent",
    };
  }
};

export const updateMember = async (formData: FormData) => {
  try {
    const id = formData.get("id") as string;
    const memberData = prepareMemberData(formData);

    // Validate required fields
    const validationError = validateMemberData(memberData, id);
    if (validationError) return validationError;

    const member = await prisma.member.update({
      where: { id },
      data: memberData,
    });

    revalidatePath("/admin/members");

    return {
      success: true,
      member,
    };
  } catch (error) {
    console.error("Error updating member:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la mise à jour de l'adhérent",
    };
  }
};
