import { useEffect, useMemo, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTaskCompleted } from "./api";
import type task from "./types/app";
import DisplayTask from "./components/DisplayTask";
import {
  startOfWeek,
  daysOfWeek,
  calculate_percent,
  toLocalDateISO,
  timeIntervals,
} from "./utils/date";

function App() {
  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const DEFAULT_TIME_DUE = "23:59";

  const [newDueOn, setNewDueOn] = useState<string>(() =>
    toLocalDateISO(new Date()),
  );
  const [newTimeDue, setNewTimeDue] = useState<string>(DEFAULT_TIME_DUE);

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
      const created = await createTask(title, newDueOn, newTimeDue);
      setTasks([...tasks, created]);
      setNewTask("");
      setNewDueOn(toLocalDateISO(new Date()));
      setNewTimeDue(DEFAULT_TIME_DUE);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (
    e: React.ChangeEvent<HTMLInputElement>,
    task: task,
  ) => {
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
      <form
        onSubmit={addTask}
        className="flex justify-center items-center gap-3"
      >
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
        <input
          type="time"
          value={newTimeDue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTimeDue(e.target.value)
          }
        />
        <button type="submit">Add</button>
      </form>

      {/* <ul>
        {tasks.map((task) => (
          <DisplayTask
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            removeTask={removeTask}
          />
        ))}
      </ul> */}
      <div key={3} className="relative hour-grid">
        {Array.from({ length: 24 }, (_, index) => (
          <div key={index} className="h-12 ml-0 flex flex-col "></div>
        ))}
        {tasks
          .filter((t) => {
            return t.due_on === toLocalDateISO(new Date());
          })
          .map((task) => (
            <div
              key={task.id}
              className="absolute pl-50"
              style={{ top: `${calculate_percent(task.time_due)}%` }}
            >
              {task.title}
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
