import { useState, useEffect } from 'react'
import Table from '../Tables/Table/Table'
import PropTypes from 'prop-types'
import { fetchAllPlayers } from '../../services/gameService'
import { updateUser } from '../../services/accountService'
import { objectToArrayWithId } from '../../helpers/objects'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const AddPlayersTable = (props) => {
  const [loading] = useState(false)
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
    try {
      const res = await fetchAllPlayers()
      const allPlayers = objectToArrayWithId(res.data)
      setAllPlayers(allPlayers)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać danych użytkowników')
    }
  }

  const changeSkill = async (playerNewSkill, playerId) => {
    try {
      await updateUser({
        path: `users/${playerId}.json`,
        adminLevel: Number(playerNewSkill)
      })
      fetchPlayers()
      setMessageType('success')
      setOpen(true)
      setMessage('Pomyślnie zmieniono poziom gracza!')
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie udało się zmienić poziomu gracza')
    }
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
        tableHeaders={[
          'imię',
          'nazwisko',
          'poziom',
          'poziom(admin)',
          'zmień poziom',
          'dodaj'
        ]}
        columns={['firstName', 'lastName', 'userLevel', 'adminLevel']}
        filteredColumn={'lastName'}
        title={'Wszyscy użytkownicy'}
        data={allPlayers ? allPlayers : []}
        handleClick={(playerId) => props.addPlayer(playerId)}
        handleChangeSelect={(playerNewSkill, playerId) =>
          changeSkill(playerNewSkill, playerId)
        }
        buttonTitle={'Dodaj gracza'}
        selectSkill={true}
        buttonColor={'primary'}
        rowsPerPageOnStart={[1, 6, 12]}
      />
    </>
  )
}

AddPlayersTable.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  changeSkill: PropTypes.func.isRequired
}

export default AddPlayersTable
