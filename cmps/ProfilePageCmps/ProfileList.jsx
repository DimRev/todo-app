const { useSelector } = ReactRedux
export function ProfileList({ isExpend }) {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  function handleTs(ts) {
    ts = Date.now() - ts
    ts = ts / 1000 // Seconds
    if (ts < 60) return `~${Math.floor(ts)} seconds ago`
    ts = ts / 60 // Minutes
    if (ts < 60) return `~${Math.floor(ts)} minutes ago`
    ts = ts / 60 // Hours
    if (ts < 24) return `~${Math.floor(ts)} hours ago`
    ts = ts / 24 // Days
    if (ts < 7) return `~${Math.floor(ts)} days ago`
    ts = ts / 7 // weeks
    if (ts < 4) return `~${Math.floor(ts)} weeks ago`
    ts = ts / 4 // months
    if (ts < 12) return `~${Math.floor(ts)} month ago`
    ts = ts / 12 // years
    return `~${Math.floor(ts)} years ago`
  }

  return (
    <article className="profile-list">
      {user.activities && user.activities.length ? (
        user.activities.map((activity, idx) => {
          if (idx < 9 || isExpend)
            return (
              <li>
                <span className="status">{activity.activity} :</span>{' '}
                <span className="timestamp">{handleTs(activity.ts)}</span>
              </li>
            )
        })
      ) : (
        <h1>Doesn't exit</h1>
      )}
    </article>
  )
}
