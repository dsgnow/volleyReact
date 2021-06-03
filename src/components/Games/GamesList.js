import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography, Grid, Tooltip, IconButton } from '@material-ui/core'
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined'
import ListOutlinedIcon from '@material-ui/icons/ListOutlined'

const BoldTypography = styled(Typography)`
  font-weight: 700;
  font-size: 0.9rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`

const StyledTypography = styled(Typography)`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`

const StyledGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-self: center;
  padding: 10px 10px;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const StyledGrid__name = styled(StyledGrid)`
  width: auto;
  @media (min-width: 300px) {
    min-width: 200px;
  }
  @media (min-width: 600px) {
    width: 300px;
  }
  @media (min-width: 1000px) {
    width: 400px;
  }
`

const WrapColumn = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const WrapRow = styled('div')`
  display: flex;
  flex-direction: row;
`

const GamesList = (props) => {
  const { tooltip, buttonAction, data, index, removePlayer } = props

  return (
    <WrapColumn>
      <StyledGrid__name>
        <BoldTypography variant="h6">{`${index + 1}. ${data.city}, ${
          data.name
        }`}</BoldTypography>
      </StyledGrid__name>
      <WrapRow>
        <StyledGrid item>
          <StyledTypography variant="h6">{`${data.dateStart
            .slice(0, -8)
            .replace('T', ' ')}`}</StyledTypography>
        </StyledGrid>
        <StyledGrid item>
          {buttonAction === 'remove' ? (
            <Tooltip title={tooltip}>
              <IconButton
                // onClick={() => props.clickHandler(data.id)}
                remove={data.id}
                edge="end"
                aria-label={tooltip}
                onClick={removePlayer}>
                <CancelPresentationOutlinedIcon
                  color="secondary"
                  fontSize="large"
                />
              </IconButton>
            </Tooltip>
          ) : (
            <WrapRow>
              <Tooltip title={tooltip}>
                <IconButton
                  onClick={() => props.clickHandler(data.id)}
                  edit={data.id}
                  edge="end"
                  aria-label={tooltip}>
                  <ListOutlinedIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title={'usuń grę'}>
                <IconButton
                  onClick={() => props.deleteGame(data.id)}
                  edge="end"
                  aria-label={'usuń grę'}>
                  <CancelPresentationOutlinedIcon
                    color="secondary"
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
            </WrapRow>
          )}
        </StyledGrid>
      </WrapRow>
    </WrapColumn>
  )
}

GamesList.propTypes = {
  removePlayer: PropTypes.func,
  tooltip: PropTypes.string.isRequired,
  buttonAction: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  clickHandler: PropTypes.func,
  deleteGame: PropTypes.func,
  index: PropTypes.number
}

export default GamesList
