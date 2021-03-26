import ProfileDetailsForm from '../../../../components/Forms/ProfileDetailsForm/ProfileDetailsForm'
import {
  validationSchema,
  initialValues
} from '../../../../components/Forms/ProfileDetailsForm/validationSchema'
import { useFormik } from 'formik'

const ProfileFormValidation = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <ProfileDetailsForm
      formik={formik}
      tittle={'Twoje dane'}
      buttonTittle={'Aktualizuj'}></ProfileDetailsForm>
  )
}

export default ProfileFormValidation
