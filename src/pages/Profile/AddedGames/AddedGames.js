import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useState, useEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'
import AddGameFormValidation from './AddGameFormValidation/AddGameFormValidation'
import { initialValues as defaultInitialValues } from '../../../components/Forms/AddGameForm/validationSchema'
import { objectToArrayWithId } from '../../../helpers/objects'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import LoadingIcon from '../../../UI/LoadingIcon/LoadingIcon'
import {
  fetchGameByUserAdded,
  fetchGameById,
  deleteGame
} from '../../../services/gameService'
import useAuth from '../../../hooks/useAuth'
import filterByDate from '../../../helpers/filterByDate'
import ConfirmPrompt from '../../../UI/Prompt/ConfirmPrompt'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 40px;
    flex-direction: row;
  }
  @media (min-width: 1000px) {
    padding: 80px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
  align-items: center;
  width: 95%;
  margin: 10px auto;
  padding: 10px 10px 0;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    width: auto;
    min-width: 200px;
    margin: 20px auto 20px 0;
    padding: 0 20px;
  }
`

const WrapForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 20px auto;
  padding: 20px 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    min-width: 400px;
    width: 100%;
    margin: 20px auto 50px 0;
  }
`

const StyledTypography = styled(Typography)`
  width: 100%;
  margin: 10px 0;
  text-align: center;
  @media (min-width: 600px) {
    margin: 0 0 30px;
    text-align: left;
  }
`

const AddedGames = () => {
  const selectForm = useRef()
  const [initialValues, setInitialValues] = useState(defaultInitialValues)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [gameIsSelected, setGameIsSelected] = useState(false)
  const [gameIsChanging, setGameIsChanging] = useState(false)
  const [auth] = useAuth()
  const [messageType, setMessageType] = useState('')
  const [message, setMessage] = useState('')
  const [confPrompt, setConfPrompt] = useState(false)
  const [actualGameId, setActualGameId] = useState(false)

  useEffect(() => {
    fetchGames()
  }, [])

  useEffect(() => {}, [gameIsChanging])

  const editGame = async (gameId) => {
    setLoading(true)

    try {
      const res = await fetchGameById(gameId)
      const fetchedGame = objectToArrayWithId(res.data)
      // noinspection JSCheckFunctionSignatures
      setInitialValues({
        ...fetchedGame[0]
      })
    } catch (ex) {
      setMessage('Nie udało się pobrać danych gry.')
    }
    setLoading(false)
    selectForm.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const fetchGames = async () => {
    try {
      const res = await fetchGameByUserAdded(auth.userId)
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)
      setGames(newGamesFilteredByDate)
    } catch (ex) {
      setMessage('Nie udało się pobrać gier.')
    }
    setLoading(false)
  }

  const handleAgree = (event) => {
    setConfPrompt(true)
    setActualGameId(event)
  }

  const deleteGameHandler = async () => {
    setConfPrompt(false)
    try {
      await deleteGame(actualGameId)
      await fetchGames()
      setGameIsSelected(false)
      setMessageType('success')
      setOpen(true)
      setMessage('Pomyślnie usunięto grę!')
    } catch (ex) {
      setMessageType('warning')
      setOpen(true)
      setMessage('Nie można usunąć gry.')
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const showForm = () => {
    setGameIsSelected(true)
    setGameIsChanging(gameIsChanging)
  }

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
      {confPrompt && (
        <ConfirmPrompt
          open={confPrompt}
          cancel={() => setConfPrompt(false)}
          agree={() => deleteGameHandler()}
        />
      )}
      <StyledContainer>
        {games.length > 0 ? (
          <StyledTypography variant="h5">Twoje gry</StyledTypography>
        ) : (
          <StyledTypography variant="h5">
            Nie dodałeś jeszcze żadnych gier
          </StyledTypography>
        )}
        {games.map((game, index) => {
          return (
            <Wrapper key={game.id}>
              <GamesList
                index={index}
                data={game}
                buttonAction="edit"
                clickHandler={(event) => {
                  showForm()
                  editGame(event)
                }}
                deleteGame={(event) => handleAgree(event)}
                tooltip="edytuj"
              />
            </Wrapper>
          )
        })}
        {gameIsSelected && (
          <WrapForm ref={selectForm}>
            <AddGameFormValidation initialValues={initialValues} />
          </WrapForm>
        )}
      </StyledContainer>
    </>
  )
}

export default AddedGames
