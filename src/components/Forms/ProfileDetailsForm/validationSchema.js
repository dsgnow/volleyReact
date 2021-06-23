import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('To pole jest wymagane..')
    .max(20, 'imię może mieć maksymalnie 20 znaków'),
  lastName: yup
    .string()
    .required('To pole jest wymagane..')
    .max(20, 'nazwisko może mieć maksymalnie 20 znaków'),
  level: yup.string().required('To pole jest wymagane..'),
  email: yup.string().email().required('To pole jest wymagane..'),
  password: yup
    .string()
    .min(6, 'Hasło jest za krótkie.')
    .max(20, 'Hasło jest za długie.')
})

export const initialValues = {
  firstName: '',
  lastName: '',
  level: '',
  email: '',
  password: ''
}
