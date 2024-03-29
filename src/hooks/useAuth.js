import { useContext, useDebugValue } from 'react'
import AuthContext from '../context/authContext'
// import { parseISO, isBefore } from 'date-fns'
// import { useHistory } from 'react-router-dom'

export default function useAuth() {
  const authContext = useContext(AuthContext)
  const auth = authContext.user
  const authAdmin = authContext.userAdmin

  // const history = useHistory()

  // useEffect(() => {
  //   if (auth && isBefore(parseISO(auth.expiryDate), new Date())) {
  //     authContext.logout()
  //     window.localStorage.removeItem('token-data')
  //     history.push('/logowanie')
  //   }
  // })

  useDebugValue(auth ? 'Zalogowany' : 'Wylogowany')

  const setAuth = (user) => {
    if (user && user.userId === '3p3vHh71y3gyf1IDYJ2f9cExcgy2') {
      authContext.login(user)
      window.localStorage.setItem('token-data', JSON.stringify(user))
      authContext.loginAdmin(user)
      window.localStorage.setItem('tokenAdmin-data', JSON.stringify(user))
    } else if (user) {
      authContext.login(user)
      window.localStorage.setItem('token-data', JSON.stringify(user))
    } else {
      authContext.logout()
      window.localStorage.removeItem('token-data')
      window.localStorage.removeItem('tokenAdmin-data')
    }
  }

  return [auth, authAdmin, setAuth]
}
