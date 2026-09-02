import { useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTaskCompleted } from "./api";
import type task from "./types/app";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newDueOn, setNewDueOn] = useState<string>("");

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error(err));
  }, []);

  const addTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    try {
      const created = await createTask(title, newDueOn || undefined);
      setTasks([...tasks, created]);
      setNewTask("");
      setNewDueOn("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (e: React.ChangeEvent<HTMLInputElement>, task: task) => {
    e.stopPropagation();
    try {
      const updated = await updateTaskCompleted(task.id, e.target.checked);
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const removeTask = async (task: task) => {
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => (t.id === task.id ? false : true)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={addTask}>
        <input
          value={newTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTask(e.target.value)
          }
          placeholder="Add a new task"
        />
        <input
          type="date"
          value={newDueOn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewDueOn(e.target.value)
          }
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
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
                  if (window.confirm(`Remove "${task.title}"?`))
                    removeTask(task);
                }}
                aria-label={`Remove ${task.title}`}
                // className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center
                //   rounded-full bg-red-500 text-white
                //   opacity-0 transition-opacity
                //   group-hover:opacity-100 focus-visible:opacity-100"
              >
                <span aria-hidden="true">×</span>
              </button>
            </h2>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
