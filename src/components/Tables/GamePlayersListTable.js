import { useState, useEffect } from 'react'
import Table from '../Tables/Table/Table'
import AddPlayersTable from '../Tables/AddPlayersTable'
import { objectToArrayWithId } from '../../helpers/objects'
import { fetchAllGames, fetchGameById } from '../../services/gameService'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
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
import filterByDate from '../../helpers/filterByDate'
import {
  addPlayerToGame,
  removePlayerFromGame
} from '../../services/playersService'

const StyledFormControl = styled(FormControl)`
  min-width: 150px;
  width: 50%;
  margin: 40px auto 0;
  background-color: white;
  ${({ theme }) => `
${theme.breakpoints.up('sm')} {
    margin: 60px auto 0;
`}
`

const GamePlayersTable = () => {
  const [selectedGameId, setSelectedGameId] = useState('')
  const [selectedGamePlayers, setSelectedGamePlayers] = useState('')
  const [selectedGameData, setSelectedGameData] = useState('')
  const [loading] = useState(false)
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
    try {
      const res = await fetchAllGames()
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)
      setGames(newGamesFilteredByDate)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie mo??na pobra?? danych gier')
    }
  }

  const getSelectedGameData = async (selectedGameId) => {
    try {
      const res = await fetchGameById(selectedGameId)
      const selectedGamePlayers = objectToArrayWithId(res.data)
      const selectedGameData = objectToArrayWithId(res.data)
      setSelectedGamePlayers(selectedGamePlayers[0].players)
      setSelectedGameData(selectedGameData[0])
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie mo??na pobra?? tej gry')
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
    selectedTimeValue &&
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
        : setPropmptList([gameDetails.dateEnd])
    } else {
      setMessageType('warning')
      setOpen(true)
      setMessage('Wybierz gr??!')
    }
  }

  const addPlayer = async (gameId, userId, selectedTimeValue) => {
    const res = await addPlayerToGame(gameId, userId, selectedTimeValue)
    switch (res) {
      case 'Pomy??lnie dodano do gry!':
        await getSelectedGameData(gameId)
        setMessageType('success')
        setMessage('Pomy??lnie dodano do gry!')
        setOpen(true)
        break
      case 'Brak wolnych miejsc. Pomy??lnie dodano na rezerw??.':
        setMessageType('warning')
        setMessage('Brak wolnych miejsc. Pomy??lnie dodano na rezerw??.')
        setOpen(true)
        break
      case 'Ten gracz ju?? jest dodany do tej gry.':
        setMessageType('warning')
        setMessage('Ten gracz ju?? jest dodany do tej gry.')
        setOpen(true)
        break
      case 'Ten gracz ju?? jest dodany na rezerwie.':
        setMessageType('warning')
        setMessage('Ten gracz ju?? jest dodany na rezerwie.')
        setOpen(true)
        break
      default:
        setMessageType('warning')
        setMessage('Nie uda??o si?? do??aczy?? do gry.')
        setOpen(true)
    }
  }

  const removePlayer = async (gameId, actualUserId) => {
    const res = await removePlayerFromGame(gameId, actualUserId, true)
    switch (res) {
      case 'Pomy??lnie zrezygnowa??e?? z gry!':
        await getSelectedGameData(gameId)
        setMessageType('success')
        setMessage('Pomy??lnie usuni??to z gry!')
        setOpen(true)
        break
      default:
        setMessageType('warning')
        setMessage('Nie uda??o si?? zrezygnowa?? z gry.')
        setOpen(true)
    }
    await fetchGames()
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
        gameDetails={selectedGameData}
      />
      <StyledTitle>
        <StyledTitleTypography variant="h4">
          Wybierz gr?? i dodaj gracza
        </StyledTitleTypography>
      </StyledTitle>
      <AddPlayersTable
        addPlayer={(playerId) => handleOpenPrompt(playerId, selectedGameId)}
      />
      <StyledFormControl variant="outlined">
        <InputLabel id="select game">Wybierz gr??</InputLabel>
        <Select
          labelId="Wybierz gr??"
          id="demo-simple-select-outlined"
          value={selectedGameId}
          onChange={handleChange}
          label="Wybierz gr??">
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          {games &&
            games.map((game) => {
              return (
                <MenuItem key={game.id} value={game.id}>
                  {`${game.city} ${game.street}, ${game.dateStart.slice(
                    0,
                    -3
                  )}`}
                </MenuItem>
              )
            })}
        </Select>
      </StyledFormControl>
      <Table
        autorows={true}
        label={'Przypisani zawodnicy do gry'}
        tableHeaders={['gracz', 'skill', 'usu??']}
        columns={['name', 'skill']}
        filteredColumn={'name'}
        title={`${
          selectedGamePlayers ? `Gracze dodani do gry` : `Brak graczy`
        }`}
        data={tableData ? tableData : []}
        handleClick={(playerId) => removePlayer(selectedGameId, playerId)}
        buttonTitle={'Usu?? gracza'}
        buttonColor={'secondary'}
        rowsPerPageOnStart={[3, 12, 24]}
      />
    </>
  )
}

export default GamePlayersTable
