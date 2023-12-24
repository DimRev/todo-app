const { useState } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../../services/user.service.js'
import { UPDATE_PREFERENCES, ADD_ACTIVITY } from '../../store/reducers/user.reducer.js'

export function ProfileForm() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

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

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
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
  )
}
