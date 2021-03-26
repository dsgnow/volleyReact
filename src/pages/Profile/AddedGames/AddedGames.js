import { useState, useRef } from 'react'
import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useContext } from 'react'
import ReducerContext from '../../../context/ReducerContext'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'
import AddGameFormValidation from './AddGameFormValidation/AddGameFormValidation'
import { initialValues as defaultInitialValues } from '../../../components/Forms/AddGameForm/validationSchema'

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
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    width: none;
    min-width: 200px;
    max-width: 45%;
    margin: 20px auto 20px 0;
  }
`

const WrapForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 95%;
  margin: 20px auto;
  padding: 20px 10px;
  box-shadow: ${({ theme }) => theme.palette.shadow.main};
  @media (min-width: 1000px) {
    width: none;
    min-width: 400px;
    width: 100%;
    margin: 20px auto 50px 0;
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
  const selectForm = useRef()
  const [initialValues, setInitialValues] = useState(defaultInitialValues)

  const editGame = (gameId) => {
    selectForm.current.scrollIntoView({ block: 'start', behavior: 'smooth' })
    setInitialValues({
      ...initialValues,
      name: `Pobranie danych gry o id: ${gameId}`,
      dateStart: new Date()
    })
  }

  return (
    <StyledContainer>
      {gamesData.length > 0 ? (
        <StyledTypography variant="h5">Twoje gry</StyledTypography>
      ) : (
        <StyledTypography variant="h5">
          Nie dodałeś jeszcze żadnych gier
        </StyledTypography>
      )}
      {gamesData.map((game, index) => {
        return (
          <Wrapper key={game.id}>
            <GamesList
              index={index}
              data={game}
              buttonAction="edit"
              clickHandler={editGame}
              tooltip="edytuj"></GamesList>
          </Wrapper>
        )
      })}
      <WrapForm ref={selectForm}>
        <AddGameFormValidation
          initialValues={initialValues}></AddGameFormValidation>
      </WrapForm>
    </StyledContainer>
  )
}

export default AddedGames
