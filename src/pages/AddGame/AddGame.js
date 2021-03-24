/* eslint-disable react/jsx-wrap-multilines */
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
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import plLocale from 'date-fns/locale/pl'

import { useFormik, Field } from 'formik'
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
let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
const yyyy = today.getFullYear()

today = yyyy + '-' + mm + '-' + dd

let validationSchema = yup.object().shape({
  name: yup.string().required('To pole jest wymagane..'),
  city: yup.string().required('To pole jest wymagane..'),
  street: yup.string().required('To pole jest wymagane..'),
  timeStart: yup.string().required('To pole jest wymagane..'),
  timeEnd: yup.string().required('To pole jest wymagane..'),
  places: yup.number().required('To pole jest wymagane..'),
  level: yup.string().required('To pole jest wymagane..'),
  price: yup.number().required('To pole jest wymagane..'),
  // rotationTime1: yup.string().required('To pole jest wymagane..'),
  rotationTime2: yup.string().required('To pole jest wymagane..'),
  rotationTime3: yup.string().required('To pole jest wymagane..'),
  rotationTime1: yup.string().when('rotationTime2', {
    is: '00:00',
    then: yup.string().required('Nie może być 00')
  })
})

const AddGame = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      street: '',
      date: new Date(),
      timeStart: '21:30',
      timeEnd: '03:00',
      places: '',
      level: '',
      price: '',
      autoSquads: false,
      rotationTime1: '00:00',
      rotationTime2: '01:00',
      rotationTime3: '02:00'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  console.log(formik.initialValues)

  return (
    <StyledContainer>
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dodaj grę</StyledTitleTypography>
      </StyledTitle>
      <Wrapper>
        <StyledTypography variant="h5">Nowa gra</StyledTypography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoComplete="name"
                name="name"
                variant="outlined"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                id="name"
                label="Nazwa hali"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                variant="outlined"
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                id="city"
                label="Miasto"
                size="small"
                name="city"
                autoComplete="address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
                variant="outlined"
                fullWidth
                value={formik.values.street}
                onChange={formik.handleChange}
                id="street"
                label="Ulica"
                size="small"
                name="street"
                autoComplete="street-address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                variant="outlined"
                fullWidth
                value={formik.values.date}
                onChange={formik.handleChange}
                id="date"
                size="small"
                type="date"
                name="date"
                label="Data"
              /> */}
              <MuiPickersUtilsProvider locale={plLocale} utils={DateFnsUtils}>
                <DateTimePicker
                  label="DateTimePicker"
                  inputVariant="outlined"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                error={
                  formik.touched.timeStart && Boolean(formik.errors.timeStart)
                }
                helperText={formik.touched.timeStart && formik.errors.timeStart}
                variant="outlined"
                fullWidth
                value={formik.values.timeStart}
                onChange={formik.handleChange}
                id="timeStart"
                size="small"
                type="time"
                label="Rozpoczęcie"
                name="timeStart"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                error={formik.touched.timeEnd && Boolean(formik.errors.timeEnd)}
                helperText={formik.touched.timeEnd && formik.errors.timeEnd}
                variant="outlined"
                fullWidth
                value={formik.values.timeEnd}
                onChange={formik.handleChange}
                id="timeEnd"
                size="small"
                type="time"
                label="Zakończenie"
                name="timeEnd"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                error={formik.touched.level && Boolean(formik.errors.level)}
                helperText={formik.touched.level && formik.errors.level}
                fullWidth
                id="level"
                name="level"
                select
                label="Poziom"
                value={formik.values.level}
                onChange={formik.handleChange}
                variant="outlined">
                <MenuItem value="Rekreacyjny">Rekreacyjny</MenuItem>
                <MenuItem value="Amatorski">Amatorski</MenuItem>
                <MenuItem value="Profesjonalny">Profesjonalny</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                error={formik.touched.places && Boolean(formik.errors.places)}
                helperText={formik.touched.places && formik.errors.places}
                variant="outlined"
                type="number"
                fullWidth
                value={formik.values.places}
                onChange={formik.handleChange}
                id="places"
                label="Ilość miejsc"
                size="small"
                name="places"
                autoComplete="places"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                variant="outlined"
                type="number"
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                id="price"
                label="Cena za osobę"
                size="small"
                name="price"
                autoComplete="price"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Switch
                  autoSquads={formik.values.autoSquads}
                  onChange={formik.handleChange}
                  name="autoSquads"
                  color="primary"
                />
              }
              label="Dodaj ponowne wybranie składów"
            />
          </Grid>
          {formik.values.autoSquads && (
            <Grid container spacing={2}>
              {[...Array(3)].map((item, index) => {
                let rotationName = `rotationTime${index + 1}`
                console.log(rotationName)
                return (
                  <Grid key={index} item xs={6} sm={3}>
                    <TextField
                      error={
                        formik.touched[rotationName] &&
                        Boolean(formik.errors[rotationName])
                      }
                      helperText={
                        formik.touched[rotationName] &&
                        formik.errors[rotationName]
                      }
                      variant="outlined"
                      fullWidth
                      value={formik.values[rotationName]}
                      onChange={formik.handleChange}
                      id={rotationName}
                      size="small"
                      type="time"
                      label={`Rotacja ${index + 1}`}
                      name={rotationName}
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
      </Wrapper>
    </StyledContainer>
  )
}

export default AddGame
