import { Task, TaskStatus } from "@/types/task";

export class ApiError extends Error {
  status: number;
  constructor(status: number, detail: string) {
    super(detail);
    this.status = status;
  }
}

export async function getTasks(): Promise<Task[]> {
  const url = getApiUrl();

  let response: Response;
  try {
    response = await fetch(`${url}/api/tasks`, { cache: "no-store" });
  } catch {
    throw new Error("API unavailable");
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function createTask(title: string, description: string | null): Promise<Task> {
  const url = getApiUrl();
  let response: Response;
  try {
    response = await fetch(`${url}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  } catch {
    throw new Error("API unavailable");
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new ApiError(400, "The task could not be created, please, check the fields");
    }

    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function updateStatus(taskId: number, status: TaskStatus): Promise<Task> {
  const url = getApiUrl();
  let response: Response;

  try {
    response = await fetch(`${url}/api/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  } catch {
    throw new Error("API unavailable");
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError(404, "The task could not be found");
    }

    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// private

function getApiUrl() {
  const url = process.env.API_URL;

  if (!url) {
    throw new Error("API_URL is not defined");
  }
  return url;
}

function
