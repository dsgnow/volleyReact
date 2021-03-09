import { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import styles from './GamePlayersTable.module.scss';
import Table from '../Table';
import AddPlayersTable from './AddPlayersTable';

const GamePlayerTable = (props) => {
  const [players, setPlayers] = useState([
    {
      id: '1',
      name: 'Brylant Barber',
      skill: 6,
      endTime: '2021/01/02 02:00:00',
      info: '',
      gender: 'male'
    }
  ]);
  const tableState = players;

  tableState.forEach((el, i) => {
    el.delete = (
      <MDBBtn delete={el.id} color={'warning'} size="sm">
        Usuń gracza
      </MDBBtn>
    );
  });

  const data = {
    columns: [
      {
        label: 'gracze',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'skill',
        field: 'skill',
        sort: 'asc'
      },
      {
        label: 'usuń',
        field: 'delete',
        sort: 'asc'
      }
    ],
    rows: tableState
  };

  return (
    <div className={styles.wrapTable}>
      <AddPlayersTable />
      <h2>{props.title}</h2>
      <Table
        title={'Dodani gracze do gry'}
        paging={true}
        entries={5}
        entriesOptions={[5, 12, 24]}
        addbutton={'true'}
        buttonaction={'delete'}
        data={data}
      />
    </div>
  );
};

export default GamePlayerTable;
