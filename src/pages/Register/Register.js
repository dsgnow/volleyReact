import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/RegisterForm/validationSchema'
import { useFormik } from 'formik'

const Register = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert('rejestracja', JSON.stringify(values, null, 2))
    }
  })

  return (
    <>
      <RegisterForm
        formik={formik}
        buttonTittle={'Zarejestruj się'}
        tittle={'Dołącz do nas'}></RegisterForm>
    </>
  )
}

export default Register
