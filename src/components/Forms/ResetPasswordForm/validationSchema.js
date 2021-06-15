import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Wpisz poprawny email.')
    .required('To pole jest wymagane..')
})

export const initialValues = {
  email: ''
}
