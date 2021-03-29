import { useState } from 'react'
import LoginForm from '../../components/Forms/LoginForm/LoginForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/LoginForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import axios from '../../axios-auth'
import useAuth from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  if (auth) {
    history.push('/')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      try {
        const res = await axios.post('accounts:signInWithPassword', {
          email: values.email,
          password: values.password,
          returnSecureToken: true
        })
        setAuth({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId
        })
        history.push('/')
      } catch (ex) {
        setOpen(true)
        switch (ex.response.data.error.message) {
          case 'EMAIL_NOT_FOUND':
            setError('Nie ma takiego emaila.')
            break
          case 'INVALID_PASSWORD':
            setError('Hasło jest nieprawidłowe.')
            break
          case 'USER_DISABLED':
            setError('Użytkownik został zablokowany.')
            break
          default:
            setError(ex.response.data.error.message)
        }
        console.log(ex.response)
      }
      setLoading(false)
    }
  })

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="warning">
            {error}
          </MuiAlert>
        </Snackbar>
      )}
      <LoginForm
        formik={formik}
        buttonTittle={'Zaloguj'}
        tittle={'Logowanie'}></LoginForm>
    </>
  )
}

export default Login
