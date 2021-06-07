/* eslint-disable react/jsx-wrap-multilines */
import { useState } from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {
  IconButton,
  FormControlLabel,
  Typography,
  Grid,
  TextField,
  Button,
  Switch
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import PropTypes from 'prop-types'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px; */
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 50px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (min-width: 600px) {
    max-width: 60%;
    padding: 30px;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  margin-top: 20px;
  width: 100%;
  align-self: flex-start;
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

const StyledSwitchGrid = styled(Grid)`
  margin: 20px 0;
  padding: 0;
  text-align: left;
`

const ProfileDetailsForm = (props) => {
  const formik = props.formik
  const [visiblyPassword, setVisiblyPassword] = useState(false)

  const handleClickShowPassword = () => {
    setVisiblyPassword(!visiblyPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  let levels = Array.apply(null, { length: 10 }).map(Number.call, Number)

  return (
    <StyledContainer>
      <Wrapper>
        <StyledTypography variant="h5">{props.tittle}</StyledTypography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                id="firstName"
                label="Imię"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                variant="outlined"
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                id="lastName"
                label="Nazwisko"
                size="small"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                {levels.map((arrLevel) => {
                  return (
                    <MenuItem
                      key={arrLevel + 1}
                      value={(arrLevel + 1).toString()}>
                      {arrLevel + 1}
                    </MenuItem>
                  )
                })}
              </TextField>
            </Grid>
            <StyledSwitchGrid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <Switch
                    value={formik.values.emailNotifications}
                    checked={formik.values.emailNotifications}
                    onChange={formik.handleChange}
                    name="emailNotifications"
                    id="emailNotifications"
                    color="primary"
                  />
                }
                label="Włącz powiadomienia email"
              />
            </StyledSwitchGrid>
            <Grid item xs={12}>
              <TextField
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                label="Email"
                size="small"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                label="Nowe hasło"
                size="small"
                type={visiblyPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {visiblyPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            {props.buttonTittle}
          </StyledButton>
        </form>
      </Wrapper>
    </StyledContainer>
  )
}

ProfileDetailsForm.propTypes = {
  formik: PropTypes.object.isRequired,
  buttonTittle: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired
}

export default ProfileDetailsForm
