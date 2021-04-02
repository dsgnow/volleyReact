import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography, Grid, Tooltip, IconButton } from '@material-ui/core'
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined'
import ListOutlinedIcon from '@material-ui/icons/ListOutlined'
import { parseISO, format } from 'date-fns'

const BoldTypography = styled(Typography)`
  font-weight: 700;
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1.1rem;
  }
`

const StyledTypography = styled(Typography)`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1.1rem;
  }
`

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const GamesList = (props) => {
  const { tooltip, buttonAction, data, index } = props

  return (
    <>
      <StyledGrid item xs={12} sm={6} style={{ display: 'flex' }}>
        <BoldTypography variant="h6">{`${index + 1}. ${data.city} ${
          data.name
        }`}</BoldTypography>
      </StyledGrid>
      <StyledGrid item xs={3} sm={3}>
        <StyledTypography variant="h6">{`${format(
          parseISO(data.dateStart),
          'dd.MM.yyyy HH:mm'
        )}`}</StyledTypography>
      </StyledGrid>
      <StyledGrid item xs={6} sm={3}>
        {buttonAction === 'remove' ? (
          <Tooltip title={tooltip}>
            <IconButton
              // onClick={() => props.clickHandler(data.id)}
              remove={data.id}
              edge="end"
              aria-label={tooltip}>
              <CancelPresentationOutlinedIcon
                color="secondary"
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={tooltip}>
            <IconButton
              onClick={() => props.clickHandler(data.id)}
              edit={data.id}
              edge="end"
              aria-label={tooltip}>
              <ListOutlinedIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
      </StyledGrid>
    </>
  )
}

GamesList.propTypes = {
  tooltip: PropTypes.string.isRequired,
  buttonAction: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  clickHandler: PropTypes.func,
  index: PropTypes.number
}

export default GamesList
