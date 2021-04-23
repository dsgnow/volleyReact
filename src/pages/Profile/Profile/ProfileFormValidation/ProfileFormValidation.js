import { useState, useEffect } from 'react'
import ProfileDetailsForm from '../../../../components/Forms/ProfileDetailsForm/ProfileDetailsForm'
import {
  validationSchema,
  initialValues as defaultInitialValues
} from '../../../../components/Forms/ProfileDetailsForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon'
import useAuth from '../../../../hooks/useAuth'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { updateAccount, updateUser } from '../../../../services/accountService'
import { objectToArrayWithId } from '../../../../helpers/objects'
import { fetchUserById } from '../../../../services/accountService'

const ProfileFormValidation = () => {
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState(defaultInitialValues)
  const [auth] = useAuth()
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await fetchUserById(auth.userId)
      const fetchedUser = objectToArrayWithId(res.data)
      console.log(fetchedUser)

      setInitialValues({
        firstName: fetchedUser[0].firstName,
        lastName: fetchedUser[0].lastName,
        level: fetchedUser[0].userLevel,
        email: fetchedUser[0].email,
        password: ''
      })
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      console.log(ex)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      try {
        let updateData = {
          idToken: auth.token,
          displayName: values.firstName,
          email: values.email,
          returnSecureToken: true
        }

        values.password && (updateData.password = values.password)
        const res = await updateAccount(updateData)

        res.status === 200 &&
          (await updateUser({
            path: `users/${res.data.localId}.json`,
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
          case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
          case 'TOKEN_EXPIRED':
          case 'INVALID_ID_TOKEN':
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
