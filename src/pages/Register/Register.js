import { useState } from 'react'
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/RegisterForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import useAuth from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { addHours, formatISO } from 'date-fns'
import { signUp, addNewUser } from '../../services/accountService'

const Register = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  if (auth) {
    history.push('/')
  }

  const localStorageLifeTime = addHours(new Date(), 1)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await signUp({
          email: values.email,
          password: values.password,
          returnSecureToken: true
        })

        res.status === 200 &&
          (await addNewUser({
            path: `users/${res.data.localId}.json`,
            email: values.email,
            userLevel: values.level,
            adminLevel: '',
            firstName: values.firstName,
            lastName: values.lastName,
            userId: res.data.localId
          }))

        setAuth({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId,
          expiryDate: formatISO(localStorageLifeTime)
        })
      } catch (ex) {
        setOpen(true)
        switch (ex.response.data.error.message) {
          case 'EMAIL_EXISTS':
            setError('adres e-mail jest już używany przez inne konto.')
            break
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            setError(
              'Zablokowaliśmy wszystkie żądania z tego urządzenia z powodu nietypowej aktywności. Spróbuj ponownie później.'
            )
            break
          default:
            setError('Błąd')
        }
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
      <RegisterForm
        formik={formik}
        buttonTittle={'Zarejestruj się'}
        tittle={'Dołącz do nas'}></RegisterForm>
    </>
  )
}

export default Register
