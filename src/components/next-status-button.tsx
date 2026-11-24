"use client";

import { updateStatusAction } from "@/lib/actions";
import { buttonColour, nextStatus } from "@/lib/task-status";
import { TaskStatus } from "@/types/task";
import { useTransition } from "react";

export default function NextStatusButton({ id, status }: { id: number; status: TaskStatus }) {
  const [isPending, startTransition] = useTransition();
  const newStatus = nextStatus[status]
  const currentColour = buttonColour[status]

  return (
    <button
      disabled={isPending}
      className={`btn btn-lg mx-2 ${currentColour}`}
      onClick={() =>
        startTransition(async () => {
          await updateStatusAction(id, newStatus);
        })
      }
    >
      {status}
    </button>
  );
}
