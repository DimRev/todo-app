const { useState } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UPDATE_PREFERENCES } from '../store/store.js'

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
    userService.updatePreferences(userPreferences).then(()=>{
      dispatch({ type: UPDATE_PREFERENCES, userPreferences })
    })
    console.log('Form submitted with data:', userPreferences)
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
    </section>
  )
}
