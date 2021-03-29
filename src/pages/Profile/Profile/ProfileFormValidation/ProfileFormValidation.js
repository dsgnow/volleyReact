import { useState } from 'react'
import ProfileDetailsForm from '../../../../components/Forms/ProfileDetailsForm/ProfileDetailsForm'
import {
  validationSchema,
  initialValues
} from '../../../../components/Forms/ProfileDetailsForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon'
import axiosAuth from '../../../../axios-auth'
import axios from '../../../../axios'
import useAuth from '../../../../hooks/useAuth'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const ProfileFormValidation = () => {
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

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
        const res = await axiosAuth.post('accounts:update', {
          idToken: auth.token,
          displayName: `${values.firstName} ${values.lastName}`,
          password: values.password,
          email: values.email,
          returnSecureToken: true
        })

        setAuth({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId
        })

        res.status === 200 &&
          (await axios.patch(`users/${res.data.localId}.json`, {
            firstName: values.firstName,
            lastName: values.lastName,
            userLevel: values.level,
            email: values.email,
            userId: res.data.localId
          }))

        setMessageType('success')
        setOpen(true)
        setMessage('Twój profil został zaktualizowany!')
      } catch (ex) {
        setOpen(true)
        setMessageType('warning')
        switch (ex.response.data.error.message) {
          case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN' ||
            'TOKEN_EXPIRED' ||
            'INVALID_ID_TOKEN':
            setMessage(
              'Twoje poświadczenie wygasło. Zaloguj się ponownie do aplikacji.'
            )
            break
          case 'WEAK_PASSWORD':
            setMessage('Hasło musi mieć minimum 6 znaków.')
            break
          case 'EMAIL_EXISTS':
            setMessage('Podany email jest już zajęty.')
            break
          default:
            setMessage(ex.response.data.error.message)
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
      <ProfileDetailsForm
        formik={formik}
        tittle={'Twoje dane'}
        buttonTittle={'Aktualizuj'}></ProfileDetailsForm>
    </>
  )
}

export default ProfileFormValidation
