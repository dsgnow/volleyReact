import styled from 'styled-components'
import { Typography, Grid, Tooltip, IconButton } from '@material-ui/core'
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined'
import ListOutlinedIcon from '@material-ui/icons/ListOutlined'

const GamesList = (props) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: space-around;
    align-items: center;
    padding: 10px 0;
    width: 95%;
    margin: 10px auto;
    padding: 0 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    @media (min-width: 600px) {
      width: none;
      min-width: 200px;
      max-width: 45%;
      margin: 20px auto 20px 0;
    }
  `

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
  return (
    <>
      {props.data.map((game, index) => {
        return (
          <Wrapper key={game.id}>
            <StyledGrid item xs={12} sm={6} style={{ display: 'flex' }}>
              <BoldTypography variant="h6">{`${index + 1}. ${game.city} ${
                game.name
              }`}</BoldTypography>
            </StyledGrid>
            <StyledGrid item xs={3} sm={3}>
              <StyledTypography variant="h6">{`${game.date} ${game.time}`}</StyledTypography>
            </StyledGrid>
            <StyledGrid item xs={6} sm={3}>
              {props.buttonAction === 'remove' ? (
                <Tooltip title={props.tooltip}>
                  <IconButton
                    remove={game.id}
                    edge="end"
                    aria-label={props.tooltip}>
                    <CancelPresentationOutlinedIcon
                      color="secondary"
                      fontSize="large"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={props.tooltip}>
                  <IconButton
                    edit={game.id}
                    edge="end"
                    aria-label={props.tooltip}>
                    <ListOutlinedIcon color="primary" fontSize="large" />
                  </IconButton>
                </Tooltip>
              )}
            </StyledGrid>
          </Wrapper>
        )
      })}
    </>
  )
}

export default GamesList
