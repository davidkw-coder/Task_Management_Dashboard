import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Please enter a task title before adding it.')
      return
    }

    onAddTask({ title: trimmedTitle, description: description.trim(), priority })
    setTitle('')
    setDescription('')
    setPriority('Medium')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="task-title">Task title <span aria-hidden="true">*</span></label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError('')
          }}
          placeholder="e.g. Plan the weekly team sync"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'title-error' : undefined}
          maxLength={120}
        />
        {error && <p className="field-error" id="title-error" role="alert">{error}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="task-description">Description <span className="optional-label">Optional</span></label>
        <textarea
          id="task-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a few details to help you get started..."
          rows="3"
          maxLength={500}
        />
      </div>

      <div className="field-group priority-field">
        <label htmlFor="task-priority">Priority</label>
        <div className="select-wrap">
          <select id="task-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <button className="button-primary add-task-button" type="submit">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Add task
      </button>
    </form>
  )
}

export default TaskForm
