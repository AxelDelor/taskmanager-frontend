"use server";

import { TaskCreationState } from "@/types/task-creation-state";
import { ApiError, createTask } from "./api";
import { revalidatePath } from "next/cache";

export async function createTaskAction(
  prevState: TaskCreationState,
  formData: FormData,
): Promise<TaskCreationState> {
  const title = getString(formData, "title");
  const description = getString(formData, "description");

  const values = { title, description };

  if (title.trim().length < 3 || title.trim().length > 100) {
    return {
      error: "The title must be comprised between 3 and 100 characters",
      success: false,
      values,
    };
  }

  const titleClean = title.trim()
  const descriptionClean = description.trim() ? description.trim() : null 

  try {
    await createTask(titleClean, descriptionClean);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message, success: false, values };
    }
    throw error;
  }

  revalidatePath("/");
  return {
    error: null,
    success: true,
    values: { title: "", description: "" },
  };
}

// private

function getString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}
