import { useState, useEffect } from 'react'
import Table from '../Tables/Table/Table'
import AddPlayersTable from '../Tables/AddPlayersTable'
import { objectToArrayWithId } from '../../helpers/objects'
import {
  updatePlayersInGame,
  fetchPlayers,
  fetchAllGames,
  fetchGameById,
  fetchPlayersOnReserve
} from '../../services/gameService'
import { fetchUserById } from '../../services/accountService'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import clearDate from '../../helpers/clearDate'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import {
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import Prompt from '../../UI/Prompt/Prompt'

const StyledFormControl = styled(FormControl)`
  margin: ${({ theme }) => theme.spacing(1)};
  min-width: 150px;
  width: 40%;
  margin: 40px auto 0;
  ${({ theme }) => `
${theme.breakpoints.up('sm')} {
    margin: 60px auto 0;
`}
`

const GamePlayersTable = () => {
  const [selectedGameId, setSelectedGameId] = useState('')
  const [selectedGamePlayers, setSelectedGamePlayers] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [games, setGames] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedEndTimePlaying, setSelectedEndTimePlaying] = useState(null)
  const [openPrompt, setOpenPrompt] = useState(false)
  const [promptList, setPropmptList] = useState(['Brak godzin do rotacji'])
  const [actualGameId, setActualGameId] = useState(null)
  const [playerIdToAdd, setPlayerIdToAdd] = useState(null)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    setLoading(true)
    try {
      const res = await fetchAllGames()
      const newGames = objectToArrayWithId(res.data)
      setGames(newGames)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać danych gier')
    }
    setLoading(false)
  }

  const getSelectedGameData = async (selectedGameId) => {
    try {
      const res = await fetchGameById(selectedGameId)
      const selectedGamePlayers = objectToArrayWithId(res.data)
      setSelectedGamePlayers(selectedGamePlayers[0].players)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać tej gry')
    }
  }

  const handleChange = (event) => {
    setSelectedGameId(event.target.value)
    getSelectedGameData(event.target.value)
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
    addPlayer(actualGameId, playerIdToAdd, selectedTimeValue)
  }

  const handleOpenPrompt = async (playerId, gameId) => {
    if (gameId) {
      setActualGameId(gameId)
      setPlayerIdToAdd(playerId)
      const resGameDetails = await fetchGameById(gameId)
      const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
      setOpenPrompt(true)
      gameDetails.autoSquads
        ? setPropmptList([
            gameDetails.rotationTime1,
            gameDetails.rotationTime2,
            gameDetails.rotationTime3
          ])
        : setPropmptList([gameDetails.rotationTime1])
    } else {
      setMessageType('warning')
      setOpen(true)
      setMessage('Wybierz grę!')
    }
  }

  const addPlayer = async (gameId, userId, selectedTimeValue) => {
    selectedTimeValue ? selectedTimeValue : (selectedTimeValue = false)

    try {
      const resGameDetails = await fetchGameById(gameId)
      const gameDetails = objectToArrayWithId(resGameDetails.data)[0]
      const gamePlaces = gameDetails.places

      const resPlayers = await fetchPlayers(gameId)
      let players = resPlayers.data
      const oldPlayers = JSON.parse(JSON.stringify(resPlayers.data))

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
      let checkPlayerAlreadyPlaying = oldPlayers
        ? oldPlayers.filter((el) => el.id == userId).length > 0
        : false

      if (
        players &&
        !checkPlayerAlreadyPlaying &&
        gamePlaces >= players.length
      ) {
        await updatePlayersInGame(gameId, {
          players: players
        })
        getSelectedGameData(actualGameId)
        setMessageType('success')
        setOpen(true)
        setMessage('Pomyślnie dodano do gry!')
      } else if (!checkPlayerAlreadyPlaying && gamePlaces < players.length) {
        await updatePlayersInGame(gameId, {
          reserve: playersOnReserve
        })
        setMessageType('warning')
        setOpen(true)
        setMessage('Brak wolnych miejsc. Pomyślnie dodano na rezerwę.')
      } else if (checkPlayerAlreadyPlaying) {
        setMessageType('warning')
        setOpen(true)
        setMessage('Ten gracz już jest dodany do tej gry.')
      }
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      // setMessage(ex.response.data.error.message)
      console.log(ex)
    }
  }

  const removePlayer = async (playerId, gameId) => {
    setActualGameId(gameId)
    setPlayerIdToAdd(playerId)

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
        players = players.filter((el) => el.id !== playerId)
      } else {
        players
          ? (players = players.filter((el) => el.id !== playerId))
          : (players = [{}])

        playersOnReserve
          ? (playersOnReserve = playersOnReserve.filter(
              (el) => el.id !== playerId
            ))
          : (playersOnReserve = [{}])
      }

      await updatePlayersInGame(gameId, {
        players: players,
        reserve: playersOnReserve
      })
      getSelectedGameData(actualGameId)
      setMessageType('success')
      setOpen(true)
      setMessage('Pomyślnie usunięto z gry!')
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie udało się usunąć gracza z gry ;(')
      console.log(ex)
    }
  }

  const tableData = selectedGamePlayers

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
      <Prompt
        selectedEndTimePlaying={selectedEndTimePlaying}
        open={openPrompt}
        onClose={handlePromptClose}
        list={promptList}
        gameId={selectedGameId}
      />
      <StyledTitle>
        <StyledTitleTypography variant="h4">
          Wybierz grę i dodaj gracza
        </StyledTitleTypography>
      </StyledTitle>
      <AddPlayersTable
        addPlayer={(playerId) => handleOpenPrompt(playerId, selectedGameId)}
      />
      <StyledFormControl variant="outlined">
        <InputLabel id="select game">Wybierz grę</InputLabel>
        <Select
          labelId="Wybierz grę"
          id="demo-simple-select-outlined"
          value={selectedGameId}
          onChange={handleChange}
          label="Wybierz grę">
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {games &&
            games.map((game) => {
              return (
                <MenuItem key={game.id} value={game.id}>
                  {`${game.city} ${game.street}, ${clearDate(game.dateStart)}`}
                </MenuItem>
              )
            })}
        </Select>
      </StyledFormControl>
      <Table
        autorows={true}
        label={'Przypisani zawodnicy do gry'}
        tableHeaders={['gracz', 'skill', 'usuń']}
        columns={['name', 'skill']}
        filteredColumn={'name'}
        title={`${
          selectedGamePlayers ? `Gracze dodani do gry` : `Brak graczy`
        }`}
        data={tableData ? tableData : []}
        handleClick={(playerId) => removePlayer(playerId, selectedGameId)}
        buttonTitle={'Usuń gracza'}
        buttonColor={'secondary'}
        rowsPerPageOnStart={[3, 12, 24]}
      />
    </>
  )
}

export default GamePlayersTable
