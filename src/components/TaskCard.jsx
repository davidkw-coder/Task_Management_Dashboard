function TaskCard({ task, onToggleStatus, onDeleteTask }) {
  const isCompleted = task.status === 'Completed'

  return (
    <article className={`task-card${isCompleted ? ' task-is-complete' : ''}`}>
      <button
        className={`completion-toggle${isCompleted ? ' checked' : ''}`}
        type="button"
        onClick={() => onToggleStatus(task.id)}
        aria-label={isCompleted ? `Mark ${task.title} as pending` : `Mark ${task.title} as completed`}
        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
      >
        {isCompleted && (
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m3.3 8.2 3 3 6.4-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="task-main">
        <div className="task-title-row">
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`}>
            <span className="status-dot" />
            {task.status}
          </span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            <span className="priority-indicator" />
            {task.priority} priority
          </span>
          <span className="task-created">{task.createdAt}</span>
        </div>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.title}`}
        title="Delete task"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.5 6h11m-9.7 0 .6 10h7.2l.6-10M8 6V4.5h4V6m-2 2.3v5.3m-2.2-5.3v5.3m4.4-5.3v5.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </article>
  )
}

export default TaskCard
