import React, { Fragment, useEffect, useState } from 'react'
import Table from '../../components/Tables/Table/Table'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'
import { useParams } from 'react-router-dom'
import { fetchGameById } from '../../services/gameService'
import { objectToArrayWithId } from '../../helpers/objects'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import calcSquads from '../../helpers/calcSquads'

const AddPlayersToGame = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [squads, setSquads] = useState([])
  const [game, setGame] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchGame()
  }, [loading])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const fetchGame = async () => {
    try {
      await calcSquads(id)
      const res = await fetchGameById(id)
      const actualGame = objectToArrayWithId(res.data)[0]
      setSquads(actualGame)
      setGame(actualGame)
      console.log(actualGame)
    } catch (ex) {
      setOpen(true)
      setMessageType('warning')
      setMessage('Nie można pobrać danych gry')
    }
    setLoading(false)
  }

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={messageType}>
            {message}
          </MuiAlert>
        </Snackbar>
      )}
      {squads.players && squads.players.length > 0 ? (
        <StyledContainer maxWidth="lg">
          <StyledTitle>
            <StyledTitleTypography variant="h5">
              {`${game.name}`}
            </StyledTitleTypography>
            <StyledTitleTypography variant="h5">
              {`${game.street} | ${game.dateStart
                .slice(0, -3)
                .replace('T', ' ')}`}
            </StyledTitleTypography>
          </StyledTitle>
          <Fragment>
            <Table
              label={`Lista graczy`}
              tableHeaders={['Gracz', 'gra do']}
              columns={['name', 'endTime']}
              filteredColumn={'name'}
              title={`Lista graczy`}
              data={squads.players}
              rowsPerPageOnStart={[
                squads.players.length,
                squads.players.length + 1,
                squads.players.length + 2
              ]}
            />
            {squads.reserve && squads.reserve.length > 0 && (
              <Table
                label={`Lista rezerwowa`}
                tableHeaders={['Gracz', 'gra do']}
                columns={['name', 'endTime']}
                filteredColumn={'players'}
                title={`Lista rezerwowa`}
                data={squads.reserve}
                rowsPerPageOnStart={[
                  squads.reserve.length,
                  squads.reserve.length + 1,
                  squads.reserve.length + 2
                ]}
              />
            )}
          </Fragment>
        </StyledContainer>
      ) : (
        <StyledContainer maxWidth="lg">
          <StyledTitle>
            <StyledTitleTypography variant="h4">
              Lista graczy
            </StyledTitleTypography>
            <StyledTitleTypography variant="h5">
              Brak graczy
            </StyledTitleTypography>
          </StyledTitle>
        </StyledContainer>
      )}
    </>
  )
}

export default AddPlayersToGame
