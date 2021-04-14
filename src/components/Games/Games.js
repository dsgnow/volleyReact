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
import { addPlayerToGame, fetchPlayers } from '../../services/gameService'
import { useState } from 'react'
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
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)
  const { url } = useRouteMatch()
  const id = 1
  const [auth] = useAuth()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const addPlayer = async (gameId, userId) => {
    setLoading(true)
    const resPlayers = await fetchPlayers(gameId)
    try {
      let players = resPlayers.data
      const newPlayer = {
        id: userId,
        name: 'Test dodania usera'
      }
      players.length ? players.push(newPlayer) : (players = [newPlayer])
      await addPlayerToGame(gameId, {
        players: players
      })
      setMessageType('success')
      setOpen(true)
      setMessage('Pomyślnie dodano do gry!')
    } catch (ex) {
      console.log(ex)
      setOpen(true)
      setMessageType('warning')
      setMessage(ex.response.data.error.message)
    }
    setLoading(false)
  }

  const removePlayer = (gameId, userId) => {
    console.log(gameId, userId)
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
      {props.data.map((game) => {
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
                    {`${game.freePlaces}/${game.places}`}
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
              {game.players &&
              game.players.filter((el) => el.id == auth.userId).length ? (
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
