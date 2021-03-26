import styled from 'styled-components'
import {
  StyledContainer as Container,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import AddGameForm from '../../components/Forms/AddGameForm/AddGameForm'
import { validationSchema } from '../../components/Forms/AddGameForm/validationSchema'
import { useFormik } from 'formik'

const StyledContainer = styled(Container)`
  justify-content: flex-start;
`

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
      alert('DODANIE  DO BAZY', JSON.stringify(values, null, 2))
    }
  })

  return (
    <StyledContainer>
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dodaj grę</StyledTitleTypography>
      </StyledTitle>
      <AddGameForm
        formik={formik}
        buttonTittle={'Dodaj'}
        tittle={'Nowa gra'}></AddGameForm>
    </StyledContainer>
  )
}

export default AddGame
