export function TodoFilter({ onFilterBy, onClearComplete}) {
  return (
    <section className="todo-filter-section">
      <div className="filter-btns">
        <button className="all-filter-btn" onClick={() => onFilterBy('all')}>
          All
        </button>
        <button
          className="active-filter-btn"
          onClick={() => onFilterBy('active')}>
          Active
        </button>
        <button
          className="complete-filter-btn"
          onClick={() => onFilterBy('complete')}>
          Complete
        </button>
      </div>
      <button className="clear-complete-btn" onClick={onClearComplete}>
        Clear Complete
      </button>
    </section>
  )
}
