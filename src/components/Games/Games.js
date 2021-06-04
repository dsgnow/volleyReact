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
import {
  updatePlayersInGame,
  fetchPlayers,
  fetchAllGames,
  fetchGameById,
  fetchPlayersOnReserve
} from '../../services/gameService'
import { fetchUserById } from '../../services/accountService'
import { useState, useEffect } from 'react'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import MuiAlert from '@material-ui/lab/Alert'
import Prompt from '../../UI/Prompt/Prompt'
import sendEmail from '../../services/sendEmail'

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
      const res = await fetchAllGames()
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)
      setGames(newGamesFilteredByDate)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage(ex.response.data.error.message)
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
    selectedTimeValue ? selectedTimeValue : (selectedTimeValue = false)

    try {
      const resGameDetails = await fetchGameById(gameId)
      const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
      const gamePlaces = gameDetails.places

      const resPlayers = await fetchPlayers(gameId)
      let players = resPlayers.data

      const resPlayersOnReserve = await fetchPlayersOnReserve(gameId)
      let playersOnReserve = resPlayersOnReserve.data

      const resUserDetails = await fetchUserById(userId)
      const userDetails = objectToArrayWithId(resUserDetails.data)[0]
      const userName = userDetails.firstName
      const userLastName = userDetails.lastName

      const newPlayer = {
        id: userId,
        name: `${userName} ${userLastName}`,
        endTime: selectedTimeValue,
        skill:
          userDetails.adminLevel != ''
            ? Number(userDetails.adminLevel)
            : Number(userDetails.userLevel),
        info: ''
      }

      players ? players.push(newPlayer) : (players = [newPlayer])
      playersOnReserve
        ? playersOnReserve.push(newPlayer)
        : (playersOnReserve = [newPlayer])

      if (players && gamePlaces >= players.length) {
        await updatePlayersInGame(gameId, {
          players: players
        })
        setMessageType('success')
        setOpen(true)
        setMessage('Pomyślnie dołączyłeś do gry!')
      } else {
        await updatePlayersInGame(gameId, {
          reserve: playersOnReserve
        })
        setMessageType('warning')
        setOpen(true)
        setMessage('Brak wolnych miejsc. Pomyślnie zapisałeś się na rezerwę.')
      }
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      // setMessage(ex.response.data.error.message)
    } finally {
      setLoading(false)
    }
  }

  const removePlayer = async (gameId) => {
    setLoading(true)

    try {
      const resPlayers = await fetchPlayers(gameId)
      let players = resPlayers.data

      const resPlayersOnReserve = await fetchPlayersOnReserve(gameId)
      let playersOnReserve = resPlayersOnReserve.data

      const resGameDetails = await fetchGameById(gameId)
      const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
      const gamePlaces = gameDetails.places

      if (playersOnReserve && players && gamePlaces >= players.length) {
        const resUserDetails = await fetchUserById(playersOnReserve[0].id)
        const userDetails = objectToArrayWithId(resUserDetails.data)[0]
        playersOnReserve[0].id !== actualUserId &&
          sendEmail(userDetails, gameDetails, 'template_viw6vfi')

        players.push(playersOnReserve[0])
        playersOnReserve = playersOnReserve.filter(
          (el) => el.id !== playersOnReserve[0].id
        )
        players = players.filter((el) => el.id !== actualUserId)
      } else {
        players
          ? (players = players.filter((el) => el.id !== actualUserId))
          : (players = [{}])

        playersOnReserve
          ? (playersOnReserve = playersOnReserve.filter(
              (el) => el.id !== actualUserId
            ))
          : (playersOnReserve = [{}])
      }

      await updatePlayersInGame(gameId, {
        players: players,
        reserve: playersOnReserve
      })
      setMessageType('success')
      setOpen(true)
      setMessage('Pomyślnie zrezygnowałeś z gry!')
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      // setMessage(ex.response.data.error.message)
    } finally {
      setLoading(false)
    }
  }

  const checkPlayerIsAssignedToGame = (game) => {
    let isOnMainGame =
      game.players && game.players.filter((el) => el.id == actualUserId).length

    let isOnReserve =
      game.reserve && game.reserve.filter((el) => el.id == actualUserId).length

    if (!!isOnMainGame == false && !!isOnReserve == false) {
      return true
    } else {
      return false
    }
  }

  MediaCard.propTypes = {
    data: PropTypes.array.isRequired
  }

  // const filterByUser = props.data.filter(
  //   (game) =>
  //     (game.list = game.players.filter((el) => el.id == actualUserId)).length
  // )

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
                <StyledCardHeader
                  style={{ backgroundColor: '#004c8b' }}
                  subheader="Zapisz się!"></StyledCardHeader>
              ) : null}
              {game.players &&
              game.players.filter((el) => el.id == actualUserId).length ? (
                <StyledCardHeader
                  style={{ backgroundColor: '#4caf50' }}
                  subheader="Jesteś zapisany!"></StyledCardHeader>
              ) : null}
              {game.reserve &&
              game.reserve.filter((el) => el.id == actualUserId).length ? (
                <StyledCardHeader
                  style={{ backgroundColor: '#ff9800' }}
                  subheader="Jesteś na rezerwie!"></StyledCardHeader>
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
                  Ilość wolnych miejsc:
                  <Box fontWeight="fontWeightBold" display="inline" m={1}>
                    {`${
                      game.players
                        ? game.players.length < game.places
                          ? game.places - game.players.length
                          : 0
                        : game.places
                    }/${game.places}`}
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
                game.players.filter((el) => el.id == actualUserId).length) ||
              (game.reserve &&
                game.reserve.filter((el) => el.id == actualUserId).length) ? (
                <Button
                  size="large"
                  color="primary"
                  onClick={() => removePlayer(game.id, actualUserId)}>
                  Zrezygnuj
                </Button>
              ) : (
                <Button
                  size="large"
                  color="primary"
                  onClick={() => {
                    handleOpenPrompt(game.id)
                  }}>
                  Zapisz się
                </Button>
              )}
              <StylednavLink to={`${url}/składy/${game.id}`}>
                <Button size="large" color="primary">
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
