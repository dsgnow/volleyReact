import { useContext, useState, useEffect } from 'react'
import ReducerContext from '../../context/ReducerContext'
import useStateStorage from '../../hooks/useStateStorage'
import Table from '../Tables/Table/Table'
import cloneDeep from 'lodash/cloneDeep'
import AddPlayersTable from '../Tables/AddPlayersTable'
import { fetchAllGames, fetchGameById } from '../../services/gameService'
import { objectToArrayWithId } from '../../helpers/objects'
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
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'

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

const GamePlayersTable = (props) => {
  const [selectedGameId, setSelectedGameId] = useState('')
  const [selectedGamePlayers, setSelectedGamePlayers] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [games, setGames] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

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
    setLoading(true)
    try {
      const res = await fetchGameById(selectedGameId)
      const selectedGamePlayers = objectToArrayWithId(res.data)
      setSelectedGamePlayers(selectedGamePlayers[0].players)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać tej gry')
    }
    setLoading(false)
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

  const tableData = selectedGamePlayers

  const addPlayerToGame = (playerId, gameId) => {
    console.log(playerId, gameId)
  }

  const removePlayer = (playerId, gameId) => {
    console.log(playerId + gameId)
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
      <StyledTitle>
        <StyledTitleTypography variant="h4">
          Wybierz grę i dodaj gracza
        </StyledTitleTypography>
      </StyledTitle>
      <AddPlayersTable
        addPlayer={(playerId) => addPlayerToGame(playerId, selectedGameId)}
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
        title={'Gracze dodani do gry'}
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
