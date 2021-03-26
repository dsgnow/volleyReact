import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('To pole jest wymagane..'),
  lastName: yup.string().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  email: yup.string().email().required('To pole jest wymagane..'),
  password: yup
    .string()
    .min(6, 'Hasło jest za krótkie.')
    .max(20, 'Hasło jest za długie.')
    .required('To pole jest wymagane..')
})

export const initialValues = {
  firstName: '',
  lastName: '',
  level: '',
  email: '',
  password: ''
}
