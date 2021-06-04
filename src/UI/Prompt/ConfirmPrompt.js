import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

const ConfirmPrompt = (props) => {
  const [open, setOpen] = useState(true)

  const handleCloseOk = () => {
    let ok = () => props.agree()
    ok()
  }

  const handleCloseCancel = () => {
    let cancel = () => props.cancel()
    cancel()
  }

  const handleClose = () => {
    setOpen(false)
  }

  ConfirmPrompt.propTypes = {
    agree: PropTypes.func,
    cancel: PropTypes.func
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Usunąć grę?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jesteś pewny? Gra zostanie usunięta na stałe.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleCloseOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmPrompt
