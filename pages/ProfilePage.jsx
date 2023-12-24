import { ProfileList } from '../cmps/ProfilePageCmps/ProfileList.jsx'
import { ProfileForm } from '../cmps/ProfilePageCmps/ProfileForm.jsx'
const { useState } = React
const { useSelector } = ReactRedux

export function ProfilePage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  const [isExpend, setIsExpend] = useState(false)

  const sectionStyle = () => {
    if (!user) return { backgroundColor: '#ffffff', color: '#000000' }
    return {
      backgroundColor: user.backgroundColor || '#ffffff',
      color: user.textColor || '#000000',
    }
  }

  return (
    <section className="main-section profile-page" style={sectionStyle()}>
      <ProfileForm />
      <ProfileList isExpend={isExpend} />
      <button onClick={() => setIsExpend((prevIsExpend) => !prevIsExpend)}>
        Show all logs
      </button>
    </section>
  )
}
