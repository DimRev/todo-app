const { useState } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UPDATE_PREFERENCES, ADD_ACTIVITY } from '../store/store.js'

export function ProfilePage() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.loggedinUser)

  const [userPreferences, setUserPreferences] = useState({
    fullname: user.fullname,
    backgroundColor: user.backgroundColor,
    textColor: user.textColor,
  })

  function handleChange(e) {
    const { name, value } = e.target
    setUserPreferences((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    userService
      .updatePreferences(userPreferences)
      .then(() => {
        dispatch({ type: UPDATE_PREFERENCES, userPreferences })
      })
      .then(() => {
        userService
          .addActivity('Updated Profile Preferences')
          .then((activities) => {
            dispatch({ type: ADD_ACTIVITY, activities })
          })
      })
  }

  function handleTs(ts) {
    ts = Date.now() - ts
    ts = ts / 1000 // Seconds
    if (ts < 60) return '~' + Math.floor(ts) + ' seconds ago'
    ts = ts / 60 // Minutes
    if (ts < 60) return '~' + Math.floor(ts) + ' minutes ago'
    ts = ts / 60 // Hours
    if (ts < 24) return '~' + Math.floor(ts) + ' hours ago'
    ts = ts / 24 // Days
    if (ts < 7) return '~' + Math.floor(ts) + ' days ago'
    ts = ts / 7 // weeks
    if (ts < 4) return '~' + Math.floor(ts) + ' weeks ago'
    ts = ts / 4 // months
    if (ts < 12) return '~' + Math.floor(ts) + ' month ago'
    ts = ts / 12 // years
    return '~' + Math.floor(ts) + ' years ago'
  }

  return (
    <section className="profile-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Fullname</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={userPreferences.fullname}
          onChange={handleChange}
        />

        <label htmlFor="backgroundColor">Background Color</label>
        <input
          type="color"
          id="backgroundColor"
          name="backgroundColor"
          value={userPreferences.backgroundColor}
          onChange={handleChange}
        />

        <label htmlFor="textColor">Text Color</label>
        <input
          type="color"
          id="textColor"
          name="textColor"
          value={userPreferences.textColor}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
      <ul>
        {user.activities && user.activities.length ? (
          user.activities.map((activity) => (
            <li>
              {activity.activity} {handleTs(activity.ts)}
            </li>
          ))
        ) : (
          <h1>Doesn't exit</h1>
        )}
      </ul>
    </section>
  )
}
