const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {
  const user = useSelector((storeState) => storeState.loggedinUser)

  const sectionStyle = () => {
    if (!user) return { backgroundColor: '#ffffff', color: '#000000' }
    return {
      backgroundColor: user.backgroundColor || '#ffffff',
      color: user.textColor || '#000000',
    }
  }
  return (
    <section className="main-section" style={sectionStyle()}>
      <h1>Todo Details</h1>
    </section>
  )
}
