import { useMemo, useState } from 'react'
import DashboardSummary from './components/DashboardSummary.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import './App.css'

const starterTasks = [
  {
    id: 'task-product-roadmap',
    title: 'Review product roadmap',
    description: 'Align the upcoming milestones with the design and engineering teams.',
    priority: 'High',
    status: 'Pending',
    createdAt: 'Today',
  },
  {
    id: 'task-client-proposal',
    title: 'Send client proposal',
    description: 'Share the revised proposal and confirm the project timeline.',
    priority: 'Medium',
    status: 'Pending',
    createdAt: 'Today',
  },
  {
    id: 'task-design-system',
    title: 'Update design system',
    description: 'Document the latest button and form component changes.',
    priority: 'Low',
    status: 'Completed',
    createdAt: 'Yesterday',
  },
  {
    id: 'task-weekly-report',
    title: 'Prepare weekly report',
    description: '',
    priority: 'Medium',
    status: 'Completed',
    createdAt: 'Yesterday',
  },
]

function NavigationIcon({ type }) {
  if (type === 'overview') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="3" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }

  if (type === 'pending') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="6.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6.5v3.8l2.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7.2 10.1 1.9 1.9 3.8-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [activeFilter, setActiveFilter] = useState('All')
  const pendingCount = tasks.filter((task) => task.status === 'Pending').length
  const completedCount = tasks.length - pendingCount
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const filteredTasks = useMemo(
    () => tasks.filter((task) => activeFilter === 'All' || task.status === activeFilter),
    [activeFilter, tasks],
  )

  function addTask(taskDetails) {
    const newTask = {
      ...taskDetails,
      id: crypto.randomUUID(),
      status: 'Pending',
      createdAt: 'Just now',
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setActiveFilter('All')
  }

  function toggleTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' }
          : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const navigationItems = [
    { label: 'Overview', filter: 'All', icon: 'overview' },
    { label: 'Pending', filter: 'Pending', icon: 'pending', count: pendingCount },
    { label: 'Completed', filter: 'Completed', icon: 'completed', count: completedCount },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard" aria-label="Taskflow dashboard">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2.8a9.2 9.2 0 1 0 9.2 9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-name">taskflow</span>
        </a>

        <a className="sidebar-create" href="#create-task">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="nav-item-label">New task</span>
        </a>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <p className="nav-section-label">WORKSPACE</p>
          {navigationItems.map((item, index) => (
            <div className={index === 1 ? 'nav-group-start' : undefined} key={item.label}>
              {index === 1 && <p className="nav-section-label task-nav-label">YOUR TASKS</p>}
              <button
                className={`nav-item${activeFilter === item.filter ? ' is-active' : ''}`}
                type="button"
                aria-current={activeFilter === item.filter ? 'page' : undefined}
                onClick={() => setActiveFilter(item.filter)}
                title={item.label}
              >
                <NavigationIcon type={item.icon} />
                <span className="nav-item-label">{item.label}</span>
                {item.count !== undefined && <span className="nav-count">{item.count}</span>}
              </button>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <div className="progress-heading">
              <span>Task progress</span>
              <span>{progress}%</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Completed task progress"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
            <p>{completedCount} of {tasks.length} tasks complete</p>
          </div>
          <div className="profile-card">
            <span className="profile-avatar" aria-hidden="true">Y</span>
            <span className="profile-copy">
              <strong>Your workspace</strong>
              <span>Personal account</span>
            </span>
            <svg className="profile-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </aside>

      <div className="main-column" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <strong>{activeFilter === 'All' ? 'Overview' : `${activeFilter} tasks`}</strong>
          </div>
          <div className="topbar-actions">
            <div className="topbar-note">
              <span className="online-dot" />
              <span>Personal workspace</span>
            </div>
            <a className="topbar-create" href="#create-task">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              New task
            </a>
          </div>
        </header>

        <main className="dashboard">
          <section className="welcome-section" aria-labelledby="page-title">
            <div>
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h1 id="page-title">Task Management Dashboard</h1>
              <p className="welcome-copy">A clear view of your tasks and priorities for today.</p>
            </div>
            <div className="date-chip">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2.6" y="4.3" width="14.8" height="13" rx="2.1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.4 2.7v3.2M13.6 2.7v3.2M2.8 8.1h14.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
          </section>

          <DashboardSummary tasks={tasks} />

          <div className="content-grid">
            <section className="panel tasks-panel" aria-labelledby="tasks-heading">
              <div className="tasks-heading-row">
                <div className="section-heading">
                  <div className="section-icon list-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 5.2h9M7.5 10h9m-9 4.8h9M3.3 5.2h.1m-.1 4.8h.1m-.1 4.8h.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h2 id="tasks-heading">Your tasks</h2>
                    <p>Stay on top of what matters most.</p>
                  </div>
                </div>
                <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
              </div>
              <TaskList
                tasks={filteredTasks}
                allTaskCount={tasks.length}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onToggleStatus={toggleTaskStatus}
                onDeleteTask={deleteTask}
              />
            </section>

            <section className="panel form-panel" id="create-task" aria-labelledby="create-heading">
              <div className="section-heading">
                <div className="section-icon add-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 id="create-heading">Create a task</h2>
                  <p>Capture it before it slips away.</p>
                </div>
              </div>
              <TaskForm onAddTask={addTask} />
            </section>
          </div>
          <footer className="footer-note">A little progress each day adds up <span aria-hidden="true">✦</span></footer>
        </main>
      </div>
    </div>
  )
}

export default App
