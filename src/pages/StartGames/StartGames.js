import Games from '../../components/Games/Games'
import styled from 'styled-components'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import { useContext } from 'react'
import ReducerContext from '../../context/ReducerContext'

const StartGames = () => {
  const context = useContext(ReducerContext)
  const { gamesData } = context.state

  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dostępne gry</StyledTitleTypography>
      </StyledTitle>
      <Games data={gamesData}></Games>
    </StyledContainer>
  )
}

export default StartGames
