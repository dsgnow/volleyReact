import styled from 'styled-components'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const StyledButton = styled(Button)`
  transition: 0.3s;
  padding: 5px 20px;
  text-transform: none;
  outline: none;
  text-decoration: none;
  color: white;
`

const StyledButtonOk = (props) => {
  return <StyledButton {...props}>{props.title}</StyledButton>
}

StyledButtonOk.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default StyledButtonOk
