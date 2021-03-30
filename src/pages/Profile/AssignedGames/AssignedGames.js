import { StyledContainer as Container } from '../../../Assets/Styles/GlobalStyles'
import { useContext, useState, useEffect } from 'react'
import ReducerContext from '../../../context/ReducerContext'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import GamesList from '../../../components/Games/GamesList'
import axios from '../../../axios'
import { objectToArrayWithId } from '../../../helpers/objects'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import LoadingIcon from '../../../UI/LoadingIcon/LoadingIcon'

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
const StyledTypography = styled(Typography)`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 600px) {
    margin-bottom: 30px;
    text-align: left;
  }
`

const AssignedGames = () => {
  const context = useContext(ReducerContext)
  const [games, setGames] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const fetchGames = async () => {
    try {
      const res = await axios.get('/games.json')
      const newGames = objectToArrayWithId(res.data)
      setGames(newGames)
    } catch (ex) {
      setError(ex.response.data.error.message)
    }
    setLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="warning">
            {error}
          </MuiAlert>
        </Snackbar>
      )}
      <StyledContainer>
        {games.length > 0 ? (
          <StyledTypography variant="h5">Aktywne gry</StyledTypography>
        ) : (
          <StyledTypography variant="h5">Brak aktywnych gier</StyledTypography>
        )}
        {games.map((game, index) => {
          return (
            <Wrapper key={game.id}>
              <GamesList
                index={index}
                data={game}
                buttonAction="remove"
                tooltip="zrezygnuj"></GamesList>
            </Wrapper>
          )
        })}
      </StyledContainer>
    </>
  )
}

export default AssignedGames
