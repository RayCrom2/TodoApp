import { useState } from 'react'
import type task from './types/app'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<task[]>([])
  const [newTask, setNewTask] = useState<string>('')

  const addTask = () => {
    const title = newTask.trim()
    if (!title) return
    setTasks([...tasks, { id: crypto.randomUUID(), title: title, completed: false, created_at: new Date().toISOString()}])
    setNewTask('')
  }

  const toggleTask = (e: React.ChangeEvent<HTMLInputElement>, task: task) => {
    setTasks(tasks.map((t) => t.id === task.id ? { ...t, completed: e.target.checked } : t))
  }

  return (
    <>
      <input
      value={newTask} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)} placeholder="Add a new task" 
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' ? addTask() : null}/>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title} <input type="checkbox" checked={task.completed} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {toggleTask(e, task)}} /></h2>
        </div>
      ))}
    </>
  )
}

export default App
