"use client";

import { createTaskAction } from "@/lib/actions";
import { useActionState } from "react";

export default function TaskForm() {
  const [state, formAction, isPending] = useActionState(createTaskAction, {
    error: null,
    success: false,
    values: { title: "", description: "" },
  });

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-5">
      <form action={formAction} className="card-body">
        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            required
            className="input"
            minLength={3}
            maxLength={100}
            defaultValue={state.values.title}
          />
        </div>
        <div>
          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            name="description"
            type="text"
            id="description"
            className="input"
            defaultValue={state.values.description}
          />
        </div>
        <button disabled={isPending} type="submit" className="btn btn-neutral">
          Create task
        </button>
        {state.error && <p role="alert">{state.error}</p>}
        {state.success ? <p>The task has been successfully created</p> : null}
      </form>
    </div>
  );
}
