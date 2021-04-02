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
import { updateGame } from '../../../../services/gameService'

const AddGameFormValidation = (props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

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
      console.log(isValid(values.dateStart))

      const gameTime = formatDistanceStrict(
        !isValid(values.dateStart)
          ? parseISO(values.dateStart)
          : values.dateStart,
        !isValid(values.dateEnd) ? parseISO(values.dateEnd) : values.dateEnd,
        {
          unit: 'minute'
        }
      ).slice(0, -8)

      try {
        console.log(values)
        await updateGame({
          ...values,
          gameTime: gameTime
        })

        setMessageType('success')
        setOpen(true)
        setMessage('Pomyślnie nadpisano grę!')
      } catch (ex) {
        setOpen(true)
        setMessageType('warning')
        setMessage(ex.response.data.error.message)
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
