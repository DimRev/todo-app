export function TodoFilter({ onFilterBy }) {
  return (
    <section className="todo-filter-section">
      <p>
        #<span className="count-span">count</span># items left
      </p>
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
      <button className="clear-complete-btn">Clear Complete</button>
    </section>
  )
}
