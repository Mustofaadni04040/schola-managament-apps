"use server";

import { revalidatePath } from "next/cache";
import { SubjectInput } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = {
  success: boolean;
  error: boolean;
};

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectInput
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false, loading: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true, loading: false };
  }
};
