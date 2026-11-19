import TaskForm from "@/components/task-form";
import { getTasks } from "@/lib/api";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.description ? task.description : "No description"} :{" "}
              {task.status.toLowerCase()} ({new Date(task.creationDate).toLocaleDateString("UTC")})
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks have been created for now</p>
      )}
      <TaskForm />
    </main>
  );
}
