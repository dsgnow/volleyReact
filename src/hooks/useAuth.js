import { useContext, useDebugValue, useEffect } from 'react'
import AuthContext from '../context/authContext'
import { parseISO, isBefore } from 'date-fns'
import { useHistory } from 'react-router-dom'

export default function useAuth() {
  const authContext = useContext(AuthContext)
  const auth = authContext.user

  const history = useHistory()

  useEffect(() => {
    if (auth && isBefore(parseISO(auth.expiryDate), new Date())) {
      authContext.logout()
      window.localStorage.removeItem('token-data')
      history.push('/logowanie')
    }
  })

  useDebugValue(auth ? 'Zalogowany' : 'Wylogowany')

  const setAuth = (user) => {
    if (user) {
      authContext.login(user)
      window.localStorage.setItem('token-data', JSON.stringify(user))
    } else {
      authContext.logout()
      window.localStorage.removeItem('token-data')
    }
  }

  return [auth, setAuth]
}
