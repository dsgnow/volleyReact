import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  CardActionArea,
  Typography,
  Box
} from '@material-ui/core'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import useAuth from '../../hooks/useAuth'
import { objectToArrayWithId } from '../../helpers/objects'
import {
  updatePlayersInGame,
  fetchPlayers,
  fetchAllGames,
  fetchGameById,
  fetchPlayersOnReserve
} from '../../services/gameService'
import { fetchUserById } from '../../services/accountService'
import { useState, useEffect, useReducer } from 'react'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

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
  const id = 1
  const [auth] = useAuth()

  useEffect(() => {
    fetchGames()
  }, [loading])

  const fetchGames = async () => {
    try {
      const res = await fetchAllGames()
      const newGames = objectToArrayWithId(res.data)
      setGames(newGames)
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

  const addPlayer = async (gameId, userId) => {
    setLoading(true)

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
        name: `${userName} ${userLastName}`
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
      setMessage(ex.response.data.error.message)
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
        players.push(playersOnReserve[0])
        playersOnReserve = playersOnReserve.filter(
          (el) => el.id !== playersOnReserve[0].id
        )
        players = players.filter((el) => el.id !== auth.userId)
      } else {
        players
          ? (players = players.filter((el) => el.id !== auth.userId))
          : (players = [{}])

        playersOnReserve
          ? (playersOnReserve = playersOnReserve.filter(
              (el) => el.id !== auth.userId
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
      console.log(ex)
    } finally {
      setLoading(false)
    }
  }

  MediaCard.propTypes = {
    data: PropTypes.array.isRequired
  }

  // const filterByUser = props.data.filter(
  //   (game) =>
  //     (game.list = game.players.filter((el) => el.id == auth.userId)).length
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
            <CardActionArea>
              <StyledCardMedia title={game.name}>
                <CardMediaHeader variant="h4">{`${game.city}, ${game.name}`}</CardMediaHeader>
              </StyledCardMedia>
              <CardContent style={{ marginLeft: 'auto' }}>
                <Typography
                  gutterBottom
                  color="textPrimary"
                  variant="h5"
                  style={{ fontWeight: 700 }}>
                  {`${format(parseISO(game.dateStart), 'dd.MM.yyyy HH:mm')}`}
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
                  {`${game.street}, ${game.city}`}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {(game.players &&
                game.players.filter((el) => el.id == auth.userId).length) ||
              (game.reserve &&
                game.reserve.filter((el) => el.id == auth.userId).length) ? (
                <Button
                  size="large"
                  color="primary"
                  onClick={() => removePlayer(game.id, auth.userId)}>
                  Zrezygnuj
                </Button>
              ) : (
                <Button
                  size="large"
                  color="primary"
                  onClick={() => addPlayer(game.id, auth.userId)}>
                  Zapisz się
                </Button>
              )}
              <StylednavLink to={`${url}/składy/${id}`}>
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
