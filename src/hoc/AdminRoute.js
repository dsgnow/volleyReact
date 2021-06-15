import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ReducerContext from '../context/ReducerContext'

export default function AuthenticatedRoute(props) {
  const context = useContext(ReducerContext)

  return context.state.userAdmin ? <Route {...props} /> : <Redirect to="/gry" />
}
