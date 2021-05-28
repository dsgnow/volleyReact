import { useState } from 'react'
import GamePlayersTable from '../../../components/Tables/GamePlayersListTable'
import { StyledContainer } from '../../../Assets/Styles/GlobalStyles'
import LoadingIcon from '../../../UI/LoadingIcon/LoadingIcon'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const AddPlayersToGame = () => {
  const [loading] = useState(false)
  const [message] = useState('')
  const [messageType] = useState('')
  const [open, setOpen] = useState(false)

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
      <StyledContainer style={{ flexDirection: 'column' }}>
        <GamePlayersTable />
      </StyledContainer>
    </>
  )
}

export default AddPlayersToGame
