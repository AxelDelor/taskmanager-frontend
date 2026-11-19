import { Task } from "@/types/task";

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
