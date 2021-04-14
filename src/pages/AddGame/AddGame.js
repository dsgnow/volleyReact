import { useState } from 'react'
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
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { addGame } from '../../services/gameService'
import useAuth from '../../hooks/useAuth'

const StyledContainer = styled(Container)`
  justify-content: flex-start;
`

const AddGame = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)
  const [auth] = useAuth()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true)

      const gameTime = formatDistanceStrict(values.dateStart, values.dateEnd, {
        unit: 'minute'
      }).slice(0, -8)

      try {
        await addGame({
          ...values,
          gameTime: gameTime,
          freePlaces: values.places,
          players: [{}],
          reserve: '',
          addedBy: auth.userId
        })

        setMessageType('success')
        setOpen(true)
        setMessage('Pomyślnie dodano nową grę!')
      } catch (ex) {
        setOpen(true)
        setMessageType('warning')
        setMessage(ex.response.data.error.message)
      }
      setLoading(false)
    }
  })

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={messageType}>
            {message}
          </MuiAlert>
        </Snackbar>
      )}
      <StyledContainer>
        <StyledTitle>
          <StyledTitleTypography variant="h4">Dodaj grę</StyledTitleTypography>
        </StyledTitle>
        <AddGameForm
          formik={formik}
          buttonTittle={'Dodaj'}
          tittle={'Nowa gra'}></AddGameForm>
      </StyledContainer>
    </>
  )
}

export default AddGame
