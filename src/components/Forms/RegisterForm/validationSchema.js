import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('To pole jest wymagane..'),
  lastName: yup.string().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  email: yup
    .string()
    .email('Wpisz poprawny email')
    .required('To pole jest wymagane..'),
  password: yup
    .string()
    .min(6, 'Hasło jest za krótkie.')
    .max(20, 'Hasło jest za długie.')
    .required('To pole jest wymagane..'),
  confirmPassword: yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .min(6, 'Hasło jest za krótkie.')
      .max(20, 'Hasło jest za długie.')
      .required('To pole jest wymagane..')
      .oneOf([yup.ref('password')], 'Oba hasła muszą być takie same.')
  })
})

export const initialValues = {
  firstName: '',
  lastName: '',
  level: 5,
  email: '',
  password: '',
  confirmPassword: ''
}
