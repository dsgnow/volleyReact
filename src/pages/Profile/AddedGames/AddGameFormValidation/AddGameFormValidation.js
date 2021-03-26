import AddGameForm from '../../../../components/Forms/AddGameForm/AddGameForm'
import { validationSchema } from '../../../../components/Forms/AddGameForm/validationSchema'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'

const AddGameFormValidation = (props) => {
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert('NADPISANIE W BAZIE', JSON.stringify(values, null, 2))
    },
    enableReinitialize: true
  })

  return (
    <AddGameForm
      formik={formik}
      buttonTittle={'Edytuj'}
      tittle={'Edytuj grę'}></AddGameForm>
  )
}

AddGameFormValidation.propTypes = {
  initialValues: PropTypes.object.isRequired
}

export default AddGameFormValidation
