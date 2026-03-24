import './App.css'
import { useState, useRef } from 'react'

const App = () => {
  const [tasks, setTasks] = useState([
    'Learn React for 20 min',
    'Learn Java for 20 min',
    'Learn Python for 20 min',
  ])
  const [taskInput, setTaskInput] = useState('')
  const [showInput, setShowInput] = useState(true)
  const inputRef = useRef(null)

  const addTask = () => {
    const value = taskInput.trim()
    if (!value) return
    setTasks((prev) => [value, ...prev])
    setTaskInput('')
    inputRef.current?.focus()
  }

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="app-shell">
      <div className="container">
        <div className="header">
          <h1>TODO </h1>
          <button
            className="primary"
            onClick={() => {
              setShowInput((prev) => !prev)
              setTimeout(() => inputRef.current?.focus(), 0)
            }}
          >
            Add Task
          </button>
        </div>

        {showInput && (
          <section className="task-input">
            <input
              ref={inputRef}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your task..."
            />
            <button className="primary" onClick={addTask}>
              Save Task
            </button>
          </section>
        )}

        <section className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add something to get started.</p>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={`${task}-${index}`}>
                  <div className="task-container">
                    <span>{task}</span>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default App