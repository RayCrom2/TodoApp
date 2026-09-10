import { useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTaskCompleted } from "./api";
import type task from "./types/app";
import DisplayTask from "./components/DisplayTask";
import {
  startOfWeek,
  daysOfWeek,
  toLocalDateISO,
  timeIntervals,
  minutesToPercent,
  localMinutesOfDay,
  toLocalDateTimeInput,
  nextQuarterHour,
  endOfToday,
} from "./utils/date";
import { toast } from "sonner";

function App() {
  const [tasks, setTasks] = useState<task[]>([]);

  const [newTask, setNewTask] = useState<string>("");
  // const DEFAULT_TIME_DUE = "23:59";

  const [eventStartTime, setEventStartTime] = useState<string>(() =>
    toLocalDateTimeInput(nextQuarterHour()),
  );
  const [eventEndTime, setEventEndTime] = useState<string>(() =>
    toLocalDateTimeInput(endOfToday()),
  );

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error(err));
  }, []);

  const addTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    if (eventStartTime > eventEndTime) {
      toast.error("Start time can not be later than End Time");
      return;
    }
    try {
      const created = await createTask(title, eventStartTime, eventEndTime);
      setTasks([...tasks, created]);
      setNewTask("");
      setEventStartTime(() => toLocalDateTimeInput(nextQuarterHour()));
      setEventEndTime(() => toLocalDateTimeInput(endOfToday()));
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
          type="datetime-local"
          value={eventStartTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventStartTime(e.target.value)
          }
        />
        <input
          type="datetime-local"
          value={eventEndTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventEndTime(e.target.value)
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
      <div className="flex gap-1">
        <div>
          {Array.from({ length: 24 }, (_, index) => (
            <div
              key={index}
              className="h-[var(--hour-height)] text-right -translate-y-1/8"
            >
              {index < 10 ? "0" + index.toString() : index}:00
            </div>
          ))}
        </div>
        <div className="relative hour-grid flex-1">
          {Array.from({ length: 24 }, (_, index) => (
            <div key={index} className="h-[var(--hour-height)] border-t" />
          ))}
          {tasks
            .filter((t) => {
              const startsToday =
                t.start_at &&
                toLocalDateISO(new Date(t.start_at)) ===
                  toLocalDateISO(new Date());
              const endsToday =
                toLocalDateISO(new Date(t.end_at)) ===
                toLocalDateISO(new Date());
              return startsToday || endsToday;
            })
            .map((task) => {
              const start = task.start_at ? new Date(task.start_at) : null;
              const end = new Date(task.end_at);
              const today = toLocalDateISO(new Date());
              const startsToday =
                task.start_at &&
                toLocalDateISO(new Date(task.start_at)) === today;
              const endsToday = toLocalDateISO(new Date(task.end_at)) === today;

              const endMin = endsToday ? localMinutesOfDay(end) : 1440;
              const startMin = start
                ? startsToday
                  ? localMinutesOfDay(start)
                  : 0
                : endMin;

              return (
                <div
                  key={task.id}
                  className="absolute border"
                  style={{
                    top: `${minutesToPercent(startMin)}%`,
                    height: start
                      ? `${minutesToPercent(endMin - startMin)}%`
                      : "10px",
                  }}
                >
                  {task.title}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
