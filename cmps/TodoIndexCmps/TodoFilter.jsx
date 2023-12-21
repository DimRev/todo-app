export function TodoFilter({}) {
  return <section className="todo-filter-section">
        <p>
          #<span className="count-span">count</span># items left
        </p>
        <div className="filter-btns">
          <button className="all-filter-btn">All</button>
          <button className="active-filter-btn">Active</button>
          <button className="complete-filter-btn">Complete</button>
        </div>
        <button className="clear-complete-btn">Clear Complete</button>
      </section>;
}
