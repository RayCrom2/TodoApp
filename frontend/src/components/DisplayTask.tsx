import type task from "../types/app";

interface DisplayTaskProps {
  task: task;
  toggleTask: (
    e: React.ChangeEvent<HTMLInputElement, Element>,
    task: task,
  ) => Promise<void>;
  removeTask: (task: task) => Promise<void>;
}
export default function DisplayTask({
  task,
  toggleTask,
  removeTask,
}: DisplayTaskProps) {
  return (
    <li key={task.id} className="relative group">
      <h2>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            toggleTask(e, task);
          }}
        />
        {task.title}
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Remove "${task.title}"?`)) removeTask(task);
          }}
          aria-label={`Remove ${task.title}`}
          // className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center
          //   rounded-full bg-red-500 text-white
          //   opacity-0 transition-opacity
          //   group-hover:opacity-100 focus-visible:opacity-100"
        >
          <span aria-hidden="true">×</span>
        </button>
        <span>
          {task.due_on} - {task.time_due}
        </span>
      </h2>
    </li>
  );
}
