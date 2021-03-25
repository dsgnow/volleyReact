import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {
  Typography,
  FormControlLabel,
  Switch,
  MenuItem
} from '@material-ui/core'
import styled from 'styled-components'
import {
  StyledContainer as Container,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { format, addHours } from 'date-fns'
import plLocale from 'date-fns/locale/pl'
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined'
import { IconButton, InputAdornment } from '@material-ui/core'

import { useFormik, Field, Form } from 'formik'
import * as yup from 'yup'

const StyledContainer = styled(Container)`
  justify-content: flex-start;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (min-width: 600px) {
    max-width: 60%;
    padding: 30px 80px;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  margin-top: 20px;
  width: 100%;
  align-self: left;
  @media (min-width: 600px) {
    width: 30%;
  }
`

const StyledTypography = styled(Typography)`
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 600px) {
    margin-bottom: 30px;
    text-align: left;
  }
`
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale })
  }
}

let validationSchema = yup.object().shape({
  name: yup.string().required('To pole jest wymagane..'),
  city: yup.string().required('To pole jest wymagane..'),
  street: yup.string().required('To pole jest wymagane..'),
  dateStart: yup.date().required('To pole jest wymagane..'),
  dateEnd: yup
    .date()
    .min(
      yup.ref('dateStart'),
      'czas zakończenia musi być późniejszy niż rozpoczęcia'
    )
    .required('To pole jest wymagane..'),
  places: yup.number().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  price: yup.number().required('To pole jest wymagane..'),
  rotationTime1: yup
    .date()
    .min(
      yup.ref('dateStart'),
      'godzina tej rotacji musi być późniejsza niż rozpoczęcie gry'
    )
    .required('To pole jest wymagane..'),
  rotationTime2: yup
    .date()
    .min(
      yup.ref('rotationTime1'),
      'godzina tej rotacji musi być późniejsza niż poprzedniej'
    )
    .required('To pole jest wymagane..'),
  rotationTime3: yup
    .date()
    .min(
      yup.ref('rotationTime2'),
      'godzina tej rotacji musi być późniejsza niż poprzedniej'
    )
    .required('To pole jest wymagane..')
})

const AddGame = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      street: '',
      dateStart: new Date(),
      dateEnd: new Date(),
      places: '',
      level: '',
      price: '',
      autoSquads: false,
      rotationTime1: new Date(),
      rotationTime2: new Date(),
      rotationTime3: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const { touched, handleChange, setFieldValue, errors, values } = formik

  return (
    <StyledContainer>
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dodaj grę</StyledTitleTypography>
      </StyledTitle>
      <Wrapper>
        <MuiPickersUtilsProvider locale={plLocale} utils={LocalizedUtils}>
          <StyledTypography variant="h5">Nowa gra</StyledTypography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  id="name"
                  label="Nazwa hali"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  variant="outlined"
                  fullWidth
                  value={values.city}
                  onChange={handleChange}
                  id="city"
                  label="Miasto"
                  size="small"
                  name="city"
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={touched.street && Boolean(errors.street)}
                  helperText={touched.street && errors.street}
                  variant="outlined"
                  fullWidth
                  value={values.street}
                  onChange={handleChange}
                  id="street"
                  label="Ulica"
                  size="small"
                  name="street"
                  autoComplete="street-address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  error={touched.dateStart && Boolean(errors.dateStart)}
                  helperText={touched.dateStart && errors.dateStart}
                  size="small"
                  fullWidth
                  label="Data rozpoczęcia"
                  inputVariant="outlined"
                  name={'dateStart'}
                  value={values.dateStart}
                  clearable
                  format="d MMM yyyy HH:mm"
                  disablePast={true}
                  ampm={false}
                  clearLabel="wyczyść"
                  cancelLabel="anuluj"
                  onChange={(e) => setFieldValue('dateStart', e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <DateRangeOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  error={touched.dateEnd && Boolean(errors.dateEnd)}
                  helperText={touched.dateEnd && errors.dateEnd}
                  minDate={values.dateStart}
                  size="small"
                  fullWidth
                  label="Data zakończenia"
                  inputVariant="outlined"
                  name={'dateEnd'}
                  value={values.dateEnd}
                  clearable
                  format="d MMM yyyy HH:mm"
                  disablePast={true}
                  ampm={false}
                  clearLabel="wyczyść"
                  cancelLabel="anuluj"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <DateRangeOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setFieldValue('dateEnd', e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  error={touched.level && Boolean(errors.level)}
                  helperText={touched.level && errors.level}
                  fullWidth
                  id="level"
                  name="level"
                  select
                  label="Poziom"
                  value={values.level}
                  onChange={handleChange}
                  variant="outlined">
                  <MenuItem value="Rekreacyjny">Rekreacyjny</MenuItem>
                  <MenuItem value="Amatorski">Amatorski</MenuItem>
                  <MenuItem value="Profesjonalny">Profesjonalny</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  error={touched.places && Boolean(errors.places)}
                  helperText={touched.places && errors.places}
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={values.places}
                  onChange={handleChange}
                  id="places"
                  label="Ilość miejsc"
                  size="small"
                  name="places"
                  autoComplete="places"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={values.price}
                  onChange={handleChange}
                  id="price"
                  label="Cena za osobę"
                  size="small"
                  name="price"
                  autoComplete="price"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} style={{ margin: '20px 0' }}>
              <FormControlLabel
                control={
                  <Switch
                    autoSquads={values.autoSquads}
                    onChange={handleChange}
                    name="autoSquads"
                    color="primary"
                  />
                }
                label="Dodaj ponowne wybranie składów"
              />
            </Grid>
            {values.autoSquads && (
              <Grid container spacing={2}>
                {[...Array(3)].map((item, index) => {
                  let rotationName = `rotationTime${index + 1}`
                  let beforeRotationName = `rotationTime${index}`
                  console.log(index, rotationName)
                  return (
                    <Grid key={index} item xs={12} sm={6}>
                      <DateTimePicker
                        error={
                          touched[rotationName] && Boolean(errors[rotationName])
                        }
                        helperText={
                          touched[rotationName] && errors[rotationName]
                        }
                        minDate={
                          index === 0
                            ? values.dateStart
                            : values[beforeRotationName]
                        }
                        maxDate={values.dateEnd}
                        size="small"
                        fullWidth
                        label={`Rotacja${index + 1}`}
                        inputVariant="outlined"
                        name={rotationName}
                        value={values[rotationName]}
                        clearable
                        format="d MMM yyyy HH:mm"
                        disablePast={true}
                        ampm={false}
                        clearLabel="wyczyść"
                        cancelLabel="anuluj"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <DateRangeOutlinedIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        onChange={(e) => setFieldValue(rotationName, e)}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            )}
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Dodaj
            </StyledButton>
          </form>
        </MuiPickersUtilsProvider>
      </Wrapper>
    </StyledContainer>
  )
}

export default AddGame
