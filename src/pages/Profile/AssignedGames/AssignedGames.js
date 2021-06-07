import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'
import { objectToArrayWithId } from '../../../helpers/objects'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import LoadingIcon from '../../../UI/LoadingIcon/LoadingIcon'
import { fetchGameByUserTakesPart } from '../../../services/gameService'
import useAuth from '../../../hooks/useAuth'
import filterByDate from '../../../helpers/filterByDate'
import { removePlayerFromGame } from '../../../services/playersService'

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
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
  padding: 10px 0;
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
const StyledTypography = styled(Typography)`
  width: 100%;
  margin: 10px 0;
  text-align: center;
  @media (min-width: 600px) {
    margin: 0px 0 30px;
    text-align: left;
  }
`

const AssignedGames = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [auth] = useAuth()
  const [actualUserId, setActualUserId] = useState(null)

  useEffect(() => {
    setActualUserId(auth.userId)
    fetchGames()
  }, [loading])

  const fetchGames = async () => {
    try {
      const res = await fetchGameByUserTakesPart()
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)

      const filterByUser = newGamesFilteredByDate.filter(
        (game) =>
          (game.players &&
            (game.list = game.players.filter((el) => el.id == auth.userId))
              .length) ||
          (game.reserve &&
            (game.list = game.reserve.filter((el) => el.id == auth.userId))
              .length)
      )

      setGames(filterByUser)
    } catch (ex) {
      setMessage('Nie udało się pobrać gier.')
    }
  }

  const removePlayer = async (gameId, actualUserId) => {
    setLoading(true)
    const res = await removePlayerFromGame(gameId, actualUserId)
    switch (res) {
      case 'Pomyślnie zrezygnowałeś z gry!':
        setMessageType('success')
        setMessage('Pomyślnie zrezygnowałeś z gry!')
        setOpen(true)
        break
      default:
        setMessageType('warning')
        setMessage('Nie udało się zrezygnować z gry.')
        setOpen(true)
    }
    fetchGames()
    setLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
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
      <StyledContainer>
        {games.length > 0 ? (
          <StyledTypography variant="h5">Aktywne gry</StyledTypography>
        ) : (
          <StyledTypography variant="h5">Brak aktywnych gier</StyledTypography>
        )}
        {games.map((game, index) => {
          return (
            <Wrapper key={game.id}>
              <GamesList
                index={index}
                data={game}
                buttonAction="remove"
                removePlayer={() => removePlayer(game.id, actualUserId)}
                tooltip="zrezygnuj"></GamesList>
            </Wrapper>
          )
        })}
      </StyledContainer>
    </>
  )
}

export default AssignedGames
