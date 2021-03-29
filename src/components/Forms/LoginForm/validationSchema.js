import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  email: yup.string().email().required('To pole jest wymagane..'),
  password: yup
    .string()
    .min(6, 'Hasło jest za krótkie.')
    .max(20, 'Hasło jest za długie.')
    .required('To pole jest wymagane..')
})

export const initialValues = {
  email: 'ptr.stachowicz@gmail.com',
  password: 'supertajne123'
}
