import { useState } from 'react'
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/RegisterForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import axios from '../../axios-auth'
import useAuth from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()

  console.log(auth)

  if (auth) {
    history.push('/')
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await axios.post('accounts:signUp', {
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
        console.log(ex.response)
      }
      setTimeout(function () {}, 3000)
      setLoading(false)
    }
  })

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      <RegisterForm
        formik={formik}
        buttonTittle={'Zarejestruj się'}
        tittle={'Dołącz do nas'}></RegisterForm>
    </>
  )
}

export default Register
