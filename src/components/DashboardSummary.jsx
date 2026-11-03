const summaryItems = [
  {
    label: 'Total tasks',
    key: 'total',
    tone: 'violet',
    icon: (
      <>
        <path d="M7.2 5.4h9.2M7.2 10h9.2m-9.2 4.6h9.2" />
        <path d="M3.8 5.4h.1m-.1 4.6h.1m-.1 4.6h.1" />
      </>
    ),
  },
  {
    label: 'Pending',
    key: 'pending',
    tone: 'amber',
    icon: <circle cx="10" cy="10" r="6.1" />,
  },
  {
    label: 'Completed',
    key: 'completed',
    tone: 'green',
    icon: <path d="m4.2 10.1 3.8 3.8 7.8-7.8" />,
  },
]

function DashboardSummary({ tasks }) {
  const counts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'Pending').length,
    completed: tasks.filter((task) => task.status === 'Completed').length,
  }

  return (
    <section className="summary-grid" aria-label="Task summary">
      {summaryItems.map((item) => (
        <article className={`summary-card ${item.tone}`} key={item.key}>
          <div className="summary-topline">
            <span>{item.label}</span>
            <span className="summary-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {item.icon}
              </svg>
            </span>
          </div>
          <div className="summary-number" aria-live="polite">{counts[item.key]}</div>
          <div className="summary-footnote">
            {item.key === 'total' && 'Across your workspace'}
            {item.key === 'pending' && 'Ready when you are'}
            {item.key === 'completed' && 'Nicely done!'}
          </div>
        </article>
      ))}
    </section>
  )
}

export default DashboardSummary
