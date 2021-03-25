import React, { Fragment } from 'react'
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
    playersCount: 6,
    rotationTime: '21:30'
  },
  {
    id: 2,
    name: 'grupa 2',
    skill: 38,
    players:
      'Wojtek Spalik, Rafał Kurkowski, Marcin Bosman, Michał Morawiec, Kamil Wiża, Magda Staniczek',
    playersCount: 6,
    rotationTime: '00:00'
  },
  {
    id: 3,
    name: 'grupa 3',
    skill: 41,
    players:
      'Damian Kita, Przemysław Ważny, Patryk Kacprzycki, Michał Soblik, Ania Klemczak, Basia Lark',
    playersCount: 6,
    rotationTime: '01:00'
  },
  {
    id: 4,
    name: 'grupa 4',
    skill: 38,
    players:
      'MRa Ra, Damian Dmowski, Mateusz Szołtysek, Piotr Stachowicz, Iza Ćwiertnia, Aśka Grochowina',
    playersCount: 6,
    rotationTime: '02:00'
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
      {tableData.map((data, index) => {
        return (
          <Fragment key={data.id}>
            <Table
              label={`${index + 1}. Rotacja / ${data.rotationTime}`}
              tableHeaders={['grupa', 'gracze']}
              columns={['name', 'players']}
              filteredColumn={'players'}
              title={`${index + 1}. Rotacja / ${data.rotationTime}`}
              data={[data]}
              rowsPerPageOnStart={[1, 6, 12]}
            />
          </Fragment>
        )
      })}
    </StyledContainer>
  )
}

export default AddPlayersToGame
