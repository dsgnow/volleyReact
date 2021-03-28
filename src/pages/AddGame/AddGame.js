import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  StyledContainer as Container,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import AddGameForm from '../../components/Forms/AddGameForm/AddGameForm'
import {
  validationSchema,
  initialValues
} from '../../components/Forms/AddGameForm/validationSchema'
import { useFormik } from 'formik'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import axios from '../../axios'

const StyledContainer = styled(Container)`
  justify-content: flex-start;
`

const AddGame = () => {
  const [loading, setLoading] = useState(false)
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const res = await axios.post('/games.json', { ...values })
      await sleep(500)
      console.log(res)
      setLoading(false)
    }
  })

  return loading ? (
    <LoadingIcon />
  ) : (
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
