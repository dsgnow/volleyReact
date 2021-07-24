import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimerIcon from '@material-ui/icons/Timer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const StyledTimerIcon = styled(TimerIcon)`
  margin-right: 10px;
`

export default function Prompt(props) {
  const { onClose, open, list, gameDetails } = props
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [openAlert, setOpenAlert] = useState(false)

  const dates = list

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenAlert(false)
  }

  const handleClose = () => {
    onClose(null)
    setOpenAlert(true)
    setMessageType('warning')
    setMessage('Anulowano dołączenie do gry.')
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <>
      {message && (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseAlert}
            severity={messageType}>
            {message}
          </MuiAlert>
        </Snackbar>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}>
        <DialogTitle id="simple-dialog-title">Do której grasz?:)</DialogTitle>
        <List>
          {dates.map((date, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(date)}
              key={date}>
              <StyledTimerIcon />
              <ListItemText
                primary={
                  index !== 2
                    ? dates[dates.length > 1 && index < 2 ? index + 1 : index]
                        .slice(11, -3)
                        .replace('T', ' ')
                    : gameDetails.dateEnd.slice(11, -3).replace('T', ' ')
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  )
}

Prompt.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  list: PropTypes.array,
  gameDetails: PropTypes.object
}
