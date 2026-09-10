import type task from "./types/app";

const API_BASE = "http://localhost:8000";

export async function fetchTasks(): Promise<task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function createTask(title: string, start_at: string | null, end_at: string): Promise<task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      title, 
      start_at: start_at? new Date(start_at).toISOString() : null, 
      end_at: new Date(end_at).toISOString(),
    }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTaskCompleted(id: string, completed: boolean): Promise<task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
