import Games from '../../components/Games/Games'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import { useContext, useState, useEffect } from 'react'
import ReducerContext from '../../context/ReducerContext'
import axios from '../../axios'
import { objectToArrayWithId } from '../../helpers/objects'

const StartGames = () => {
  const context = useContext(ReducerContext)
  const { gamesData } = context.state
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const res = await axios.get('/games.json')
      const newGames = objectToArrayWithId(res.data)
      setGames(newGames)
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle>
        <StyledTitleTypography variant="h4">Dostępne gry</StyledTitleTypography>
      </StyledTitle>
      {games.length ? (
        <Games data={games}></Games>
      ) : (
        <StyledTitleTypography variant="h5">
          Aktualnie brak dostępnych gier.
        </StyledTitleTypography>
      )}
    </StyledContainer>
  )
}

export default StartGames
