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

export const buttonLabel: Record<TaskStatus, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};