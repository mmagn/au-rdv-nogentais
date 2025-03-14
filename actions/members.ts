"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const createMember = async (formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = (formData.get("email") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const zip = (formData.get("zip") as string) || null;
    const city = (formData.get("city") as string) || null;
    const address = (formData.get("address") as string) || null;
    const isLessThan14YearsOld = formData.get("isLessThan14YearsOld") === "on";

    // Validate required fields
    if (!firstName || !lastName) {
      return {
        success: false,
        message: "Le prénom et le nom sont obligatoires",
      };
    }

    const member = await prisma.member.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        zip,
        city,
        address,
        isLessThan14YearsOld,
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
      message: "Une erreur est survenue lors de la création du membre",
    };
  }
};

export const updateMember = async (formData: FormData) => {
  try {
    const id = formData.get("id") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = (formData.get("email") as string) || null;
    const phone = (formData.get("phone") as string) || null;
    const zip = (formData.get("zip") as string) || null;
    const city = (formData.get("city") as string) || null;
    const address = (formData.get("address") as string) || null;
    const isLessThan14YearsOld = formData.get("isLessThan14YearsOld") === "on";

    // Validate required fields
    if (!id || !firstName || !lastName) {
      return {
        success: false,
        message: "ID, prénom et nom sont obligatoires",
      };
    }

    const member = await prisma.member.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        zip,
        city,
        address,
        isLessThan14YearsOld,
      },
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
      message: "Une erreur est survenue lors de la mise à jour du membre",
    };
  }
};
