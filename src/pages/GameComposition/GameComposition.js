import React from 'react'
import GamePlayersTable from '../../components/Tables/GamePlayersListTable'
import styled from 'styled-components'
import { StyledTableContainer } from '../../components/Tables/Table/TableStyled'
import { Typography } from '@material-ui/core'
import Table from '../../components/Tables/Table/Table'

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
  const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: ${({ theme }) => theme.palette.mainGradient.main};
    color: white;
    margin: 0 auto;
    width: 100%;
    height: 100px;
    ${({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      height: 110px;
    `}
  `

  return (
    <StyledTableContainer style={{ marginTop: '40px' }}>
      <StyledDiv>
        <Typography variant="h4">Składy</Typography>
        <Typography variant="h5">
          Gliwice Chorzowska, 16.03.2021, 21:30
        </Typography>
      </StyledDiv>
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
    </StyledTableContainer>
  )
}

export default AddPlayersToGame
