const { useState } = React
const { useSelector } = ReactRedux

import { setPreferences } from '../../store/actions/user.actions.js'

export function ProfileForm() {
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
    setPreferences(userPreferences)
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
