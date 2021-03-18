import React from 'react'
import GamePlayersTable from '../../components/Tables/GamePlayersListTable'
import styled from 'styled-components'
import { StyledTableContainer } from '../../components/Tables/Table/TableStyled'
import { Typography } from '@material-ui/core'
import Table from '../../components/Tables/Table/Table'
import {
  StyledContainer,
  StyledTitle,
  StyledTitleTypography
} from '../../Assets/Styles/GlobalStyles'

const tableData = [
  {
    id: 1,
    name: 'grupa 1',
    skill: 36,
    players:
      'Damian Czapla, Michał (od P. Ważnego), Dawid (od P. Ważnego), Łukasz Wróblewski, Grzegorz Sołtysiak, Monika Szablińska',
    playersCount: 6
  },
  {
    id: 2,
    name: 'grupa 2',
    skill: 38,
    players:
      'Wojtek Spalik, Rafał Kurkowski, Marcin Bosman, Michał Morawiec, Kamil Wiża, Magda Staniczek',
    playersCount: 6
  },
  {
    id: 3,
    name: 'grupa 3',
    skill: 41,
    players:
      'Damian Kita, Przemysław Ważny, Patryk Kacprzycki, Michał Soblik, Ania Klemczak, Basia Lark',
    playersCount: 6
  },
  {
    id: 4,
    name: 'grupa 4',
    skill: 38,
    players:
      'MRa Ra, Damian Dmowski, Mateusz Szołtysek, Piotr Stachowicz, Iza Ćwiertnia, Aśka Grochowina',
    playersCount: 6
  }
]

const AddPlayersToGame = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledTitle>
        <StyledTitleTypography variant="h4">Składy</StyledTitleTypography>
        <StyledTitleTypography variant="h5">
          Gliwice Chorzowska, 16.03.2021, 21:30
        </StyledTitleTypography>
      </StyledTitle>
      <Table
        label={'Pierwsza rotacja'}
        tableHeaders={['grupa', 'gracze']}
        columns={['name', 'players']}
        filteredColumn={'players'}
        title={'Pierwsza rotacja'}
        data={[tableData[0]]}
        handleClick={(playerId) => addPlayer(playerId)}
        buttonColor={'primary'}
        rowsPerPageOnStart={[1, 6, 12]}
      />
    </StyledContainer>
  )
}

export default AddPlayersToGame
