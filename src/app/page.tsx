import NextStatusButton from "@/components/next-status-button";
import TaskForm from "@/components/task-form";
import { getTasks } from "@/lib/api";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-row align-middle items-center p-3">
              <li>
                {task.title} - {task.description ? task.description : "No description"} : (
                {new Date(task.creationDate).toLocaleDateString("UTC")})
              </li>
              <NextStatusButton id={task.id} status={task.status} />
            </div>
          ))}
        </ul>
      ) : (
        <p>No tasks have been created for now</p>
      )}
      <TaskForm />
    </main>
  );
}
