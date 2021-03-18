import Games from '../../components/Games/Games'
import styled from 'styled-components'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'

const StartGames = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dostępne gry</StyledTitleTypography>
      </StyledTitle>
      <Games></Games>
    </StyledContainer>
  )
}

export default StartGames
