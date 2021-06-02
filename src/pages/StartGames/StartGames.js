import Games from '../../components/Games/Games'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import { useState, useEffect } from 'react'
import { objectToArrayWithId } from '../../helpers/objects'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import { fetchAllGames } from '../../services/gameService'
import filterByDate from '../../helpers/filterByDate'

const StartGames = () => {
  const [games, setGames] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const fetchGames = async () => {
    try {
      const res = await fetchAllGames()
      const newGames = objectToArrayWithId(res.data)
      let newGamesFilteredByDate = filterByDate(newGames)
      setGames(newGamesFilteredByDate)
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
      <StyledContainer maxWidth="lg">
        <StyledTitle>
          <StyledTitleTypography variant="h4">
            Dostępne gry
          </StyledTitleTypography>
        </StyledTitle>
        {games.length ? (
          <Games data={games}></Games>
        ) : (
          <StyledTitleTypography variant="h5">
            Aktualnie brak dostępnych gier.
          </StyledTitleTypography>
        )}
      </StyledContainer>
    </>
  )
}

export default StartGames
