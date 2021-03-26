/* eslint-disable react/jsx-wrap-multilines */
import { useState } from 'react'
import { Button, TextField, Grid, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

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

const RegisterForm = (props) => {
  const formik = props.formik
  const [visiblyPassword, setVisiblyPassword] = useState(false)

  const handleClickShowPassword = () => {
    setVisiblyPassword(!visiblyPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const history = useHistory()
  const routeChange = () => {
    let path = `logowanie`
    history.push(path)
  }

  return (
    <StyledContainer>
      <Wrapper>
        <StyledTypography variant="h5">{props.tittle}</StyledTypography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                label="Hasło"
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
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                variant="outlined"
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                name="confirmPassword"
                label="Hasło"
                size="small"
                type={visiblyPassword ? 'text' : 'password'}
                id="confirmPassword"
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
          <StyledButton
            size="small"
            onClick={routeChange}
            fullWidth
            variant="text"
            color="secondary">
            Zaloguj się
          </StyledButton>
        </form>
      </Wrapper>
    </StyledContainer>
  )
}

RegisterForm.propTypes = {
  formik: PropTypes.object.isRequired,
  buttonTittle: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired
}

export default RegisterForm
