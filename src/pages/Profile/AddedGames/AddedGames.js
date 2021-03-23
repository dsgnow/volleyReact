import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useContext } from 'react'
import ReducerContext from '../../../context/ReducerContext'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 80px;
    flex-direction: row;
  }
`
const StyledTypography = styled(Typography)`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 600px) {
    margin-bottom: 30px;
    text-align: left;
  }
`

const AddedGames = () => {
  const context = useContext(ReducerContext)
  const { gamesData } = context.state

  return (
    <StyledContainer>
      {gamesData.length > 0 ? (
        <StyledTypography variant="h5">Twoje gry</StyledTypography>
      ) : (
        <StyledTypography variant="h5">
          Nie dodałeś jeszcze żadnych gier
        </StyledTypography>
      )}
      <GamesList
        data={gamesData}
        buttonAction="edit"
        tooltip="edytuj"></GamesList>
    </StyledContainer>
  )
}

export default AddedGames
