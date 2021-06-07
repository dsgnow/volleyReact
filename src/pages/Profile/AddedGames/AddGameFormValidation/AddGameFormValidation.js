import { useState } from 'react'
import AddGameForm from '../../../../components/Forms/AddGameForm/AddGameForm'
import { validationSchema } from '../../../../components/Forms/AddGameForm/validationSchema'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { parseISO, isValid } from 'date-fns'
import { updateGame, fetchGameById } from '../../../../services/gameService'
import { objectToArrayWithId } from '../../../../helpers/objects'
import useAuth from '../../../../hooks/useAuth'

const AddGameFormValidation = (props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)
  const [auth] = useAuth()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true)

      const gameTime = formatDistanceStrict(
        !isValid(values.dateStart)
          ? parseISO(values.dateStart)
          : values.dateStart,
        !isValid(values.dateEnd) ? parseISO(values.dateEnd) : values.dateEnd,
        {
          unit: 'minute'
        }
      ).slice(0, -8)

      let playersInGame
      let reserve

      try {
        const resOldGame = await fetchGameById(values.id)
        let oldGame = objectToArrayWithId(resOldGame.data)[0]

        if (oldGame.players && oldGame.players.length >= values.places) {
          let playersToReserve = oldGame.players.slice(values.places)
          playersInGame = oldGame.players.slice(0, values.places)
          reserve = oldGame.reserve
            ? oldGame.reserve.push(playersToReserve)
            : playersToReserve
        } else if (
          oldGame.players &&
          oldGame.players.length < values.places &&
          oldGame.reserve
        ) {
          const numberOfReservePlayersToPush =
            oldGame.players.length - values.places
          const playersToGame = oldGame.reserve.slice(
            0,
            Math.abs(numberOfReservePlayersToPush)
          )
          reserve = oldGame.reserve.slice(
            Math.abs(numberOfReservePlayersToPush)
          )
          playersInGame = oldGame.players
            ? oldGame.players.push(playersToGame)
            : playersToGame
        } else if (!oldGame.players && oldGame.reserve && values.places > 0) {
          const numberOfReservePlayersToPush = values.places
          const playersToGame = oldGame.reserve.slice(
            0,
            Math.abs(numberOfReservePlayersToPush)
          )
          reserve = oldGame.reserve.slice(
            Math.abs(numberOfReservePlayersToPush)
          )
          playersInGame = playersToGame
        } else {
          reserve = oldGame.reserve
          playersInGame = oldGame.players
        }

        await updateGame({
          ...values,
          players: playersInGame,
          reserve: reserve,
          gameTime: gameTime,
          addedBy: auth.userId
        })
        // await calcSquads(values.id)
        setMessageType('success')
        setOpen(true)
        setMessage('Pomyślnie nadpisano grę!')
      } catch (ex) {
        setOpen(true)
        setMessageType('warning')
        setMessage('Nie udało się nadpisać gry.')
      }
      setLoading(false)
    },
    enableReinitialize: true
  })

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
      <AddGameForm
        hide={true}
        formik={formik}
        buttonTittle={'Edytuj'}
        tittle={'Edytuj grę'}></AddGameForm>
    </>
  )
}

AddGameFormValidation.propTypes = {
  initialValues: PropTypes.object.isRequired
}

export default AddGameFormValidation
