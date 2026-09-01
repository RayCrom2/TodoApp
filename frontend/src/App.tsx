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
    e.stopPropagation();
    setTasks(tasks.map((t) => t.id === task.id ? { ...t, completed: e.target.checked } : t))
  }

  const removeTask = (task: task) => {
    setTasks(prev => prev.filter(t => t.id === task.id ? false : true))
  }

  return (
    <>
      <input
      value={newTask} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)} placeholder="Add a new task" 
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' ? addTask() : null}/>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>
            <input type="checkbox" checked={task.completed} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {toggleTask(e, task)}}/> 
            {task.title} 
            <button
              type="button"
              onClick={() => { if (window.confirm(`Remove "${task.title}"?`)) removeTask(task) }}
              aria-label={`Remove ${task.title}`}
              className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center
                rounded-full bg-red-500 text-white
                opacity-0 transition-opacity
                group-hover:opacity-100 focus-visible:opacity-100">
              <span aria-hidden="true">×</span>
            </button>
          </h2>
        </div>
      ))}
    </>
  )
}

export default App
