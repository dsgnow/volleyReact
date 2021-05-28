import { useState, useEffect } from 'react'
import Table from '../Tables/Table/Table'
import PropTypes from 'prop-types'
import { fetchAllPlayers } from '../../services/gameService'
import { objectToArrayWithId } from '../../helpers/objects'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const AddPlayersTable = (props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [allPlayers, setAllPlayers] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const res = await fetchAllPlayers()
      const allPlayers = objectToArrayWithId(res.data)
      setAllPlayers(allPlayers)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać danych użytkowników')
    }
    setLoading(false)
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
      <Table
        autorows={false}
        label={'Dodaj zawodników do gry'}
        tableHeaders={['imię', 'nazwisko', 'dodaj']}
        columns={['firstName', 'lastName']}
        filteredColumn={'lastName'}
        title={'Wszyscy użytkownicy'}
        data={allPlayers ? allPlayers : []}
        handleClick={(playerId) => props.addPlayer(playerId)}
        buttonTitle={'Dodaj gracza'}
        buttonColor={'primary'}
        rowsPerPageOnStart={[1, 6, 12]}
      />
    </>
  )
}

AddPlayersTable.propTypes = {
  addPlayer: PropTypes.func.isRequired
}

export default AddPlayersTable
