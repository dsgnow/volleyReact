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
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { format, isValid } from 'date-fns'
import plLocale from 'date-fns/locale/pl'
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined'
import { IconButton, InputAdornment } from '@material-ui/core'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (min-width: 1400px) {
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
  font-weight: 700;
  text-align: center;
  @media (min-width: 600px) {
    text-align: left;
  }
`

const StyledSwitchGrid = styled(Grid)`
  margin: 20px 0;
  padding: 0;
  text-align: left;
`
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale })
  }
}

const AddGameForm = (props) => {
  const { formik, hide } = props

  const { touched, handleChange, setFieldValue, errors, values } = formik

  return (
    <Wrapper>
      <MuiPickersUtilsProvider locale={plLocale} utils={LocalizedUtils}>
        <StyledTypography variant="h5">{props.tittle}</StyledTypography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <StyledSwitchGrid item xs={12} sm={6}>
              <FormControlLabel
                label="Aktywna"
                control={
                  <Switch
                    value={values.active}
                    checked={values.active}
                    onChange={handleChange}
                    name="active"
                    id="active"
                    color="primary"
                  />
                }
              />
            </StyledSwitchGrid>
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
                disabled={hide}
                error={touched.dateStart && Boolean(errors.dateStart)}
                helperText={touched.dateStart && errors.dateStart}
                size="small"
                fullWidth
                label="Data rozpoczęcia"
                inputVariant="outlined"
                name={'dateStart'}
                value={
                  !isValid(values.dateStart) && values.dateStart
                    ? values.dateStart.slice(0, -5)
                    : values.dateStart
                }
                clearable
                format="d MMM yyyy HH:mm:ss"
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
                disabled={hide}
                error={touched.dateEnd && Boolean(errors.dateEnd)}
                helperText={touched.dateEnd && errors.dateEnd}
                minDate={values.dateStart}
                size="small"
                fullWidth
                label="Data zakończenia"
                inputVariant="outlined"
                name={'dateEnd'}
                value={
                  !isValid(values.dateEnd) && values.dateEnd
                    ? values.dateEnd.slice(0, -5)
                    : values.dateEnd
                }
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
                disabled={hide}
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
          <StyledSwitchGrid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  value={values.autoSquads}
                  checked={values.autoSquads}
                  onChange={handleChange}
                  name="autoSquads"
                  id="autoSquads"
                  color="primary"
                />
              }
              label="Dodaj ponowne wybranie składów"
            />
          </StyledSwitchGrid>
          {values.autoSquads && (
            <Grid container spacing={2}>
              {[...Array(3)].map((item, index) => {
                let rotationName = `rotationTime${index + 1}`
                let beforeRotationName = `rotationTime${index}`
                return (
                  <Grid key={index} item xs={12} sm={6}>
                    <DateTimePicker
                      disabled={hide}
                      error={
                        touched[rotationName] && Boolean(errors[rotationName])
                      }
                      helperText={touched[rotationName] && errors[rotationName]}
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
            {props.buttonTittle}
          </StyledButton>
        </form>
      </MuiPickersUtilsProvider>
    </Wrapper>
  )
}
AddGameForm.propTypes = {
  formik: PropTypes.object.isRequired,
  buttonTittle: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  hide: PropTypes.bool
}

export default AddGameForm
