import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 50px;
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

let ChangeProfilDetailsSchema = yup.object().shape({
  firstName: yup.string().required('To pole jest wymagane..'),
  lastName: yup.string().required('To pole jest wymagane..'),
  email: yup.string().email().required('To pole jest wymagane..'),
  password: yup
    .string()
    .min(6, 'Hasło jest za krótkie.')
    .max(20, 'Hasło jest za długie.')
    .required('To pole jest wymagane..')
})

export const ProfileDetails = () => {
  return (
    <StyledContainer>
      <StyledTypography variant="h5">Zmień dane</StyledTypography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema={ChangeProfilDetailsSchema}
        onSubmit={(values) => {
          console.log(values)
        }}>
        {({ errors, handleChange, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.firstName && touched.firstName}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  id="firstName"
                  label="Imię"
                  size="small"
                  autoFocus
                  helperText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName && touched.lastName}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  id="lastName"
                  label="Nazwisko"
                  size="small"
                  name="lastName"
                  autoComplete="lname"
                  helperText={
                    errors.lastName && touched.lastName ? errors.lastName : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email && touched.email}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email"
                  size="small"
                  name="email"
                  autoComplete="email"
                  helperText={
                    errors.email && touched.email ? errors.email : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password && touched.password}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  name="password"
                  label="Hasło"
                  size="small"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    errors.password && touched.password ? errors.password : null
                  }
                />
              </Grid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Aktualizuj
            </StyledButton>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  )
}
