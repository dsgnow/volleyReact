/* eslint-disable react/jsx-wrap-multilines */
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import volleyGraphic from '../../../Assets/Images/volleyVector.svg'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px; */
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 50px;
  }
`

const WrapperLogin = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (min-width: 600px) {
    min-width: 50%;
    padding: 30px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;
  max-width: 90%;
  text-align: left;
  @media (min-width: 600px) {
    max-width: 40%;
    padding: 30px;
    margin-top: unset;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  margin-top: 20px;
  width: auto;
  align-self: flex-start;
  @media (min-width: 600px) {
    width: 30%;
  }
`

const StyledTypography = styled(Typography)`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  @media (min-width: 600px) {
    margin-bottom: 30px;
    text-align: left;
  }
`

const Image = styled.img`
  height: 100%;
  @media (min-width: 800px) {
    height: 100%;
  }
`

const ResetPasswordForm = (props) => {
  const formik = props.formik

  const history = useHistory()
  const routeChange = (path) => {
    history.push(path)
  }

  return (
    <StyledContainer>
      <WrapperLogin>
        <StyledTypography variant="h5">{props.tittle}</StyledTypography>
        <form onSubmit={formik.handleSubmit}>
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
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary">
            {props.buttonTittle}
          </StyledButton>
          <StyledButton
            size="small"
            onClick={() => routeChange('logowanie')}
            fullWidth
            variant="text"
            color="secondary">
            Zaloguj się
          </StyledButton>
        </form>
      </WrapperLogin>
      <Wrapper>
        <Image src={volleyGraphic} alt="" />
      </Wrapper>
    </StyledContainer>
  )
}

ResetPasswordForm.propTypes = {
  formik: PropTypes.object.isRequired,
  buttonTittle: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired
}

export default ResetPasswordForm
