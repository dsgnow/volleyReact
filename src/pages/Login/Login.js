import LoginForm from '../../components/Forms/LoginForm/LoginForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/LoginForm/validationSchema'
import { useFormik } from 'formik'

const Login = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert('logowanie', JSON.stringify(values, null, 2))
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
