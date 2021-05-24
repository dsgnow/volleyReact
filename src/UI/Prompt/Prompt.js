import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimerIcon from '@material-ui/icons/Timer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { parseISO, format } from 'date-fns'

const StyledTimerIcon = styled(TimerIcon)`
  margin-right: 10px;
`

export default function Prompt(props) {
  const { onClose, selectedValue, open, list } = props

  const dates = list

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Do której grasz?:)</DialogTitle>
      <List>
        {dates.map((date) => (
          <ListItem button onClick={() => handleListItemClick(date)} key={date}>
            <StyledTimerIcon />
            <ListItemText primary={date.slice(0, -5).replace('T', ' ')} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

Prompt.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
  list: PropTypes.array
}
