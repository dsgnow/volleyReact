import { useState } from 'react'
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm/ResetPasswordForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/ResetPasswordForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import useAuth from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { resetPassword } from '../../services/accountService'

const ResetPassword = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auth, ,] = useAuth()
  const [open, setOpen] = useState(false)
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')

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
        await resetPassword({
          requestType: 'PASSWORD_RESET',
          email: values.email
        })
        setMessageType('success')
        setOpen(true)
        setMessage(
          'Wysłaliśmy link do resetu hasła na podany email. Sprawdź pocztę.'
        )
      } catch (ex) {
        setOpen(true)
        setMessageType('warning')
        switch (ex.response.data.error.message) {
          case 'EMAIL_NOT_FOUND':
            setMessage('Nie ma takiego emaila.')
            break
          default:
            setMessage('Błąd')
        }
      }
      setLoading(false)
    }
  })
  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={messageType}>
            {message}
          </MuiAlert>
        </Snackbar>
      )}
      <ResetPasswordForm
        formik={formik}
        buttonTittle={'Resetuj hasło'}
        tittle={'Resetowanie hasła'}></ResetPasswordForm>
    </>
  )
}

export default ResetPassword
