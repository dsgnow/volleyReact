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

const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState('')

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
        setError(ex.response.data.error.message)
        setLoading(false)
        console.log(ex.response)
      }

      if (auth) {
        history.push('/')
      }
    }
  })

  return (
    <>
      <LoginForm
        formik={formik}
        buttonTittle={'Zaloguj'}
        tittle={'Logowanie'}></LoginForm>
    </>
  )
}

export default Login
