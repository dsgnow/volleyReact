import styled from 'styled-components'
import {
  StyledContainer as Container,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import AddGameForm from '../../components/Games/AddGameForm'
import { useFormik } from 'formik'
import * as yup from 'yup'

const StyledContainer = styled(Container)`
  justify-content: flex-start;
`

let validationSchema = yup.object().shape({
  name: yup.string().required('To pole jest wymagane..'),
  city: yup.string().required('To pole jest wymagane..'),
  street: yup.string().required('To pole jest wymagane..'),
  dateStart: yup.date().required('To pole jest wymagane..').nullable(),
  dateEnd: yup
    .date()
    .min(
      yup.ref('dateStart'),
      'czas zakończenia musi być późniejszy niż rozpoczęcia'
    )
    .required('To pole jest wymagane..')
    .nullable(),
  places: yup.number().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  price: yup.number().required('To pole jest wymagane..'),
  rotationTime1: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('dateStart'),
          'godzina tej rotacji musi być późniejsza niż rozpoczęcie gry'
        )
        .required('To pole jest wymagane..')
        .nullable()
    }),
  rotationTime2: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('rotationTime2'),
          'godzina tej rotacji musi być późniejsza niż poprzedniej'
        )
        .required('To pole jest wymagane..')
        .nullable()
    }),
  rotationTime3: yup
    .date()
    .nullable()
    .when('autoSquads', {
      is: true,
      then: yup
        .date()
        .min(
          yup.ref('rotationTime3'),
          'godzina tej rotacji musi być późniejsza niż poprzedniej'
        )
        .required('To pole jest wymagane..')
        .nullable()
    })
})

const AddGame = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      street: '',
      dateStart: null,
      dateEnd: null,
      places: '',
      level: '',
      price: '',
      autoSquads: false,
      rotationTime1: null,
      rotationTime2: null,
      rotationTime3: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <StyledContainer>
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dodaj grę</StyledTitleTypography>
      </StyledTitle>
      <AddGameForm formik={formik}></AddGameForm>
    </StyledContainer>
  )
}

export default AddGame
