import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  CardHeader,
  CardActionArea,
  Typography,
  Box,
  Snackbar
} from '@material-ui/core'
import { NavLink, useRouteMatch } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { objectToArrayWithId } from '../../helpers/objects'
import filterByDate from '../../helpers/filterByDate'
import { fetchAllActiveGames, fetchGameById } from '../../services/gameService'
import { useState, useEffect } from 'react'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import MuiAlert from '@material-ui/lab/Alert'
import Prompt from '../../UI/Prompt/Prompt'
import {
  addPlayerToGame,
  removePlayerFromGame
} from '../../services/playersService'

const StyledCard = styled(Card)`
  width: 315px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  margin: 30px 0;
  text-align: left;
  ${({ theme }) => `
    {  
       ${theme.breakpoints.up('sm')} {
        margin: 30px 30px;
        width: 345px;
      }
   `}
`

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`

const StyledCardHeader = styled(CardHeader)`
  color: white;
  span {
    color: white;
    margin: 0 auto;
    text-align: center;
  }
`

const StylednavLink = styled(NavLink)`
  text-decoration: none;
`

const CardMediaHeader = styled(Typography)`
  color: white;
`

export default function MediaCard(props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [games, setGames] = useState(props.data)
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)
  const { url } = useRouteMatch()
  const [auth] = useAuth()
  const [openPrompt, setOpenPrompt] = useState(false)
  const [promptList, setPropmptList] = useState(['Brak godzin do rotacji'])
  const [selectedEndTimePlaying, setSelectedEndTimePlaying] = useState(null)
  const [actualGameId, setActualGameId] = useState(null)
  const [actualUserId, setActualUserId] = useState(null)

  useEffect(() => {
    setActualUserId(auth.userId)
    fetchGames()
  }, [loading])

  const fetchGames = async () => {
    try {
      const res = await fetchAllActiveGames()
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)
      setGames(newGamesFilteredByDate)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie udało się pobrać gier.')
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handlePromptClose = (selectedTimeValue) => {
    setSelectedEndTimePlaying(selectedTimeValue)
    setOpenPrompt(false)
    selectedTimeValue &&
      addPlayer(actualGameId, actualUserId, selectedTimeValue)
  }

  const handleOpenPrompt = async (gameId) => {
    setActualGameId(gameId)
    const resGameDetails = await fetchGameById(gameId)
    const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
    setOpenPrompt(true)
    gameDetails.autoSquads
      ? setPropmptList([
          gameDetails.rotationTime1,
          gameDetails.rotationTime2,
          gameDetails.rotationTime3
        ])
      : setPropmptList([gameDetails.dateEnd])
  }

  const addPlayer = async (gameId, userId, selectedTimeValue) => {
    setLoading(true)

    const res = await addPlayerToGame(gameId, userId, selectedTimeValue)
    switch (res) {
      case 'Pomyślnie dodano do gry!':
        setMessageType('success')
        setMessage('Pomyślnie dołączyłeś do gry!')
        setOpen(true)
        break
      case 'Brak wolnych miejsc. Pomyślnie dodano na rezerwę.':
        setMessageType('warning')
        setMessage('Brak wolnych miejsc. Pomyślnie zapisałeś się na rezerwę.')
        setOpen(true)
        break
      case 'Ten gracz już jest dodany do tej gry.':
        setMessageType('warning')
        setMessage('Ten gracz już jest dodany do tej gry.')
        setOpen(true)
        break
      case 'Ten gracz już jest dodany na rezerwie.':
        setMessageType('warning')
        setMessage('Ten gracz już jest dodany na rezerwie.')
        setOpen(true)
        break
      default:
        setMessageType('warning')
        setMessage('Nie udało się dołaczyć do gry.')
        setOpen(true)
    }
    setLoading(false)
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
      case 'Minął czas rezygnacji.':
        setMessageType('warning')
        setMessage(
          'Ostateczny czas rezygnacji już minął. Skontaktuj się z administratorem.'
        )
        setOpen(true)
        break
      default:
        setMessageType('warning')
        setMessage('Nie udało się zrezygnować z gry.')
        setOpen(true)
    }
    await fetchGames()
    setLoading(false)
  }

  const checkPlayerIsAssignedToGame = (game) => {
    let isOnMainGame =
      game.players && game.players.filter((el) => el.id === actualUserId).length

    let isOnReserve =
      game.reserve && game.reserve.filter((el) => el.id === actualUserId).length

    return !!isOnMainGame === false && !!isOnReserve === false
  }

  MediaCard.propTypes = {
    data: PropTypes.array.isRequired
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

      {games.map((game) => {
        return (
          <StyledCard key={game.id}>
            <Prompt
              selectedEndTimePlaying={selectedEndTimePlaying}
              open={openPrompt}
              onClose={handlePromptClose}
              list={promptList}
              gameId={game.id}
            />
            <CardActionArea>
              <StyledCardMedia title={game.name}>
                <CardMediaHeader variant="h4">{`${game.city}, ${game.name}`}</CardMediaHeader>
              </StyledCardMedia>
              {checkPlayerIsAssignedToGame(game) ? (
                game.players.length < game.places ? (
                  <StyledCardHeader
                    style={{ backgroundColor: '#003c77' }}
                    subheader="Możesz się zapisać!"
                  />
                ) : (
                  <StyledCardHeader
                    style={{ backgroundColor: '#ff9800' }}
                    subheader="Możesz się zapisać na rezerwę!"
                  />
                )
              ) : null}
              {game.players &&
              game.players.filter((el) => el.id === actualUserId).length ? (
                <StyledCardHeader
                  style={{ backgroundColor: '#4caf50' }}
                  subheader="Jesteś zapisany!"
                />
              ) : null}
              {game.reserve &&
              game.reserve.filter((el) => el.id === actualUserId).length ? (
                <StyledCardHeader
                  style={{ backgroundColor: '#ff9800' }}
                  subheader="Jesteś na rezerwie!"
                />
              ) : null}
              <CardContent style={{ marginLeft: 'auto' }}>
                <Typography
                  gutterBottom
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: 700 }}>
                  {`${game.dateStart.slice(0, -3).replace('T', ' ')}`}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: '5px' }}>
                  Czas trwania:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${game.gameTime} min.`}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: '5px' }}>
                  Poziom: {game.level}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Miejsca:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {game.players && game.places}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Wolne miejsca:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${
                      game.players
                        ? game.players.length < game.places
                          ? game.places - game.players.length
                          : 0
                        : game.places
                    }`}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginTop: '5px' }}>
                  Cena:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${game.price} zł/os.`}
                  </Box>
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {`ul. ${game.street}, ${game.city}`}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {(game.players &&
                game.players.filter((el) => el.id === actualUserId).length) ||
              (game.reserve &&
                game.reserve.filter((el) => el.id === actualUserId).length) ? (
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => removePlayer(game.id, actualUserId)}>
                  Zrezygnuj
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => {
                    handleOpenPrompt(game.id)
                  }}>
                  Zapisz się
                </Button>
              )}
              <StylednavLink to={`${url}/lista/${game.id}`}>
                <Button size="small" color="default" variant="contained">
                  Lista
                </Button>
              </StylednavLink>
              <StylednavLink to={`${url}/składy/${game.id}`}>
                <Button size="small" color="default" variant="contained">
                  Składy
                </Button>
              </StylednavLink>
            </CardActions>
          </StyledCard>
        )
      })}
    </>
  )
}
