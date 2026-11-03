import TaskCard from './TaskCard.jsx'

const filters = ['All', 'Pending', 'Completed']

function TaskList({ tasks, allTaskCount, activeFilter, onFilterChange, onToggleStatus, onDeleteTask }) {
  return (
    <div className="task-list-content">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {filters.map((filter) => (
          <button
            className={`filter-tab${activeFilter === filter ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            key={filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
            {filter === 'All' && <span className="filter-count">{allTaskCount}</span>}
          </button>
        ))}
      </div>

      {tasks.length > 0 ? (
        <div className="task-list" role="tabpanel">
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" role="tabpanel">
          <span className="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M10.5 5.5h11l5 5v15h-21v-20h5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M20.5 5.8v5h5M11 17h10m-10 4h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3>{activeFilter === 'All' ? 'Your task list is clear' : `No ${activeFilter.toLowerCase()} tasks`}</h3>
          <p>
            {activeFilter === 'All'
              ? 'Add a task to get started and make today count.'
              : `When a task is ${activeFilter.toLowerCase()}, it will show up here.`}
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskList
