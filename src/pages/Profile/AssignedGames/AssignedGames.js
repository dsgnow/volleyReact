import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import Games from '../../../components/Games/Games'
import { useContext } from 'react'
import ReducerContext from '../../../context/ReducerContext'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  background-color: white;
  padding: 10px;
  @media (min-width: 600px) {
    padding: 50px;
    flex-direction: row;
  }
`

const AssignedGames = () => {
  const context = useContext(ReducerContext)
  const { gamesData } = context.state

  return (
    <StyledContainer>
      <Games data={gamesData}></Games>
    </StyledContainer>
  )
}

export default AssignedGames
