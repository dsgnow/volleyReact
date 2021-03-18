import React from 'react'
import GamePlayersTable from '../../../components/Tables/GamePlayersListTable'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import { StyledTableContainer } from '../../../components/Tables/Table/TableStyled'
import { Typography } from '@material-ui/core'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../../Assets/Styles/GlobalStyles'

const AddPlayersToGame = () => {
  const [age, setAge] = React.useState('')
  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const StyledFormControl = styled(FormControl)`
    margin: ${({ theme }) => theme.spacing(1)};
    min-width: 150px;
    width: 40%;
    margin: 40px auto 0;
    ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
        margin: 60px auto 0;
    `}
  `

  return (
    <StyledContainer style={{ flexDirection: 'column' }}>
      <StyledTitle>
        <StyledTitleTypography variant="h4">
          Wybierz grę i dodaj gracza
        </StyledTitleTypography>
      </StyledTitle>
      <StyledFormControl variant="outlined">
        <InputLabel id="select game">Wybierz grę</InputLabel>
        <Select
          labelId="Wybierz grę"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Wybierz grę">
          <MenuItem value="">
            <em>Brak</em>
          </MenuItem>
          <MenuItem value={'dodaj id Gry1'}>
            Gliwice Chorzowska, 16.03.2021, 21:30
          </MenuItem>
          <MenuItem value={'dodaj id Gry'}>
            Gliwice Delfin, 24.03.2021, 18:30
          </MenuItem>
        </Select>
      </StyledFormControl>
      <GamePlayersTable />
    </StyledContainer>
  )
}

export default AddPlayersToGame
