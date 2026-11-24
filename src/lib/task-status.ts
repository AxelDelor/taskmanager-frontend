import { TaskStatus } from "@/types/task";

export const nextStatus: Record<TaskStatus, TaskStatus> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO",
};

export const buttonColour: Record<TaskStatus, string> = {
  TODO: "btn-primary",
  IN_PROGRESS: "btn-warning",
  DONE: "btn-success",
};
