import { CircularProgress, Container } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

export default function LoadingIcon(props) {
  return (
    <StyledContainer>
      <CircularProgress size={props.size} />
    </StyledContainer>
  )
}

LoadingIcon.propTypes = {
  size: PropTypes.string
}
