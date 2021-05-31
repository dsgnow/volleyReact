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
      setSquads(actualGame.squads)
      setGame(actualGame)
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
      {squads && squads.length > 0 ? (
        <StyledContainer maxWidth="lg">
          <StyledTitle>
            <StyledTitleTypography variant="h4">Składy</StyledTitleTypography>
            <StyledTitleTypography variant="h5">
              {`${game.name}`}
            </StyledTitleTypography>
            <StyledTitleTypography variant="h5">
              {`${game.street} ${game.dateStart
                .slice(0, -3)
                .replace('T', ' ')}`}
            </StyledTitleTypography>
          </StyledTitle>
          {game.autoSquads ? (
            squads.map((data, index) => {
              return (
                <Fragment key={data[0].id + index}>
                  <Table
                    label={`${index + 1}. Rotacja / ${data[0].rotationTime}`}
                    tableHeaders={['grupa', 'gracze']}
                    columns={['name', 'players']}
                    filteredColumn={'players'}
                    title={`${index + 1}. Rotacja / ${data[0].rotationTime}`}
                    data={[data[0]]}
                    rowsPerPageOnStart={[1, 6, 12]}
                  />
                </Fragment>
              )
            })
          ) : (
            <Fragment>
              <Table
                label={`${1}. Rotacja / ${squads[0][0].rotationTime}`}
                tableHeaders={['grupa', 'gracze']}
                columns={['name', 'players']}
                filteredColumn={'players'}
                title={`${1}. Rotacja / ${squads[0][0].rotationTime}`}
                data={[squads[0][0]]}
                rowsPerPageOnStart={[1, 6, 12]}
              />
            </Fragment>
          )}
        </StyledContainer>
      ) : (
        <StyledContainer maxWidth="lg">
          <StyledTitle>
            <StyledTitleTypography variant="h4">Składy</StyledTitleTypography>
            <StyledTitleTypography variant="h5">
              Brak składów
            </StyledTitleTypography>
          </StyledTitle>
        </StyledContainer>
      )}
    </>
  )
}

export default AddPlayersToGame
